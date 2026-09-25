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
