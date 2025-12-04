"use client";

import Link from "next/link";
import Image from "next/image";
import { DriverApplicationForm } from "@/components/driver-application-form";
import { copy } from "@/content/efc-hiring.copy";

export default function ApplyPage() {
  return (
    <main className="relative isolate px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
      <div className="relative mx-auto max-w-5xl space-y-8">
        <Link href="/" className="inline-flex items-center gap-3 text-sm text-slate-200 transition hover:text-white">
          <Image src="/efc-crest.jpeg" alt="EFC crest" width={48} height={48} className="rounded-xl shadow-2xl shadow-black/40" />
          <span>{copy.hero.kicker} — CDL Hiring</span>
        </Link>

        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">Eagle Family Carriers</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">CDL-A Driver Application</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-100/85">
            Full DOT-ready application. Expect to spend a few minutes. You can upload documents at the end or provide them later.
          </p>
        </header>

        <DriverApplicationForm />
      </div>
    </main>
  );
}
