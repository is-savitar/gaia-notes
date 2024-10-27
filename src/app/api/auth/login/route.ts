import { API_URL } from "@/lib/constants";
import { saveUserTokens } from "@/lib/utils/auth/user-creds";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("getting here");
  const body = await req.json();
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(JSON.stringify(res, null, 2));

    console.log("Data");
    console.log(JSON.stringify(data, null, 2));

    if (res.ok) {
      const cookieStore = cookies();
      saveUserTokens(data);

      cookieStore.set("uuid", data.user.uuid, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge:
          data.expiry.refresh_token_expiry - Math.floor(Date.now() / 1000),
        path: "/",
      });
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(data, { status: res.status });
    }
  } catch (err) {
    return NextResponse.json(
      { message: `Internal server error ${JSON.stringify(err)}` },
      { status: 500 },
    );
  }
}
