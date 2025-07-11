// Server Action can't be called directly via Axios, so wrap it inside an API
//(Create API wrapper for server action)
import { NextRequest, NextResponse } from "next/server";
import { paySomeone } from "../p2ptrans/route"; // your server action

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await paySomeone(body);

  return NextResponse.json(result);
}
