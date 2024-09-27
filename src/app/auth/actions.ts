"use server";

import { BASE_URL } from "@/lib/constants";

export default async function signOut() {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
