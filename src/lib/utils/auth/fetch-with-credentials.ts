// Import necessary modules and types
import { NextRequest } from "next/server";
import { getUserCredentials, saveUserTokens, Tokens } from "./user-creds";
import { API_URL } from "@/lib/constants";

// Define the backend URL and the maximum time for token refresh
const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before expiry

// Define the main function for making authenticated requests
export default async function fetchWithCredentials(
  path: string,
  init: RequestInit | undefined,
  req: NextRequest,
) {
  // Retrieve user credentials from the request
  const userCredentials = getUserCredentials(req);

  // If no user credentials are available, return an unauthorized response
  if (!userCredentials) {
    return { message: "No credentials provided", statusCode: 401 };
  }

  const currentTime = Date.now();
  const accessTokenExpiry = userCredentials.accessTokenExpiry;

  // Check if the access token has expired
  if (accessTokenExpiry < currentTime) {
    // If expired, attempt to refresh the token
    const newTokens = await refresh(userCredentials.refreshToken);

    // If successful, save the new tokens
    if ("accessToken" in newTokens) {
      saveUserTokens(newTokens);
      // Proceed with the original request using the new access token
      return makeFetch(path, newTokens.accessToken, init)();
    } else {
      // If token refresh fails, return the error response
      return newTokens;
    }
  }

  // Check if the access token is about to expire (within the warning time)
  if (accessTokenExpiry - (currentTime + WARNING_TIME) < 0) {
    // Attempt to refresh the token
    const newTokens = await refresh(userCredentials.refreshToken);

    // If successful, save the new tokens
    if ("accessToken" in newTokens) {
      saveUserTokens(newTokens);
      // Proceed with the original request using the new access token
      return makeFetch(path, newTokens.accessToken, init)();
    } else {
      // If token refresh fails, return the error response
      return newTokens;
    }
  }

  // Create a function to make the fetch request with the current access token
  return makeFetch(path, userCredentials.accessToken as string, init)();
}

// Function to refresh user tokens
async function refresh(rt: string) {
  return new Promise<any | Tokens>((resolve) => {
    // Make a POST request to the token refresh endpoint
    fetch(API_URL + "/auth/refresh_token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${rt}`,
      },
    })
      .then((res) => res.json())
      .then((json) => resolve(json));
  });
}

// Function to create a fetch function with the specified credentials
function makeFetch(
  path: string,
  accessToken: string,
  init: RequestInit | undefined,
): (newAccessToken?: string) => Promise<any> {
  return async function () {
    // Make a fetch request to the specified path with the provided access token
    return fetch(`${API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...init,
    }).then((res) => res.json());
  };
}
