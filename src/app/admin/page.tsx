"use client";

import { FormEvent, useEffect, useState } from "react";
import { BarChart3, DownloadCloud, ShieldCheck, Upload } from "lucide-react";

const kpis = [
  { label: "Total ROI", value: "$48.6K", change: "+18% vs last month" },
  { label: "Fuel Cost", value: "$132.4K", change: "1.2% lower vs plan" },
  { label: "Fuel Saved", value: "42,700 Gal", change: "+3.4% efficiency" },
  { label: "Idle Time", value: "87 hrs", change: "-12% month-to-date" },
];

const focusAreas = [
  {
    title: "Preferred Network Compliance",
    summary: "73% of loads are hitting Pilot/Love's/TA. Flag lanes under 80% for coaching.",
    metric: "7 lanes below target",
  },
  {
    title: "Missed Discount Analyzer",
    summary: "Alerting on $0.12/gal savings opportunities in Midwest and NE corridors.",
    metric: "Avg. $560/week recoverable",
  },
  {
    title: "Chrome Load Watcher",
    summary: "Auto-refresh keeps dispatch data mirrored; watchlist changes in green.",
    metric: "2 load alerts open",
  },
];

const timeline = [
  { title: "Week 1", details: "Data connectors, station sheet parser, dashboard skeleton." },
  { title: "Week 2", details: "Route map + savings math + first email." },
  { title: "Week 3", details: "Motive ingest, dismissal monitor, Chrome watcher MVP." },
  { title: "Week 4", details: "Acceptance testing, baseline report, owner training." },
];

const uploadTargets = [
  { name: "Station Pricing Sheet", clue: "CSV from FedEx/Opus", icon: Upload },
  { name: "Settlements", clue: "WEX/EFS raw CSVs", icon: DownloadCloud },
  { name: "Motive Events", clue: "Read-only ingest", icon: ShieldCheck },
];

