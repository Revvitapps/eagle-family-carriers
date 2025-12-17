"use client";

import Link from "next/link";
import Image from "next/image";
import { copy } from "@/content/efc-hiring.copy";
import { DriverApplicationForm } from "./driver-application-form";
import { BulletDot } from "./bullet-dot";

export default function PositionPage({ positionSlug }: { positionSlug: string }) {
  const position =
    copy.sections.positions.find((p) => p.slug === positionSlug) ??
    copy.sections.positions[0];

  return (
    <main className="relative isolate min-h-screen bg-[#0b0d14] px-4 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_48%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.8))]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-8">
        <Link href="/" className="inline-flex items-center gap-3 text-sm text-slate-200 transition hover:text-white">
          <Image src="/efc-crest.jpeg" alt="EFC crest" width={44} height={44} className="rounded-xl shadow-lg shadow-black/40" />
          <span>Eagle Family Carriers — CDL Hiring</span>
        </Link>

        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Open position</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white drop-shadow">{position.title}</h1>
              <p className="text-lg font-semibold text-cyan-100">{position.payRange}</p>
              <p className="text-sm text-slate-100/85">{position.summary}</p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="#apply"
                className="rounded-md border border-white/25 bg-white/15 px-4 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                I qualify — Start application
              </a>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard title="Role snapshot" items={position.bullets} />
            <InfoCard title={copy.sections.role.employment.heading} items={copy.sections.role.employment.bullets} />
            <InfoCard title={copy.sections.role.compensation.heading} items={copy.sections.role.compensation.bullets} />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title={copy.sections.role.qualifications.heading} items={copy.sections.role.qualifications.bullets} />
            <InfoCard title={copy.sections.role.responsibilities.heading} items={copy.sections.role.responsibilities.bullets} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <InfoCard title={copy.sections.role.benefits.heading} items={[`Pay range: ${position.payRange}`, ...copy.sections.role.benefits.bullets]} />
            <InfoCard title={copy.sections.routes.heading} items={copy.sections.routes.bullets} cta={{ label: copy.sections.routes.ctaLabel, href: copy.sections.routes.ctaHref }} />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">About Eagle Family Carriers</h2>
              <p className="mt-1 max-w-3xl text-sm text-slate-100/85">{copy.sections.story.body}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-white">
              {copy.sections.story.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-center shadow-md shadow-black/30 backdrop-blur">
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="apply">
          <DriverApplicationForm defaultPosition={position.title} isTeam={Boolean(position.isTeam)} />
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, items, cta }: { title: string; items: string[]; cta?: { label: string; href: string } }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/35 p-4 shadow-md shadow-black/25 backdrop-blur">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-100/85">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <BulletDot />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <a
          href={cta.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs text-white transition hover:-translate-y-0.5 hover:bg-white/20"
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
