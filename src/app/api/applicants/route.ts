import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { applicants } from "@/db/schema";
import { applicantSchema, type ApplicantData } from "@/lib/validation";

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

    const emailSent = await sendApplicationEmail(data).catch((err) => {
      console.error("Resend email failed", err);
      return false;
    });

    // TODO: append to Sheets, auto-reply to applicant
    return NextResponse.json({ ok: true, emailSent });
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

async function sendApplicationEmail(data: ApplicantData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!apiKey || !from || !to) {
    console.warn("Missing RESEND_API_KEY/EMAIL_FROM/EMAIL_TO env vars; skipping email.");
    return false;
  }

  const subject = `New driver application: ${data.personalInfo.fullName}`;
  const text = buildApplicationEmailText(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend request failed (${response.status}) ${detail}`.trim());
  }

  return true;
}

function buildApplicationEmailText(data: ApplicantData) {
  const lines = [
    "New application received",
    "",
    `Name: ${data.personalInfo.fullName}`,
    `Email: ${data.personalInfo.email}`,
    `Phone: ${data.personalInfo.phone}`,
    `City/State: ${data.personalInfo.currentAddress.city}, ${data.personalInfo.currentAddress.state}`,
    `Position: ${data.positionEligibility.positionAppliedFor}`,
    `Employment type: ${data.positionEligibility.employmentType}`,
    `Available start: ${data.positionEligibility.availableStartDate}`,
    `CDL: ${data.cdlInfo.licenseType} (${data.cdlInfo.issuingState})`,
    `Years CDL-A: ${data.drivingExperience.totalYearsCdlA}`,
    `Endorsements: ${data.cdlInfo.endorsements?.join(", ") || "None"}`,
    `Team partner: ${data.positionEligibility.teamPartner?.name || "None"}`,
    `Source: ${data.meta.source || "Direct"}`,
  ];

  return lines.join("\n");
}
