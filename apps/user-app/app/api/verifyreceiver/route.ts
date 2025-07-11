// app/api/verifyreceiver/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { number } = await req.json();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!number || number.trim().length < 5) {
    return NextResponse.json({ error: "Invalid number" }, { status: 400 });
  }

  const receiver = await db.user.findUnique({
    where: { number },
    select: { id: true, name: true, number: true },
  });

  if (!receiver) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (receiver.id === parseInt(session.user.id)) {
    return NextResponse.json({ error: "You can't pay yourself" }, { status: 400 });
  }

  return NextResponse.json({ receiver });
}
