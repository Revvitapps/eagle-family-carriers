import { NextResponse } from "next/server";
import { ensureCaptureSchema, neonClient } from "@/lib/neon";

type ChromeCapturePayload = {
  url: string;
  title: string;
  timestamp: string;
};

type ChromeCaptureEntry = ChromeCapturePayload & { receivedAt: string };

declare global {
  var __efcChromeCaptures: ChromeCaptureEntry[] | undefined;
}

const captureStore = globalThis.__efcChromeCaptures ?? [];
globalThis.__efcChromeCaptures = captureStore;

export async function GET() {
  return NextResponse.json({ events: captureStore.slice(-20).reverse() });
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ChromeCapturePayload;
    if (!payload.url || !payload.timestamp) {
      return NextResponse.json({ message: "Invalid capture" }, { status: 400 });
    }

    await ensureCaptureSchema();
    await neonClient.sql`
      INSERT INTO chrome_captures (url, title, timestamp)
      VALUES (${payload.url}, ${payload.title ?? ""}, ${payload.timestamp});
    `;

    captureStore.push({ ...payload, receivedAt: new Date().toISOString() });
    return NextResponse.json({ message: "Captured", total: captureStore.length });
  } catch {
    return NextResponse.json({ message: "Unable to parse capture" }, { status: 400 });
  }
}
