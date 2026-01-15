"use client";

import { useEffect, useState } from "react";

type CaptureEvent = {
  url: string;
  title: string;
  timestamp: string;
};

const driverHighlights = [
  { label: "Driver ROI", value: "$6.2K", note: "Weekly fuel savings" },
  { label: "Idle Reduction", value: "14%", note: "Compared to last month" },
  { label: "Route Integrity", value: "92%", note: "Loads hitting preferred lanes" },
  { label: "Chrome Watch", value: "3 alerts", note: "Pending driver action" },
];

export default function DriverDashboard() {
  const [captures, setCaptures] = useState<CaptureEvent[]>([]);

  useEffect(() => {
    fetch("/api/chrome-capture")
      .then((res) => res.json())
      .then((data) => {
        setCaptures(Array.isArray(data.events) ? data.events : []);
      })
      .catch(() => {
        setCaptures([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-12 text-slate-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="rounded-3xl border border-white/10 bg-black/60 p-6 shadow-xl shadow-black/40 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Driver dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">Driver.eaglefamilycarriers.com</h1>
          <p className="mt-2 text-sm text-slate-200/80">
            Chrome plugin captures fuel-saving cues from dispatch, load boards, and refueling screens. Use this hub to
            review alerts, route compliance, and share quick coaching notes.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {driverHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-black/30"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.value}</p>
              <p className="mt-1 text-xs text-slate-300">{item.note}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/50 p-6 shadow-xl shadow-black/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Chrome plugin captures</h2>
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Live</span>
          </div>
          <p className="mt-2 text-sm text-slate-200/80">
            Each capture reflects a screen snapshot triggered via the Chrome extension. Use these to coach and escalate
            opportunities before they hit the owner dashboard.
          </p>
          <div className="mt-4 space-y-3">
            {captures.length === 0 && (
              <p className="text-sm text-slate-300">No captures yet / waiting for Chrome helper.</p>
            )}
            {captures.map((capture) => (
              <article
                key={capture.timestamp + capture.url}
                className="rounded-2xl border border-white/5 bg-white/5 p-4 text-slate-100 shadow-lg shadow-black/40"
              >
                <p className="text-xs text-slate-400">{new Date(capture.timestamp).toLocaleString()}</p>
                <p className="text-sm font-semibold text-white">{capture.title}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">{capture.url}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-700/10 to-black/60 p-6 shadow-2xl shadow-black/50">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Next steps</h2>
              <p className="text-sm text-slate-200/80">
                Once the driver dashboard is sticky, we can feed the same captures into motivation emails, prize
                programs, and the weekly Top 5 savings playbook.
              </p>
            </div>
            <button className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-black/40 transition hover:border-cyan-300 hover:bg-white/20">
              Touch base with ops
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
