export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-4 py-16">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
          <img src="/file.svg" alt="EFC crest" width={40} height={40} />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Eagle Family Carriers</p>
          <h1 className="text-4xl font-semibold tracking-tight">Hiring Landing Starter</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Launch the CDL hiring intake on Vercel. Start with the application form, then light up the owner portal + automations when
            ready.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-md bg-foreground px-6 py-3 text-background transition hover:opacity-90" href="/apply">
              Start Application
            </a>
            <a className="rounded-md border border-input px-6 py-3 text-foreground hover:bg-muted" href="/privacy">
              Privacy
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((item) => (
          <div key={item.title} className="rounded-lg border border-input bg-card p-4 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-muted/80">
              <img src={item.icon} alt={item.title} width={24} height={24} />
            </div>
            <h3 className="text-base font-semibold leading-6">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-input bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight">What&apos;s included</h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>App Router + Tailwind + shadcn/ui</li>
          <li>Edge API to Neon Postgres with Drizzle</li>
          <li>Honeypot + consent gate for anti-spam</li>
          <li>UTM + source capture</li>
        </ul>
      </div>
    </main>
  );
}

const featureCards = [
  {
    title: "Branded crest",
    body: "Crest-forward favicon and header logo keep the experience on-brand.",
    icon: "/file.svg",
  },
  {
    title: "Instant deploy",
    body: "Vercel-ready build with linting, fonts, and Tailwind.",
    icon: "/vercel.svg",
  },
  {
    title: "Global-ready",
    body: "Edge runtime keeps submissions fast across regions.",
    icon: "/globe.svg",
  },
  {
    title: "Owner portal starter",
    body: "Routes stubbed for hiring dashboard and future driver features.",
    icon: "/window.svg",
  },
];
