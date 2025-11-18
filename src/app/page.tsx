import { copy } from "@/content/efc-hiring.copy";
import { Bolt, FileText, Globe2, LayoutPanelTop } from "lucide-react";
import Link from "next/link";

const icons = {
  file: FileText,
  bolt: Bolt,
  globe: Globe2,
  layout: LayoutPanelTop,
} as const;

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_48%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.05),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.7))]" />
      <div className="pointer-events-none absolute inset-0 grid-lines" />

      {/* Floating logo letterhead-style */}
      <Link
        href="/"
        className="pointer-events-auto absolute left-6 top-6 z-10 flex items-center gap-3"
        aria-label="Back to home"
      >
        <img src="/efc-crest.jpeg" alt="EFC crest" width={72} height={72} className="rounded-2xl shadow-2xl shadow-black/40" />
      </Link>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
        <div className="mb-2 h-16" aria-hidden="true" />

        <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/50 p-2">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/eagle-warehouse-trucks.png')",
              backgroundPosition: "center 98%",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/6 to-black/3" />
          <div className="relative flex flex-col items-center gap-6 p-12 text-center">
            <p className="text-base font-bold uppercase tracking-[0.24em] text-white drop-shadow">{copy.hero.kicker}</p>
            <h1 className="text-5xl font-semibold tracking-tight text-white drop-shadow">{copy.hero.title}</h1>
            <div className="mx-auto mt-33 inline-flex max-w-lg flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-black/75 px-6 py-5 text-slate-100 shadow-lg shadow-black/40 backdrop-blur">
              <p className="text-sm leading-relaxed drop-shadow text-center">{copy.hero.subtitle}</p>
              <a
                className="rounded-md border border-white/25 bg-white/15 px-6 py-3 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                href="/apply"
              >
                {copy.hero.primaryCta}
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl shadow-black/30 backdrop-blur-xl">
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

        <div className="flex justify-center">
          <a className="rounded-md border border-white/25 bg-white/15 px-6 py-3 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20" href="#">
            5-min evaluation with our virtual assistant
          </a>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm text-slate-100 shadow-lg shadow-black/30 backdrop-blur-xl">
          <p className="font-semibold text-white text-center">Privacy</p>
          <p className="mt-1 leading-relaxed text-slate-200/85 text-center">
            We collect only the information needed to evaluate your application and contact you about employment. See our{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
