/**
 * Copy for the public landing page (src/app/page.tsx). Words live here, not in
 * JSX, so the page can be re-read against docs/DOCTRINE.md in one place.
 *
 * Rules this copy keeps (DOCTRINE.md): the first question is "what matters to
 * you" — never fear; "you don't need to buy anything" is a first-class answer;
 * three doors from day one; the whole life, not only the front door. No
 * statistics, testimonials, prices or claims we cannot show. The stage is
 * stated honestly: Beta.
 *
 * The families of harm are NOT listed here — they render from
 * src/config/harm-families.ts.
 */

export const STAGE = "Beta";

/** An illustration from public/art. Self-made SVG scenes: calm people and
 * ordinary places, never cameras, locks or muscle (DOCTRINE.md). */
export type Art = { src: `/art/${string}.svg`; alt: string; width: number; height: number };

export const HERO = {
  eyebrow: "Holistic safety · Zürich",
  title: "Safety that makes room for your life.",
  lede: "Skif looks at the whole of it — you, the people you love, your home, your accounts, your privacy and your good name — and suggests the most proportionate step. Sometimes that is a calm person beside you. Often it is a small change. Sometimes it is nothing at all.",
  question: "What matters to you, and what are you worried about?",
  questionNote: "That is where every conversation with Skif starts.",
  art: {
    src: "/art/walk-home.svg",
    alt: "Two people walk home along the Limmat at dusk, past a street lamp, the Grossmünster towers behind them.",
    width: 800,
    height: 600,
  } satisfies Art,
} as const;

export type Door = {
  key: string;
  title: string;
  body: string;
  art: Art;
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
};

/** DOCTRINE.md "Entry points": three doors from day one. */
export const DOORS: readonly Door[] = [
  {
    key: "WITH_ME",
    art: { src: "/art/tram-stop.svg", alt: "A Protector sits beside someone at a night tram stop, both at ease, waiting for the 4.", width: 480, height: 320 },
    title: "I need someone with me",
    body: "A calm, qualified Protector for a night out, the way home or a difficult occasion — chosen for judgment and de-escalation, not size. When we match someone to you, we show why.",
    cta: { href: "/bookings/new", label: "Book a Protector" },
  },
  {
    key: "CONCERNED",
    art: { src: "/art/kitchen-table.svg", alt: "Someone at their kitchen table in morning light, ticking off a short list, a cup of tea beside them.", width: 480, height: 320 },
    title: "I'm concerned about my safety",
    body: "Tell us what matters to you and what worries you. You get a Safety Plan across every part of life below, with the trade-offs of each step — and an honest “nothing needed” where that is the answer.",
    cta: { href: "/assessments", label: "Start an assessment" },
  },
  {
    key: "VENUE",
    art: { src: "/art/venue-door.svg", alt: "Outside a bar’s warm doorway, a member of staff offers a guest a glass of water and listens.", width: 480, height: 320 },
    title: "I run a venue or event",
    body: "For bars, clubs, shops and one-off occasions: an assessment of the place, and staff who defuse rather than confront.",
    cta: { href: "/assessments", label: "Assess your venue" },
    secondary: { href: "/bookings/new", label: "Request venue staff" },
  },
];

export const DOORS_SECTION = {
  title: "Where would you like to start?",
  note: "Each door asks you to sign in with OrangeCat first. Skif keeps no separate account.",
} as const;

export const WHOLE_LIFE = {
  eyebrow: "A whole life",
  title: "Not only the front door.",
  lede: "A threat model that stops at locks and bodyguards leaves most of a life out. Skif's assessment covers each of these — you choose which ones matter to you.",
} as const;

/** DOCTRINE.md "The loop": ASSESS → IMPROVE → PROTECT → LEARN. */
export const APPROACH = {
  eyebrow: "How it works",
  title: "Proportionate, step by step.",
  steps: [
    {
      title: "Assess",
      body: "What matters to you, what could harm it, and how exposed it really is — a map you can read, not a score.",
    },
    {
      title: "Improve",
      body: "Steps ranked by what they achieve and what they cost you in money, privacy, freedom and convenience.",
    },
    {
      title: "Protect",
      body: "A Protector only where a person is the proportionate answer, matched on capabilities, with the match explained.",
    },
    {
      title: "Learn",
      body: "What worked, how it felt, what was observed — so the next recommendation is better than the last.",
    },
  ],
  nothingToBuy: {
    title: "“You don't need to buy anything.”",
    body: "When your current measures are enough, that is what we tell you. It is a complete answer, and it is what makes every other answer worth trusting.",
  },
} as const;

export const PRINCIPLES = {
  eyebrow: "What we hold to",
  title: "Calm, not intimidating.",
  items: [
    {
      title: "Your limits first",
      body: "Say what you value and what you won't accept — no facial recognition, no cameras inside, no cloud video, no automatic police sharing. Those are hard limits, never traded away.",
    },
    {
      title: "The most proportionate answer",
      body: "Every recommendation is the least intrusive thing that works, with its trade-offs shown. Often the honest answer is: you don't need to buy anything.",
    },
    {
      title: "Calm people, not bouncers",
      body: "Protectors are chosen for judgment and calm, not size. When we match someone to you, we show why.",
    },
    {
      title: "Only what the job needs",
      body: "A Protector sees where to meet you once they've accepted, never who you are beyond that. Your data stays in our own database, on a server we run ourselves in Germany (rented from Hetzner, Falkenstein) — never with a camera or alarm vendor.",
    },
  ],
} as const;

export const PROTECTOR_INVITE = {
  title: "Good judgment, a steady presence?",
  body: "Skif Protectors are chosen for judgment, de-escalation and care — someone people want beside them, never a bull at the door.",
  cta: { href: "/protector", label: "Become a Protector" },
} as const;

export const HEADER_LINKS = [{ href: "/protector", label: "Become a Protector" }] as const;

export const SIGN_IN = { href: "/signin", label: "Sign in" } as const;

/** Keep this list flat: other pages (roadmap, changelog) append to it. */
export const FOOTER_LINKS = [
  { href: "/signin", label: "Sign in" },
  { href: "/protector", label: "Become a Protector" },
] as const;

export const FOOTER = {
  tagline: "Holistic safety for people and the places they live — without trading away privacy or freedom.",
  place: "Zürich",
} as const;
