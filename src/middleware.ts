import { NextRequest, NextResponse } from "next/server";
import {
  deleteUserCreds,
  getUserCredentials,
} from "./lib/utils/auth/user-creds";
import isValidJWT from "./lib/utils/auth/is-valid-jwt";

const protectedRoutes = ["/api", "/me/settings", "/me/profile", "/me/design"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const creds = getUserCredentials(req);

  if (
    protectedRoutes.includes(pathname) &&
    (!creds || !(await isValidJWT(creds?.refreshToken ?? "")))
  ) {
    deleteUserCreds(req);
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    return res;
  }

  return NextResponse.next();
}