export default function AdminDashboard() {
  const [authStatus, setAuthStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [authMessage, setAuthMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});
  const [receivedCaptures, setReceivedCaptures] = useState(0);

  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (!detail) return;
      fetch("/api/chrome-capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(detail),
      }).then((res) => {
        if (res.ok) {
          setReceivedCaptures((prev) => prev + 1);
        }
      });
    };

    window.addEventListener("efcAdminCapture", listener as EventListener);
    return () => window.removeEventListener("efcAdminCapture", listener as EventListener);
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get("user"),
      password: formData.get("pass"),
    };
    setAuthStatus("loading");
    setAuthMessage("");
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setAuthStatus("success");
        setAuthMessage("Access granted — encrypted session created.");
      } else {
        const json = await response.json().catch(() => ({}));
        setAuthStatus("error");
        setAuthMessage(json.message ?? "Invalid credentials.");
      }
    } catch {
      setAuthStatus("error");
      setAuthMessage("Unable to reach the auth service.");
    }
  };

  const handleUpload = async (target: string, file?: File) => {
    if (!file) return;
    setUploadStatus((prev) => ({ ...prev, [target]: "Uploading…" }));
    const formData = new FormData();
    formData.append("target", target);
    formData.append("file", file);
    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setUploadStatus((prev) => ({ ...prev, [target]: "Upload recorded" }));
      } else {
        setUploadStatus((prev) => ({ ...prev, [target]: "Upload failed" }));
      }
    } catch {
      setUploadStatus((prev) => ({ ...prev, [target]: "Upload failed" }));
    }
  };

  const handleConnectApi = (target: string) => {
    setUploadStatus((prev) => ({ ...prev, [target]: "API connector pending" }));
    setTimeout(() => {
      setUploadStatus((prev) => ({ ...prev, [target]: "API sync scheduled" }));
    }, 600);
  };

  return (
    <div className="min-h-screen px-4 py-12 text-slate-50">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-white/20 bg-black/60 p-8 shadow-2xl shadow-black/60 backdrop-blur">
        <section className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Admin Console</p>
          <h1 className="text-4xl font-semibold text-white">Fuel Guidance Pilot</h1>
          <p className="max-w-3xl text-sm text-slate-200/80">
            Weekly savings actions, route-aware fuel insights, and chrome load watching all feed into this
            password-protected owner dashboard. CSV uploads + API feeds keep Neon/Postgres data fresh.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-[2fr_1fr] xl:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-cyan-700/30 to-slate-900/40 p-6 shadow-lg shadow-cyan-900/40">
            <h2 className="text-xl font-semibold text-white">Access Control</h2>
            <p className="text-sm text-slate-100/80">
              Only authenticated ops and Paul get owner-level KPIs. OTP/SSO hooks can be wired in later.
            </p>
            <form className="mt-6 grid gap-3" onSubmit={handleLogin}>
              <label className="text-xs uppercase tracking-[0.32em] text-slate-200/70">Username</label>
              <input
                type="text"
                name="user"
                placeholder="ops@eaglefamilycarriers.com"
                className="rounded-2xl bg-black/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <label className="text-xs uppercase tracking-[0.32em] text-slate-200/70">Password</label>
              <input
                type="password"
                name="pass"
                placeholder="••••••••"
                className="rounded-2xl bg-black/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                className="mt-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-200 hover:bg-white/15"
                type="submit"
              >
                {authStatus === "loading" ? "Authenticating…" : "Unlock dashboard"}
              </button>
              {authStatus !== "idle" && (
                <p
                  className={`mt-1 text-xs ${
                    authStatus === "success" ? "text-emerald-300" : "text-amber-300"
                  }`}
                >
                  {authMessage}
                </p>
              )}
            </form>
          </div>
          <div className="rounded-2xl border border-white/15 bg-slate-900/50 p-6 shadow-lg shadow-black/50">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-300/70">Pilot Status</p>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="h-4 w-4 rounded-full bg-emerald-400" />
              <span>Active | 90-day Fuel Guidance pilot</span>
            </div>
            <p className="mt-4 text-sm text-slate-100/80">
              Neon/Postgres ready, Vercel blob set, and weekly top-5 actions email queued.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg shadow-black/40 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-200/70">{stat.change}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-5 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-slate-900/50 p-6 shadow-xl shadow-cyan-900/30">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Owner Insights</h2>
              <button className="text-sm text-cyan-200 underline-offset-4 hover:underline">Export PDF</button>
            </div>
            <div className="space-y-4 text-sm text-slate-100/80">
              {focusAreas.map((area) => (
                <article
                  key={area.title}
                  className="rounded-2xl border border-white/20 bg-black/30 p-4 shadow-lg shadow-black/40"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{area.title}</h3>
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">{area.metric}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-200/80">{area.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/15 bg-black/40 p-6 shadow-xl shadow-black/40">
            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-slate-400">
              <ShieldCheck className="text-cyan-300" />
              <span>Watchlist</span>
            </div>
            <p className="text-sm text-slate-200/80">
              Live Chrome plugin feed will stream discrete load events. For now monitor these alerts.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Captures received: {receivedCaptures}
            </p>
            <ul className="space-y-3 text-slate-100/80">
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold">Load 1873</p>
                  <p className="text-xs text-slate-300">Chattanooga → Columbus</p>
                </div>
                <p className="text-xs text-emerald-300">Cheaper on Pilot by $0.07/gal</p>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold">Gap Alert</p>
                  <p className="text-xs text-slate-300">EFS vs station sheet mismatch</p>
                </div>
                <p className="text-xs text-amber-300">Review lane 14</p>
              </li>
              <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold">Idle Heatmap</p>
                  <p className="text-xs text-slate-300">Atlanta yard</p>
                </div>
                <p className="text-xs text-cyan-200">-9% vs baseline</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/15 bg-black/40 p-6 shadow-xl shadow-black/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">CSV & API Uploads</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Neon/Postgres sync</p>
            </div>
            <p className="mt-2 text-sm text-slate-100/80">
              Drop files or point to API connectors so the dashboard stays current. You can review ingested rows and
              let the system auto-normalize station pricing.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {uploadTargets.map((target) => {
                const Icon = target.icon;
                const inputId = `${target.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-upload`;
                return (
                  <div key={target.name} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-200">
                    <div className="flex items-center gap-2 text-cyan-300">
                      <Icon className="h-4 w-4" />
                      <span>{target.name}</span>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">{target.clue}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <input
                        id={inputId}
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={(event) => handleUpload(target.name, event.target.files?.[0])}
                      />
                      <label
                        htmlFor={inputId}
                        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.4em] text-white transition hover:border-cyan-400 hover:bg-white/20"
                      >
                        Upload
                      </label>
                      <span className="text-[11px] text-slate-400">or</span>
                      <button
                        type="button"
                        className="text-[11px] font-semibold text-cyan-300 underline-offset-4 hover:underline"
                        onClick={() => handleConnectApi(target.name)}
                      >
                        Connect API
                      </button>
                    </div>
                    {uploadStatus[target.name] && (
                      <p className="mt-2 text-[11px] text-slate-300">{uploadStatus[target.name]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-black/50 p-6 shadow-xl shadow-black/50">
            <h2 className="text-xl font-semibold text-white">Pilot Timeline</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-100/80">
              {timeline.map((entry) => (
                <div key={entry.title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/90">{entry.title}</p>
                  <p className="text-sm font-semibold text-white">{entry.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/90 p-6 shadow-2xl shadow-black/50">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Want to drill deeper?</h2>
              <p className="text-sm text-slate-200/80">
                Future dashboards can include driver scorecards, Motive ingestion logs, and weekly Top 5 savings emails
                with screenshot attachments.
              </p>
            </div>
            <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/40 transition hover:border-cyan-300 hover:bg-white/10">
              <BarChart3 className="h-4 w-4" />
              Build driver dashboard next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
