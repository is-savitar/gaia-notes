import { deleteCookie, getCookie } from "cookies-next";

export const getUUIDClient = (): string | undefined => {
  return getCookie("uuid");
};

export const deleteTokens = () => {
  const cookiesToDelete = [
    "accessToken",
    "refreshToken",
    "uuid",
    "accessTokenExpiry",
    "refreshTokenExpiry",
  ];

  cookiesToDelete.forEach((cookieName) => {
    deleteCookie(cookieName, {
      expires: new Date(0),
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      httpOnly: cookieName !== "uuid", // uuid is not httpOnly as it's used client-side
      sameSite: "strict",
    });
  });
};
