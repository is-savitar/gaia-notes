import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export type Tokens = {
  access_token: string;
  refresh_token: string;
  expiry: {
    access_token_expiry: number;
    refresh_token_expiry: number;
  };
};

type UserCredentials = {
  accessToken: string | undefined;
  refreshToken: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  uuid: string;
};

export function getUserCredentials(req: NextRequest): UserCredentials | null {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const accessTokenExpiry = parseInt(
    req.cookies.get("accessTokenExpiry")?.value || "0",
  );
  const refreshTokenExpiry = parseInt(
    req.cookies.get("refreshTokenExpiry")?.value || "0",
  );
  const uuid = req.cookies.get("uuid")?.value;

  if (!refreshToken || !uuid) return null;

  return {
    accessToken,
    refreshToken,
    accessTokenExpiry,
    refreshTokenExpiry,
    uuid,
  };
}

export function saveUserTokens(tokens: Tokens) {
  const cookieStore = cookies();
  cookieStore.set("accessToken", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: tokens.expiry.access_token_expiry - Math.floor(Date.now() / 1000),
    path: "/",
  });
  cookieStore.set("refreshToken", tokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: tokens.expiry.refresh_token_expiry - Math.floor(Date.now() / 1000),
    path: "/",
  });
  cookieStore.set(
    "accessTokenExpiry",
    tokens.expiry.access_token_expiry.toString(),
    {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: tokens.expiry.access_token_expiry - Math.floor(Date.now() / 1000),
      path: "/",
    },
  );
  cookieStore.set(
    "refreshTokenExpiry",
    tokens.expiry.refresh_token_expiry.toString(),
    {
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge:
        tokens.expiry.refresh_token_expiry - Math.floor(Date.now() / 1000),
      path: "/",
    },
  );
}
