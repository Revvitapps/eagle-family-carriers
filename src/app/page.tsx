import { copy } from "@/content/efc-hiring.copy";
import { Bolt, FileText, Globe2, LayoutPanelTop } from "lucide-react";
import Image from "next/image";

const icons = {
  file: FileText,
  bolt: Bolt,
  globe: Globe2,
  layout: LayoutPanelTop,
} as const;

export default function Home() {
  const navLinks = copy.nav.links ?? [];

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 pb-24 pt-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_48%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.7))]" />
      <div className="pointer-events-none absolute inset-0 grid-lines" />

      <header className="pointer-events-auto sticky top-0 z-30 mb-16 md:mb-20">
        <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-black/50 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur">
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
                href="#apply"
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
            <h1 className="text-5xl font-semibold tracking-tight text-white drop-shadow">{copy.hero.title}</h1>
            <div className="mx-auto mt-4 inline-flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-black/75 px-6 py-5 text-slate-100 shadow-lg shadow-black/40 backdrop-blur">
              <p className="text-sm leading-relaxed drop-shadow text-center">{copy.hero.subtitle}</p>
              <a
                className="rounded-md border border-white/25 bg-white/15 px-6 py-3 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                href="/apply"
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
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
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
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Culture */}
        <section
          id="culture"
          className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.culture.heading}</h2>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
                Family environment
              </span>
            </div>
            <p className="max-w-3xl text-sm text-slate-100/85">{copy.sections.culture.body}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {copy.sections.culture.pillars.map((pillar) => (
                <div key={pillar} className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3 shadow-lg shadow-black/25 backdrop-blur">
                  <p className="text-sm text-slate-100/90">{pillar}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-white/10 to-white/5 px-4 py-4 shadow-inner shadow-black/30">
              <p className="text-base font-medium text-white">“{copy.sections.culture.quote.text}”</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-200/70">{copy.sections.culture.quote.attribution}</p>
            </div>
          </div>
        </section>

        {/* Included */}
        <div className="rounded-2xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur-xl reveal">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-white">{copy.included.heading}</h2>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
              Owner portal starter
            </span>
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-slate-200/85 sm:grid-cols-2">
            {copy.included.bullets.map((item) => (
              <li key={item} className="inline-flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply */}
        <section
          id="apply"
          className="rounded-3xl border border-white/15 bg-gradient-to-r from-white/12 via-white/8 to-white/12 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 reveal"
        >
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow">{copy.sections.apply.heading}</h2>
              <p className="text-sm text-slate-100/85">{copy.sections.apply.body}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="/apply"
                className="rounded-md border border-white/25 bg-white/15 px-6 py-3 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                {copy.sections.apply.primaryCta}
              </a>
              <a
                href="mailto:hiring@eaglefamilycarriers.com"
                className="rounded-md border border-white/15 bg-transparent px-6 py-3 text-white shadow-inner shadow-black/20 transition hover:-translate-y-0.5 hover:border-white/30"
              >
                {copy.sections.apply.secondaryCta}
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
    </main>
  );
}
