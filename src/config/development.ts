import type { DevelopmentProfile } from "bip-kit";

/**
 * Skif's public roadmap and changelog, written for the people Skif is for.
 *
 * Why this is curated here and not read from the fleet map: the Loki profile
 * only carries run summaries written for the operator (PR numbers, internal
 * file names). A person looking for safety needs to know what they can now do,
 * in plain words — so the words live in the repo, reviewed like any change.
 *
 * Rules (checked by development.test.ts): no PR numbers, no file names, only
 * what is live. The roadmap is 3–5 honest next steps from docs/DOCTRINE.md;
 * planned work is a direction, not a promise, and carries no dates.
 */
export const PUBLIC_DEVELOPMENT: DevelopmentProfile = {
  slug: "skif",
  name: "Skif",
  what: "Holistic safety for people and the places they live, Zürich first — without trading away privacy or freedom.",
  roadmap: [
    {
      title: "Book the specialists your Safety Plan suggests",
      status: "Next",
      progress: null,
      targetDate: null,
      milestones: [
        "Your plan already says what kind of help fits: a locksmith, a privacy clean-up, an account-security check.",
        "Next: named, vetted people you can book inside Skif, each shown with what they fix and what they cost you in privacy.",
      ],
    },
    {
      title: "“Did it help?” after every step",
      status: "Next",
      progress: null,
      targetDate: null,
      milestones: [
        "A short follow-up on each step you took, so your next plan is built on what worked for you.",
      ],
    },
    {
      title: "Pay for a booking inside Skif",
      status: "Planned",
      progress: null,
      targetDate: null,
      milestones: ["Today Operations settle each booking with you directly."],
    },
    {
      title: "The Skif Academy for Protectors",
      status: "Planned",
      progress: null,
      targetDate: null,
      milestones: [
        "Training and certification in judgment, de-escalation, first aid and trauma-aware care — the things that make someone good to have beside you.",
      ],
    },
    {
      title: "Homes, buildings and neighbourhoods",
      status: "Later",
      progress: null,
      targetDate: null,
      milestones: ["Assessments a whole building, workplace or neighbourhood association can share, with the same limits on data."],
    },
  ],
  changelog: [
    {
      date: "2026-10-21",
      done: "Six new guides, each number tied to its source: situational awareness, alcohol and drugs (Zürich's free drug checking, the signs of alcohol poisoning, what to do and not do), driving (what causes serious crashes in Switzerland, the alcohol limits), lakes and rivers (the twelve SLRG rules), travel, and reading crime numbers for where you live. Three new checklists: a party or festival, a long drive, a swim. Guides can be filtered by field, and a page for businesses and venues says what Skif does for a place. The Protectors page now says plainly what a Protector is not.",
    },
    {
      date: "2026-10-21",
      done: "You can create a Skif account straight from Skif, with your email, Google or GitHub, and land back where you were going. The menu now opens into panels listing every page with a line on each, and on a phone it is one full-screen map. A new page, What Skif keeps, lists every record Skif stores about you and what it never collects.",
    },
    {
      date: "2026-10-21",
      done: "The site has two halves now. Act: checklists for one situation each (lock down your phone, a night out, a protest past your shop, travel, a family plan, a possible scam, right after an incident) that you tick off as you go, plus booking and the full Safety Plan. Library: the ten fields with every step that helps shown as a card with its cost to your privacy and freedom, the guides, and two research articles with every number tied to its source. The Academy shows one area at a time, the Protectors page explains how a booking works, and sign-in says how you can sign in or create an account.",
    },
    {
      date: "2026-10-21",
      done: "Nine practical guides: the self-defence ladder (escape first, the parkour way of seeing a street), weapons and what Swiss law allows, combat sports judged on the street, women's and children's safety, locking down your devices and disks, scams and Bitcoin keys, nature, travel and sport, and what professionals teach the public. The Academy now covers weapons, escape and movement, striking and grappling arts. Skif has a mark: a Scythian stag.",
    },
    {
      date: "2026-10-21",
      done: "A new public site. Each of the ten fields of safety has its own page: what can go wrong, every step that helps and what each one costs you in money, privacy and freedom. A quick check on the home page shows your free first steps without signing in. The Method page explains how Skif decides, the Academy lists what Protectors learn, and Join is for Protectors, schools and specialists.",
    },
    {
      date: "2026-10-20",
      done: "If you run a shop or work near a protest that may turn into unrest, your Safety Plan now covers it: follow the police route, close early, clear the window, agree with your neighbours who calls 117, check your insurance, protect the glass — and, if you want people with you while you close, book Protectors who keep you safe and never confront a crowd.",
    },
    {
      date: "2026-09-25",
      done: "The home page now opens three doors: book a calm person to be with you, start an assessment of your whole life, or get help for a venue or event.",
    },
    {
      date: "2026-09-25",
      done: "An assessment now covers the whole of a life, not only the front door: accounts and devices, privacy, your good name, family, money, health emergencies, and what to do when things go wrong. You choose which parts matter to you.",
    },
    {
      date: "2026-09-24",
      done: "Your Safety Plan shows what each step costs you — in money, privacy, freedom and convenience — next to what it achieves. When what you have is enough, it says you don't need to buy anything.",
    },
    {
      date: "2026-09-24",
      done: "If something went wrong with a booking, you can raise a complaint in confidence. The Protector can answer, you can appeal, and a person decides — never a formula.",
    },
    {
      date: "2026-09-24",
      done: "After a booking you rate how respected you felt, how discreet it was and how safe you felt, each on its own — not stars.",
    },
    {
      date: "2026-09-24",
      done: "Protectors are matched on what they can actually do — de-escalation, first aid, languages — with certificates that are checked and expire. Every match comes with its reasons.",
    },
    {
      date: "2026-09-24",
      done: "We corrected the home page: your data is stored on a server we run ourselves in Germany, not in Switzerland as it first said.",
    },
    {
      date: "2026-09-24",
      done: "Skif opens in Zürich. Sign in with OrangeCat, set the limits you won't trade — no facial recognition, no cameras inside, no cloud video, no automatic police sharing — and book a Protector for a night out or the way home.",
    },
  ],
};

/** Where the roadmap comes from, for readers who want the reasoning. */
export const DEVELOPMENT_PRINCIPLES_URL = "https://github.com/bitbaum/skif/blob/main/docs/DOCTRINE.md";

/** Page copy passed to bip-kit's renderer. */
export const DEVELOPMENT_LABELS = {
  home: "Back to Skif",
  profile: "The principles behind it",
  source: "Written by the people building Skif. Planned work is a direction, not a delivery promise.",
} as const;
