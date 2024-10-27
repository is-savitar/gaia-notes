"use server";

import { cookies } from "next/headers";

export const testRefresh = async (formData: any) => {
  const cookieStore = cookies();
  console.log(formData, "From action now");

  console.log(cookieStore.get("accessToken")?.value, "Action");
};
