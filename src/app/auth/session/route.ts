import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userData } = await req.json();
  const cookieStore = cookies();

  console.log(userData, "FROM ROUTE");
  cookieStore.set({
    name: "userData",
    value: JSON.stringify(userData),
    httpOnly: true,
    // secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get("userData");
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null;

  return NextResponse.json({ userData });
}
