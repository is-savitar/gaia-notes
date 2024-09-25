import { API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log(accessToken);

  try {
    const res = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(JSON.stringify(data, null, 2));
      return NextResponse.json(data, { status: res.status });
    }
    console.log(JSON.stringify(data, null, 2));
    return NextResponse.json(
      { message: "Blog created successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Internal server error ${JSON.stringify(err)}` },
      { status: 500 },
    );
  }
}
