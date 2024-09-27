import { API_URL } from "@/lib/constants";
import fetchWithCredentials from "@/lib/utils/auth/fetch-with-credentials";
import { deleteUserCreds } from "@/lib/utils/auth/logout";
import { getUserCredentials } from "@/lib/utils/auth/user-creds";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userCreds = getUserCredentials(req);
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${userCreds?.accessToken}`,
      },
    });
    // const data = await res.json();
    console.log(res, "route");
    console.log("getting here");
    deleteUserCreds(req);
    // console.log(data);
    if (!res.ok) {
      return NextResponse.json("res not okay", { status: res.status });
    }

    // return data;
    deleteUserCreds(req);
    return NextResponse.json("hi", { status: res.status });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: `Internal server error ${JSON.stringify(err)}` },
      { status: 500 },
    );
  }
}
