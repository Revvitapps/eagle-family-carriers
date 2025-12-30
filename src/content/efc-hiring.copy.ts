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
      primary: "Learn more",
      secondary: "Privacy",
    },
    links: [
      { label: "Positions", href: "#positions" },
      { label: "Role", href: "#role" },
      { label: "Story", href: "#story" },
      { label: "Bonuses", href: "#bonuses" },
      { label: "Schedules", href: "#schedule" },
      { label: "Routes", href: "#routes" },
      { label: "Apply", href: "#apply" },
    ],
  },

  hero: {
    kicker: "EAGLE FAMILY CARRIERS",
    title: "CDL Class A Truck Driver — Home-Every-Weekend Option",
    subtitle: "Driver-first details: pay, routes, home time, and qualifications. Apply in minutes and hear back within a day.",
    primaryCta: "Learn more",
    secondaryCta: "Privacy",
  },

  features: [
    {
      icon: "file",
      title: "Home every weekend",
      body: "Reliable home time options with protected reset windows.",
    },
    {
      icon: "bolt",
      title: "Steady miles",
      body: "Regional and long-haul freight with minimal deadhead.",
    },
    {
      icon: "globe",
      title: "24/7 dispatch",
      body: "Second-ring support for reroutes, weather, or customer updates.",
    },
    {
      icon: "layout",
      title: "Hiring and referral bonuses",
      body: "Safety, fuel, on-time, hiring, and referral bonuses — plus clean DOT payouts.",
    },
  ],

  included: {
    heading: "What you get",
    bullets: [
      "Competitive mileage or load-based pay aligned to your route mix",
      "Quarterly safety, fuel, and on-time bonuses",
      "Late-model sleepers with preventative maintenance on schedule",
      "Health, dental, vision, life insurance",
      "Home-every-weekend options; predictable weekly schedules",
      "Clean DOT inspections paid the same week",
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
        help: "Select all endorsements you currently hold. T = Doubles/Triples (FedEx Ground), H = Hazmat, X = Tank + Hazmat. Leave blank if none.",
        options: [
          { value: "T", label: "T — Doubles/Triples (FedEx Ground)" },
          { value: "H", label: "H — Hazmat" },
          { value: "X", label: "X — Tank + Hazmat" },
        ],
      },
      coDriverName: { label: "Co-driver full name (team only)", placeholder: "Optional unless applying as a team" },
      coDriverPhone: { label: "Co-driver phone", placeholder: "(555) 555-5555" },
      coDriverEmail: { label: "Co-driver email", placeholder: "teammate@example.com" },
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
    positions: [
      {
        slug: "solo-run",
        isTeam: false,
        title: "Solo Driver — Full-Time Class A CDL",
        payRange: "$1,500–$1,700 weekly",
        summary: "Solo routes with steady miles, protected weekend resets, and paid safety/on-time bonuses.",
        bullets: [
          "Hagerstown-based regional and long-haul loops",
          "Home daily with 5-day work week",
          "Home every weekend or weekly, depending on lane",
          "Mileage or load-based pay plus safety/fuel bonuses",
        ],
      },
      {
        slug: "start-asap",
        isTeam: true,
        title: "Teams Driver — Full-Time Class A CDL",
        payRange: "$1,500–$2,300 weekly",
        summary: "Team lanes for long and regional hauls offering higher earning potential and quick onboarding for qualified partners.",
        bullets: [
          "Team lanes for long and regional hauls offering higher earning potential and quick onboarding for qualified partners.",
          "Weekly home time with predictable resets",
          "Mileage or load-based pay plus clean DOT payouts and team bonuses",
        ],
      },
    ],

    role: {
      heading: "Truck Driver (CDL Class A)",
      summary:
        "Reliable CDL Class A driver to haul regional and long-haul freight with steady miles, predictable home time, and a dispatch team that answers on the second ring.",
      location: {
        heading: "Location",
        bullets: [
          "Company driver positions based in Hagerstown, MD.",
          "Hiring formed teams or team members for long-haul and regional opportunities, and solo drivers for local regional runs.",
        ],
      },
      employment: {
        heading: "Employment type & schedule",
        bullets: [
          "Full-time company driver.",
          "Home time: home every weekend or weekly, depending on route.",
          "Mileage- or load-based pay with safety, performance, and fuel bonuses.",
        ],
      },
      compensation: {
        heading: "Compensation & bonus overview",
        bullets: [
          "Competitive mileage or load-based pay aligned to route mix.",
          "Quarterly safety, fuel, and on-time bonuses.",
          "Clean QVI inspections paid the same week.",
        ],
      },
      responsibilities: {
        heading: "What you’ll do",
        bullets: [
          "Operate a tractor-trailer safely and efficiently to deliver freight on time.",
          "Conduct pre-trip and post-trip inspections for safety and compliance.",
          "Communicate with dispatch and customers about ETAs, routes, and any issues.",
          "Follow traffic laws and maintain all required endorsements for assigned loads.",
        ],
      },
      qualifications: {
        heading: "Qualifications (must-haves)",
        bullets: [
          "2 years’ verifiable Class A tractor-trailer experience in the past 3 years.",
          "Clean motor vehicle record; must be 21+.",
          "Able to pass background check and drug screen.",
          "No felonies/violent or drug-related misdemeanors in the last 10 years.",
          "Doubles/Triples endorsement (training available if new to pulling doubles).",
        ],
      },
      benefits: {
        heading: "Benefits & perks",
        bullets: ["Health Insurance", "Dental Insurance", "Vision Insurance", "Life Insurance"],
      },
      applySteps: {
        heading: "How to apply",
        bullets: [
          "Click “Start Application” to complete the short form (about 5 minutes).",
          "Confirm you meet the required qualifications above before starting.",
          "We review within 24 hours and contact qualified drivers for a quick interview.",
          "Prefer to talk first? Email support@eaglefamilycarriers.com.",
        ],
      },
    },

    story: {
      ribbon: "55+ YEARS EXPERIENCE ON THE ROAD",
      heading: "Family-run and built to last",
      body:
        "Eagle Family Carriers companies started in 2019 with two trucks and a promise to treat drivers like partners. We still operate that way: steady freight, reliable miles, and leadership that rides along to stay close to the work.",
      stats: [
        { label: "Years experience in leadership", value: "55+" },
        { label: "Average driver tenure", value: "8.4 yrs" },
        { label: "Active team drivers", value: "22" },
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
            "Quarterly safety and fuel bonuses.",
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
        "Home daily or weekly based upon route.",
        "No last-minute swaps — your dispatcher locks your plan mid-week.",
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
        text: "We ride along, stay close to the work, and make sure every driver feels backed by leadership.",
        attribution: "Paul E., Owner",
      },
    },

    apply: {
      heading: "Roll with Eagle Family Carriers",
      body:
        "Tell us how you like to run — routes, shifts, and career goals. We respond within one business day to line up the right lane.",
      primaryCta: "I meet these — Start application",
      secondaryCta: "Talk with recruiting",
    },

    routes: {
      heading: "Routes & lanes",
      body: "Primary freight runs out of Hagerstown with regional loops and select long-haul lanes. See the running map and typical resets.",
      bullets: [
        "Regional solo loops: Mid-Atlantic with weekend resets.",
        "Long haul team: Southeast, Midwest, and Southwest with weekly resets.",
        "Routes confirmed weekly.",
      ],
      ctaLabel: "View running lanes map",
      ctaHref: "https://www.google.com/maps/place/Hagerstown,+MD",
    },
  },
};
