import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth-users";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    if (!payload?.username || !payload?.password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    const isValid = verifyPassword(payload.username, payload.password, "admin");
    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Authenticated" });
  } catch {
    return NextResponse.json({ message: "Unable to parse request" }, { status: 400 });
  }
}
