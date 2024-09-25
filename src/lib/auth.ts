import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const cookieStore = cookies();
export const uuid = cookieStore.get("uuid")?.value;

export const getUUIDClient = (): string | undefined => {
  return getCookie("uuid");
};
