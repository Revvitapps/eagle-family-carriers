import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applicants } from "@/db/schema";
import { applicantSchema } from "@/lib/validation";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = applicantSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    // Honeypot guard: silently accept bot submissions
    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const ip = req.headers.get("x-forwarded-for") || "";
    const ipHash = ip ? await hashIP(ip) : undefined;

    await db.insert(applicants).values({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || null,
      phone: data.phone,
      city: data.city,
      state: data.state,
      cdlClass: data.cdlClass,
      yearsExperience: data.yearsExperience,
      endorsements: data.endorsements,
      availabilityDate: data.availabilityDate ? new Date(data.availabilityDate).toISOString().slice(0, 10) : null,
      shiftPref: data.shiftPref,
      terminalPref: data.terminalPref,
      resumeUrl: data.resumeUrl || null,
      notes: data.notes,
      source: data.source || "Direct",
      utmSource: data.utm_source,
      utmMedium: data.utm_medium,
      utmCampaign: data.utm_campaign,
      ipHash,
      meta: { user_agent: data.user_agent },
    });

    // TODO: append to Sheets, send owner notifications via Resend, auto-reply to applicant
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function hashIP(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
