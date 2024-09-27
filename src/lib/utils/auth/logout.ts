import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const deleteUserCreds = (req: NextRequest) => {
  const cookieStore = cookies();
  const cookiesToDelete = [
    "accessToken",
    "refreshToken",
    "uuid",
    "accessTokenExpiry",
    "refreshTokenExpiry",
  ];

  cookiesToDelete.forEach((cookieName) => {
    cookieStore.set(cookieName, "", {
      expires: new Date(0),
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      httpOnly: cookieName !== "uuid", // uuid is not httpOnly as it's used client-side
      sameSite: "strict",
    });
  });
};
