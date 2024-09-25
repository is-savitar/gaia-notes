import { getCookie } from "cookies-next";

export const getUUIDClient = (): string | undefined => {
  return getCookie("uuid");
};
