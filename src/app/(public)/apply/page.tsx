"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantSchema, type ApplicantInput } from "@/lib/validation";
import { copy } from "@/content/efc-hiring.copy";

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
    <main className="relative isolate px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
      <Link
        href="/"
        className="pointer-events-auto absolute left-6 top-6 z-10 flex items-center gap-3"
        aria-label="Back to home"
      >
        <Image
          src="/efc-crest.jpeg"
          alt="EFC crest"
          width={72}
          height={72}
          className="rounded-2xl shadow-2xl shadow-black/40"
          priority
        />
      </Link>
      <div className="relative mx-auto max-w-3xl">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="glass h-12 w-12 items-center justify-center rounded-lg border border-white/20 shadow-lg shadow-cyan-500/20">
              <Image
                src="/efc-crest.jpeg"
                alt="EFC crest"
                width={28}
                height={28}
                className="m-auto"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-200/80">{copy.hero.kicker}</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white">CDL Hiring — Start Here</h1>
            </div>
          </div>
          <p className="max-w-md text-sm text-slate-200/80">{copy.form.subheading}</p>
        </header>

      <form onSubmit={form.handleSubmit(onSubmit)} className="glass-panel space-y-4 rounded-2xl border border-white/15 bg-white/8 p-6 shadow-xl shadow-black/30 backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={copy.form.fields.firstName.label} placeholder={copy.form.fields.firstName.placeholder} error={form.formState.errors.firstName?.message} {...form.register("firstName")} />
          <Field label={copy.form.fields.lastName.label} placeholder={copy.form.fields.lastName.placeholder} error={form.formState.errors.lastName?.message} {...form.register("lastName")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={copy.form.fields.phone.label} placeholder={copy.form.fields.phone.placeholder} error={form.formState.errors.phone?.message} {...form.register("phone")} />
          <Field label={copy.form.fields.email.label} placeholder={copy.form.fields.email.placeholder} error={form.formState.errors.email?.message} {...form.register("email")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={copy.form.fields.city.label} placeholder={copy.form.fields.city.placeholder} error={form.formState.errors.city?.message} {...form.register("city")} />
          <div>
            <label className="block text-sm font-medium text-foreground">{copy.form.fields.state.label}</label>
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
          <LabeledSelect label={copy.form.fields.cdlClass.label} options={copy.form.fields.cdlClass.options} {...form.register("cdlClass")} />
          <LabeledSelect label={copy.form.fields.yearsExperience.label} options={["0-1", "1-3", "3-5", "5+"]} {...form.register("yearsExperience")} />
          <LabeledSelect label={copy.form.fields.shiftPref.label} options={copy.form.fields.shiftPref.options} {...form.register("shiftPref")} />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-foreground">{copy.form.fields.endorsements.label}</p>
          <div className="flex flex-wrap gap-3">
            {copy.form.fields.endorsements.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-sm">
                <input type="checkbox" value={option.value} {...form.register("endorsements")} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Field label={copy.form.fields.availabilityDate.label} type="date" {...form.register("availabilityDate")} />
        <LabeledSelect label={copy.form.fields.terminalPref.label} options={copy.form.fields.terminalPref.options} {...form.register("terminalPref")} />
        <Field label={copy.form.fields.resumeUrl.label} placeholder={copy.form.fields.resumeUrl.placeholder} {...form.register("resumeUrl")} />
        <div>
          <label className="block text-sm font-medium text-foreground">{copy.form.fields.notes.label}</label>
          <textarea
            className="mt-1 w-full rounded border border-input bg-background px-3 py-2"
            rows={4}
            placeholder={copy.form.fields.notes.placeholder}
            {...form.register("notes")}
          />
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
          <span>{copy.form.fields.consent.label}</span>
        </label>
        {form.formState.errors.consent?.message && <p className="text-sm text-destructive">{form.formState.errors.consent.message}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-foreground px-4 py-3 text-background transition hover:opacity-90 disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? copy.form.submitting : copy.form.submit}
        </button>

        {status === "ok" && <p className="text-sm text-green-400">{copy.form.successBody}</p>}
        {status === "error" && <p className="text-sm text-destructive">{copy.form.errorBody}</p>}

        <p className="text-xs text-muted-foreground">
          By submitting, you agree to be contacted about employment. Read our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
      </div>
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
