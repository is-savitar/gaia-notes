import { NextRequest, NextResponse } from "next/server";
import { getUserCredentials } from "./lib/utils/auth/user-creds";
import isValidJWT from "./lib/utils/auth/is-valid-jwt";
import { deleteUserCreds } from "./lib/utils/auth/logout";
import { deleteTokens } from "./lib/utils/uuid_client";

const protectedRoutes = [
  "/api",
  "/me/settings",
  "/me/profile",
  "/me/design",
  "/me/notifications",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const creds = getUserCredentials(req);
  // console.log(creds, "middleware");
  //
  // if (
  //   protectedRoutes.includes(pathname) &&
  //   (!creds || !(await isValidJWT(creds?.refreshToken ?? "")))
  // ) {
  //   // deleteUserCreds(req);
  //   deleteTokens();
  //   console.log("TFFFF");
  //   const res = NextResponse.redirect(new URL("/auth/login", req.url));
  //   return res;
  // }

  return NextResponse.next();
}
