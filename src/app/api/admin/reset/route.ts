import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const RESET_SECRET = process.env.ADMIN_RESET_SECRET;

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    if (!RESET_SECRET || payload?.secret !== RESET_SECRET) {
      return NextResponse.json({ message: "Reset secret missing or invalid" }, { status: 403 });
    }
    if (!payload?.username || !payload?.newPassword) {
      return NextResponse.json({ message: "Missing username or newPassword" }, { status: 400 });
    }
    const hash = bcrypt.hashSync(payload.newPassword, 10);
    return NextResponse.json({
      message: "Password hashed, paste the hash into your env var list",
      username: payload.username,
      passwordHash: hash,
    });
  } catch {
    return NextResponse.json({ message: "Unable to parse request" }, { status: 400 });
  }
}
