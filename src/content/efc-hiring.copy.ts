export const copy = {
  meta: {
    title: "Eagle Family Carriers — Hiring",
    description:
      "Launch the CDL hiring intake on Vercel. Start with the application form, then light up the owner portal + automations when ready.",
    ogImageAlt: "Eagle Family Carriers Hiring",
  },

  nav: {
    brand: "Eagle Family Carriers",
    ctas: {
      primary: "Start Application",
      secondary: "Privacy",
    },
    links: [
      { label: "Story", href: "#story" },
      { label: "Bonuses", href: "#bonuses" },
      { label: "Schedules", href: "#schedule" },
      { label: "Family", href: "#culture" },
      { label: "Apply", href: "#apply" },
    ],
  },

  hero: {
    kicker: "EAGLE FAMILY CARRIERS",
    title: "CDL Driver Application",
    subtitle: "Apply in a few minutes. Your details go straight to the Eagle Family Carriers hiring team.",
    primaryCta: "Start Application",
    secondaryCta: "Privacy",
  },

  features: [
    {
      icon: "file",
      title: "Branded crest",
      body: "Eagle Family Carriers logo and crest on every screen.",
    },
    {
      icon: "bolt",
      title: "Fast intake",
      body: "Edge runtime and light form for quick submissions.",
    },
    {
      icon: "globe",
      title: "Reliable logging",
      body: "Submissions land in your database with UTM/source capture.",
    },
    {
      icon: "layout",
      title: "Owner portal starter",
      body: "Dashboard routes stubbed for applicant queue and stages.",
    },
  ],

  included: {
    heading: "What's included",
    bullets: [
      "App Router + Tailwind + shadcn/ui",
      "Edge API to Neon Postgres with Drizzle",
      "Honeypot + consent gate for anti-spam",
      "UTM + source capture",
    ],
  },

  form: {
    heading: "CDL Driver Application",
    subheading: "Apply in 3 minutes. We’ll reach out within 24 hours.",
    submit: "Submit Application",
    submitting: "Submitting…",
    successTitle: "Application received",
    successBody: "Thanks for applying. We’ll review your details and reach out shortly.",
    errorTitle: "Something went wrong",
    errorBody: "Please check your info and try again. If the issue continues, email hiring@eaglefamilycarriers.com.",

    fields: {
      firstName: { label: "First name", placeholder: "Jane" },
      lastName: { label: "Last name", placeholder: "Smith" },
      phone: { label: "Mobile phone", placeholder: "(555) 555-5555" },
      email: { label: "Email", placeholder: "jane@example.com" },
      city: { label: "City", placeholder: "Raleigh" },
      state: { label: "State", placeholder: "NC" },
      cdlClass: {
        label: "CDL Class",
        options: ["A", "B", "C"],
      },
      yearsExperience: {
        label: "Years experience",
        options: ["0–1", "1–3", "3–5", "5+"],
      },
      endorsements: {
        label: "Endorsements",
        help: "Select all that apply.",
        options: [
          { value: "T", label: "T — Double/Triple" },
          { value: "N", label: "N — Tank" },
          { value: "H", label: "H — Hazmat" },
          { value: "X", label: "X — Tank + Hazmat" },
        ],
      },
      availabilityDate: { label: "Available to start", placeholder: "" },
      shiftPref: {
        label: "Shift preference",
        options: ["Day", "Night", "Team"],
      },
      terminalPref: {
        label: "Home terminal preference",
        options: ["Hagerstown", "Raleigh", "Either"],
      },
      resumeUrl: {
        label: "Resume link (optional)",
        placeholder: "https://drive.google.com/…",
      },
      notes: {
        label: "Notes (optional)",
        placeholder: "Anything else we should know?",
      },
      consent: {
        label: "I consent to be contacted about employment by phone, SMS, and email.",
      },

      hidden: ["utm_source", "utm_medium", "utm_campaign", "source", "ip_hash", "user_agent", "website_honeypot"],
    },

    validation: {
      required: "This field is required.",
      email: "Enter a valid email.",
      phone: "Enter a valid mobile number.",
      url: "Enter a valid URL.",
      consent: "Consent is required to proceed.",
    },
  },

  portal: {
    starterBadge: "Owner portal starter",
    hiringListTitle: "Applicants",
    filtersLabel: "Filters",
    stages: ["APPLIED", "CONTACTED", "CALL_SCHEDULED", "RIDE_ALONG", "HIRED", "REJECTED"],
    actions: {
      call: "Call",
      text: "Text",
      email: "Email",
      moveStage: "Move stage",
      exportCsv: "Export CSV",
      openThread: "Open OpenPhone Thread",
    },
  },

  privacy: {
    title: "Privacy",
    intro:
      "We collect only the information needed to evaluate your application and to contact you about employment opportunities at Eagle Family Carriers.",
    sections: [
      {
        heading: "Data we collect",
        body:
          "Application details (contact info, location, CDL class, experience, endorsements), optional resume link, and technical data (IP hash, user agent, referral source).",
      },
      {
        heading: "How we use it",
        body: "To review your candidacy, schedule interviews, and comply with safety and hiring requirements. We do not sell applicant data.",
      },
      {
        heading: "Retention",
        body: "Applicant records are retained for up to 24 months unless you request deletion sooner.",
      },
      {
        heading: "Contact",
        body: "For questions or data requests, email hiring@eaglefamilycarriers.com.",
      },
    ],
  },

  footer: {
    brandSmall: "Eagle Family Carriers",
    links: ["Privacy"],
    copyright: `© ${new Date().getFullYear()} Eagle Family Carriers. All rights reserved.`,
  },

  sections: {
    story: {
      ribbon: "25 YEARS ON THE ROAD",
      heading: "Family-run and built to last",
      body:
        "Eagle Family Carriers started in 1999 with one truck and a promise to treat drivers like partners. We still operate that way: steady freight, reliable miles, and leadership that rides along to stay close to the work.",
      stats: [
        { label: "Years in operation", value: "25+" },
        { label: "Average driver tenure", value: "8.4 yrs" },
        { label: "Active team drivers", value: "145" },
        { label: "Safety performance", value: "CSA top 10%" },
      ],
    },

    bonuses: {
      heading: "Bonuses that reward precision",
      intro: "We pay for professionalism. Your discipline around safety, fuel, and on-time execution shows up in every check.",
      cards: [
        {
          title: "Safety + performance",
          points: [
            "Quarterly safety and fuel bonuses up to $3,000.",
            "On-time streak rewards with no cap.",
            "Clean DOT inspections paid the same week.",
          ],
        },
        {
          title: "Referral + loyalty",
          points: [
            "Tiered referral bonuses for every elite driver you bring in.",
            "Anniversary payouts every 12 months.",
            "Paid orientation and mentor stipends.",
          ],
        },
        {
          title: "Tools that keep you earning",
          points: [
            "Late-model sleepers with preventative maintenance on schedule.",
            "In-cab tech that just works — ELD, routing, tolls handled.",
            "24/7 dispatch that answers on the second ring.",
          ],
        },
      ],
    },

    schedule: {
      heading: "Schedules that respect your home life",
      body: "You choose the cadence; we protect it. Our planners and dispatchers lock in your week so you can plan real life around it.",
      bullets: [
        "Team lanes with predictable miles and protected reset windows.",
        "Home-every-weekend options or 3-on/1-off rotations for long hauls.",
        "No last-minute swaps — your dispatcher locks your plan mid-week.",
        "Access to top-load customers that keep you rolling without deadhead.",
      ],
    },

    culture: {
      heading: "Real family culture, professional standards",
      body: "We run like a tight crew: clear comms, zero drama, and everyone pulling the same direction. The best-of-the-best thrive here because we set them up to win.",
      pillars: [
        "Owner-operators on staff who coach every new hire until they’re confident.",
        "Respectful runs: no forced dispatch, no mystery routes, and honest ETAs.",
        "Support when it matters — wellness checks, hotel support, and human recruiters.",
      ],
      quote: {
        text: "The best of the best stay because we treat them like pros and family at the same time.",
        attribution: "Mara K., Director of Recruiting",
      },
    },

    apply: {
      heading: "Roll with Eagle Family Carriers",
      body:
        "Take five minutes to tell us how you like to run — routes, shifts, and career goals. Our recruiting team responds within one business day.",
      primaryCta: "Start Application",
      secondaryCta: "Talk with recruiting",
    },
  },
};
