import { copy } from "@/content/efc-hiring.copy";
import { Bolt, FileText, Globe2, LayoutPanelTop } from "lucide-react";

const icons = {
  file: FileText,
  bolt: Bolt,
  globe: Globe2,
  layout: LayoutPanelTop,
} as const;

export default function Home() {
  return (
    <main className="relative isolate min-h-screen px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.6))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(12,173,211,0.08),rgba(255,255,255,0)),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(12,173,211,0.05),rgba(255,255,255,0.04))]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex items-start gap-4">
          <div className="glass h-14 w-14 shrink-0 rounded-lg border border-white/20 bg-white/10 shadow-xl shadow-cyan-500/30 backdrop-blur-xl">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-black/40">
              <img src="/file.svg" alt="EFC crest" width={40} height={40} />
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-200/80">{copy.hero.kicker}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow">{copy.hero.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-slate-200/90 drop-shadow">{copy.hero.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="rounded-md bg-white/90 px-6 py-3 text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-white" href="/apply">
                {copy.hero.primaryCta}
              </a>
              <a className="rounded-md border border-white/30 px-6 py-3 text-white/90 backdrop-blur hover:bg-white/10" href="/privacy">
                {copy.hero.secondaryCta}
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
                className="glass-panel rounded-xl border border-white/15 bg-white/5 p-4 shadow-lg shadow-black/40 backdrop-blur-xl"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-cyan-200">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold leading-6 text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-200/80">{item.body}</p>
              </div>
            );
          })}
        </div>

        <div className="glass-panel rounded-2xl border border-white/15 bg-white/8 p-6 shadow-xl shadow-black/30 backdrop-blur-xl">
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
      </div>
    </main>
  );
}
