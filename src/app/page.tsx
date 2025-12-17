"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content/efc-hiring.copy";
import { Bolt, FileText, Globe2, LayoutPanelTop } from "lucide-react";
import Image from "next/image";
import { BulletDot } from "@/components/bullet-dot";

const icons = {
  file: FileText,
  bolt: Bolt,
  globe: Globe2,
  layout: LayoutPanelTop,
} as const;

export default function Home() {
  const [hideHeader, setHideHeader] = useState(false);
  const navLinks = copy.nav.links ?? [];

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setHideHeader(progress > 0.75);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 pb-24 pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_48%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.7))]" />
          <div className="pointer-events-none absolute inset-0 grid-lines" />

      <header
        className={`pointer-events-auto fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          hideHeader ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto mt-4 max-w-6xl rounded-full border border-white/10 bg-black/70 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/efc-crest.jpeg"
                alt="EFC crest"
                width={44}
                height={44}
                className="rounded-xl shadow-lg shadow-black/40"
                priority
              />
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200/80">Eagle Family</p>
                <p className="text-sm font-semibold text-white">CDL Hiring</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-slate-100/85 md:flex">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white hover:drop-shadow"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a
                href="#positions"
                className="rounded-md border border-white/25 bg-white/15 px-4 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                {copy.nav.ctas.primary}
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-32">
        {/* Hero */}
        <section
          id="hero"
          className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/50 p-2 min-h-[82vh] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center hero-pan"
            style={{
              backgroundImage: "url('/eagle-warehouse-trucks.png')",
              backgroundPosition: "center 98%",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/6 to-black/3" />
          <div className="relative flex flex-col items-center gap-6 p-12 text-center reveal">
            <p className="text-base font-bold uppercase tracking-[0.24em] text-white drop-shadow">{copy.hero.kicker}</p>
            <h1 className="text-5xl font-semibold tracking-tight text-white drop-shadow">“Where Great Drivers Take Flight”</h1>
            <div className="mx-auto mt-4 inline-flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-black/75 px-6 py-5 text-slate-100 shadow-lg shadow-black/40 backdrop-blur">
              <p className="text-sm leading-relaxed drop-shadow text-center">{copy.hero.subtitle}</p>
              <a
                className="rounded-md border border-white/25 bg-white/15 px-6 py-3 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                href="#positions"
              >
                {copy.hero.primaryCta}
              </a>
            </div>
            <div className="mt-10 flex flex-col items-center gap-2 text-slate-100/70 text-xs uppercase tracking-[0.22em]">
              <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <span>Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* Role overview */}
        <section
          id="role"
          className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">
                Now hiring
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.role.heading}</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-100/85">{copy.sections.role.summary}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-center shadow-lg shadow-black/30 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">Application</p>
              <p className="text-lg font-semibold text-white">5 minutes</p>
              <p className="text-xs text-slate-200/70">Response within 24 hours</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <CardBlock title={copy.sections.role.location.heading} items={copy.sections.role.location.bullets} />
            <CardBlock title={copy.sections.role.employment.heading} items={copy.sections.role.employment.bullets} />
            <CardBlock title={copy.sections.role.compensation.heading} items={copy.sections.role.compensation.bullets} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <CardBlock title={copy.sections.role.responsibilities.heading} items={copy.sections.role.responsibilities.bullets} />
            <CardBlock title={copy.sections.role.qualifications.heading} items={copy.sections.role.qualifications.bullets} />
            <CardBlock title={copy.sections.role.benefits.heading} items={copy.sections.role.benefits.bullets} />
          </div>

          <div className="mt-8 rounded-2xl border border-white/15 bg-black/45 p-5 shadow-lg shadow-black/30 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">{copy.sections.role.applySteps.heading}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-100/85">
              {copy.sections.role.applySteps.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <BulletDot />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-cyan-100">
              <a href="#positions" className="rounded-md border border-white/15 bg-white/5 px-3 py-2 transition hover:-translate-y-0.5 hover:bg-white/10">
                View open positions
              </a>
              <a href="#role" className="rounded-md border border-white/15 bg-white/5 px-3 py-2 transition hover:-translate-y-0.5 hover:bg-white/10">
                Review qualifications
              </a>
            </div>
          </div>
        </section>

        {/* Positions */}
        <section
          id="positions"
          className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow">Open positions</h2>
              <p className="mt-1 text-sm text-slate-100/85">Choose the role that fits, then review qualifications before applying.</p>
            </div>
            <a
              href="#role"
              className="rounded-md border border-white/25 bg-white/15 px-4 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Review qualifications
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {copy.sections.positions.map((position) => (
              <div
                key={position.title}
                className="rounded-2xl border border-white/15 bg-black/45 p-5 shadow-lg shadow-black/30 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <a href={`/positions/${position.slug}`} className="group">
                    <h3 className="text-xl font-semibold text-white transition group-hover:text-cyan-100">{position.title}</h3>
                    <p className="text-sm text-cyan-100">{position.payRange}</p>
                  </a>
                </div>
                <p className="mt-3 text-sm text-slate-100/85">{position.summary}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-100/85">
                  {position.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <BulletDot />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`/positions/${position.slug}`}
                    className="rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm text-white transition hover:-translate-y-0.5 hover:border-white/30"
                  >
                    See required qualifications
                  </a>
                  <a
                    href={`/positions/${position.slug}#apply`}
                    className="rounded-md border border-white/25 bg-white/15 px-4 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    I meet these — Start application
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick highlights */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal">
            {copy.features.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons];
              return (
                <div
                  key={item.title}
                className="rounded-xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-black/30 backdrop-blur-xl"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-cyan-200">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold leading-6 text-white drop-shadow">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-100/85">{item.body}</p>
              </div>
            );
          })}
        </div>

        {/* Story */}
        <section
          id="story"
          className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">
                {copy.sections.story.ribbon}
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.story.heading}</h2>
              <p className="text-base leading-relaxed text-slate-100/85">{copy.sections.story.body}</p>
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-sm">
              {copy.sections.story.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 shadow-md shadow-black/30 backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-200/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bonuses */}
        <section
          id="bonuses"
          className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.bonuses.heading}</h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-100/85">{copy.sections.bonuses.intro}</p>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
              Bonuses + rewards
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.sections.bonuses.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/15 bg-black/45 p-4 shadow-lg shadow-black/30 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-100/85">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <BulletDot />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Schedules */}
        <section
          id="schedule"
          className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.schedule.heading}</h2>
              <p className="mt-2 text-sm text-slate-100/85">{copy.sections.schedule.body}</p>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
              Routes + hours
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-100/85">
            {copy.sections.schedule.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 shadow-inner shadow-black/20">
                <BulletDot />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Routes */}
        <section
          id="routes"
          className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.routes.heading}</h2>
              <p className="text-sm text-slate-100/85">{copy.sections.routes.body}</p>
            </div>
            <a
              href={copy.sections.routes.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/25 bg-white/15 px-4 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              {copy.sections.routes.ctaLabel}
            </a>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-100/85">
            {copy.sections.routes.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 shadow-inner shadow-black/20">
                <BulletDot />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Apply */}
        <section
          id="apply"
          className="rounded-3xl border border-white/15 bg-gradient-to-r from-white/12 via-white/8 to-white/12 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 reveal"
        >
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.apply.heading}</h2>
                <p className="text-sm text-slate-100/85">{copy.sections.apply.body}</p>
                <ul className="mt-2 space-y-1 text-xs text-slate-100/80">
                {copy.sections.role.applySteps.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BulletDot />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-slate-200/75">
                By starting the application, you acknowledge you meet the required qualifications listed above.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="/positions/solo-run#apply"
                className="rounded-md border border-white/25 bg-white/15 px-6 py-3 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Solo driver application
              </a>
              <a
                href="/positions/start-asap#apply"
                className="rounded-md border border-white/25 bg-white/10 px-6 py-3 text-white shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Team driver application
              </a>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-sm text-slate-100 shadow-inner shadow-black/30 backdrop-blur">
            <p className="font-semibold text-white text-center">Privacy</p>
            <p className="mt-1 leading-relaxed text-slate-200/85 text-center">
              We collect only the information needed to evaluate your application and contact you about employment. See our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-20 border-t border-white/10 bg-black/40 py-10 shadow-inner shadow-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/efc-crest.jpeg" alt="EFC crest" width={44} height={44} className="rounded-xl shadow-lg shadow-black/40" />
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200/80">Eagle Family Carriers</p>
              <p className="text-sm font-semibold text-white">CDL Hiring</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-100/80">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white hover:drop-shadow">
                {item.label}
              </a>
            ))}
            <a
              href="/apply"
              className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              {copy.sections.apply.primaryCta}
            </a>
          </nav>
        </div>
        <div className="mx-auto mt-4 max-w-6xl px-4 text-xs text-slate-200/70">
          <p>Placeholder for company info, address, and required disclosures.</p>
        </div>
      </footer>
    </main>
  );
}

function CardBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/45 p-5 shadow-lg shadow-black/30 backdrop-blur">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-100/85">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <BulletDot />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
