import { API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      const cookieStore = cookies();
      cookieStore.set("accessToken", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 300,
        path: "/",
      });

      cookieStore.set("refreshToken", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
      cookieStore.set("uuid", data.user.uuid, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
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
