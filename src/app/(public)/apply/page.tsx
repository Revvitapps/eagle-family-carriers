"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantSchema, type ApplicantInput } from "@/lib/validation";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export default function ApplyPage() {
  const form = useForm<ApplicantInput>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      endorsements: [],
      consent: false,
      cdlClass: "A",
      yearsExperience: "0-1",
      shiftPref: "Day",
    },
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const onSubmit = async (values: ApplicantInput) => {
    setStatus("loading");
    const res = await fetch("/api/applicants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) form.reset();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Image src="/file.svg" alt="EFC crest" width={28} height={28} />
          </div>
          <div>
            <p className="text-sm uppercase text-muted-foreground">Eagle Family Carriers</p>
            <h1 className="text-3xl font-semibold tracking-tight">CDL Hiring — Start Here</h1>
          </div>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">Tell us a bit about you. We reach out within one business day.</p>
      </header>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="First name" error={form.formState.errors.firstName?.message} {...form.register("firstName")} />
          <Field label="Last name" error={form.formState.errors.lastName?.message} {...form.register("lastName")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Mobile phone" error={form.formState.errors.phone?.message} {...form.register("phone")} />
          <Field label="Email" error={form.formState.errors.email?.message} {...form.register("email")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="City" error={form.formState.errors.city?.message} {...form.register("city")} />
          <div>
            <label className="block text-sm font-medium text-foreground">State</label>
            <select className="mt-1 w-full rounded border border-input bg-background px-3 py-2" {...form.register("state")}>
              <option value="">Select</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {form.formState.errors.state?.message && <p className="text-sm text-destructive">{form.formState.errors.state.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <LabeledSelect label="CDL Class" options={["A", "B", "C"]} {...form.register("cdlClass")} />
          <LabeledSelect label="Years experience" options={["0-1", "1-3", "3-5", "5+"]} {...form.register("yearsExperience")} />
          <LabeledSelect label="Shift preference" options={["Day", "Night", "Team"]} {...form.register("shiftPref")} />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-foreground">Endorsements</p>
          <div className="flex flex-wrap gap-3">
            {["T", "N", "H", "X"].map((code) => (
              <label key={code} className="flex items-center gap-2 text-sm">
                <input type="checkbox" value={code} {...form.register("endorsements")} />
                <span>{code}</span>
              </label>
            ))}
          </div>
        </div>

        <Field label="Availability date" type="date" {...form.register("availabilityDate")} />
        <LabeledSelect label="Terminal preference" options={["Hagerstown", "Raleigh", "Either"]} {...form.register("terminalPref")} />
        <Field label="Resume link (optional)" {...form.register("resumeUrl")} />
        <div>
          <label className="block text-sm font-medium text-foreground">Notes</label>
          <textarea className="mt-1 w-full rounded border border-input bg-background px-3 py-2" rows={4} {...form.register("notes")} />
        </div>

        {/* Hidden fields */}
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        <input type="hidden" {...form.register("source")} value="Direct" />
        <input type="hidden" {...form.register("utm_source")} />
        <input type="hidden" {...form.register("utm_medium")} />
        <input type="hidden" {...form.register("utm_campaign")} />
        <input type="hidden" {...form.register("user_agent")} value={typeof navigator !== "undefined" ? navigator.userAgent : ""} />

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1" {...form.register("consent")} />
          <span>You may contact me about employment via phone/SMS/email.</span>
        </label>
        {form.formState.errors.consent?.message && <p className="text-sm text-destructive">{form.formState.errors.consent.message}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-foreground px-4 py-3 text-background transition hover:opacity-90 disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit application"}
        </button>

        {status === "ok" && <p className="text-sm text-green-600">Thanks! We received your application.</p>}
        {status === "error" && <p className="text-sm text-destructive">Something went wrong. Please try again.</p>}

        <p className="text-xs text-muted-foreground">
          By submitting, you agree to be contacted about employment. Read our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </main>
  );
}

function Field({ label, error, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input className="mt-1 w-full rounded border border-input bg-background px-3 py-2" {...rest} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function LabeledSelect({
  label,
  options,
  error,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[]; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <select className="mt-1 w-full rounded border border-input bg-background px-3 py-2" {...rest}>
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
