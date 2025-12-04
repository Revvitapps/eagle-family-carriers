import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
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
    if (data.meta.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const ip = req.headers.get("x-forwarded-for") || "";
    const ipHash = ip ? await hashIP(ip) : undefined;

    const db = getDb();

    const [firstName, ...rest] = data.personalInfo.fullName.split(" ");
    const lastName = rest.join(" ") || "(none)";

    await db.insert(applicants).values({
      firstName,
      lastName,
      email: data.personalInfo.email || null,
      phone: data.personalInfo.phone,
      city: data.personalInfo.currentAddress.city,
      state: data.personalInfo.currentAddress.state,
      cdlClass: data.cdlInfo.licenseType,
      yearsExperience: String(data.drivingExperience.totalYearsCdlA),
      endorsements: data.cdlInfo.endorsements,
      availabilityDate: data.positionEligibility.availableStartDate
        ? new Date(data.positionEligibility.availableStartDate).toISOString().slice(0, 10)
        : null,
      shiftPref: data.workPreferences.nightShift ? "Night" : data.workPreferences.dayShift ? "Day" : undefined,
      terminalPref: null,
      resumeUrl: data.attachments.resume || null,
      notes: data.cultureFit.aboutYou,
      source: data.meta.source || "Direct",
      utmSource: data.meta.utm_source,
      utmMedium: data.meta.utm_medium,
      utmCampaign: data.meta.utm_campaign,
      ipHash,
      meta: {
        user_agent: data.meta.user_agent,
        positionEligibility: data.positionEligibility,
        personalInfo: data.personalInfo,
        cdlInfo: data.cdlInfo,
        drivingExperience: data.drivingExperience,
        employmentHistory: data.employmentHistory,
        accidentHistory: data.accidentHistory,
        trafficViolations: data.trafficViolations,
        duiHistory: data.duiHistory,
        dotDrugAlcohol: data.dotDrugAlcohol,
        backgroundCheck: data.backgroundCheck,
        workPreferences: data.workPreferences,
        emergencyContact: data.emergencyContact,
        cultureFit: data.cultureFit,
        attachments: data.attachments,
        certification: data.certification,
      },
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
