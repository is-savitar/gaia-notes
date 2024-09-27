import { NextRequest } from "next/server";
import { getUserCredentials, saveUserTokens, Tokens } from "./user-creds";
import { API_URL } from "@/lib/constants";

const WARNING_TIME = 3 * 60 * 1000;

export default async function fetchWithCredentials(
  path: string,
  init: RequestInit | undefined,
  req: NextRequest,
) {
  const userCredentials = getUserCredentials(req);
  console.log(userCredentials, "creds");

  if (!userCredentials || !userCredentials.accessToken) {
    return { message: "No credentials provided", statusCode: 401 };
  }

  const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
  const accessTokenExpiry = userCredentials.accessTokenExpiry;

  if (!accessTokenExpiry) {
    console.log("No access token expiry found");
    return makeFetch(path, userCredentials.accessToken, init)();
  }

  if (accessTokenExpiry < currentTime) {
    console.log("Access token expired, refreshing...");
    return await refreshAndFetch(path, init, userCredentials.refreshToken);
  }

  if (accessTokenExpiry - currentTime < WARNING_TIME / 1000) {
    console.log("Access token expiring soon, refreshing...");
    return await refreshAndFetch(path, init, userCredentials.refreshToken);
  }

  return makeFetch(path, userCredentials.accessToken, init)();
}

async function refreshAndFetch(
  path: string,
  init: RequestInit | undefined,
  refreshToken: string | undefined,
) {
  if (!refreshToken) {
    return { message: "No refresh token available", statusCode: 401 };
  }

  const newTokens = await refresh(refreshToken);

  if ("accessToken" in newTokens) {
    saveUserTokens(newTokens);
    return makeFetch(path, newTokens.accessToken, init)();
  } else {
    return newTokens;
  }
}

async function refresh(rt: string): Promise<Tokens | any> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh_token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${rt}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { message: "Failed to refresh token", statusCode: 500 };
  }
}

function makeFetch(
  path: string,
  accessToken: string,
  init: RequestInit | undefined,
): () => Promise<any> {
  return async function () {
    try {
      const res = await fetch(`${API_URL}${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...init?.headers,
        },
        ...init,
      });
      return await res.json();
    } catch (error) {
      console.error("Error making fetch request:", error);
      return { message: "Failed to make request", statusCode: 500 };
    }
  };
}
