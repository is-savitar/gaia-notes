import { type NextRequest, NextResponse } from "next/server";
import { getUserCredentials } from "./lib/auth/session";
import { withRefreshToken } from "./lib/auth/with-refresh-token";

const protectedRoutes = ["/me/settings"];

async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const creds = getUserCredentials();

	// if (protectedRoutes.includes(pathname)) {
	//   if (!creds || !(await isValidJWT(creds?.refreshToken as string))) {
	//     console.log("Unauthorized access attempt");
	//     return NextResponse.redirect(new URL("/auth", req.url));
	//   }
	// }

	return NextResponse.next();
}

export default withRefreshToken(middleware);

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
