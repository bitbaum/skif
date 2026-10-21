/**
 * Words and structure of Skif's public site. Words live here, not in JSX, so
 * the whole site can be re-read against docs/DOCTRINE.md in one place.
 *
 * Rules this copy keeps: the first question is "what matters to you", never
 * fear; "you don't need to buy anything" is a complete answer; no statistics,
 * testimonials, prices, partners or claims we cannot show. Nothing is "live"
 * (fleet rule): the stage is Beta.
 *
 * The ten fields of safety render from src/config/harm-families.ts, courses
 * from src/config/academy.ts, scales and limits from the assessment config —
 * never retyped here.
 */

export const STAGE = "Beta";
export const PLACE = "Zürich";

/** Fleet contact (bitbaum: public name Cato). Partnerships come here until
 * Skif has an address of its own. */
export const CONTACT_EMAIL = "cato@orangecat.ch";

export function partnerMailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Skif — ${subject}`)}`;
}

export const NAV = [
  { href: "/safety", label: "Safety" },
  { href: "/method", label: "Method" },
  { href: "/academy", label: "Academy" },
  { href: "/join", label: "Join" },
] as const;

export const SIGN_IN = { href: "/signin", label: "Sign in" } as const;

export const HOME = {
  eyebrow: `Skif · ${PLACE} · ${STAGE}`,
  statement: "Safety, studied from every side.",
  lead: "Physical safety is one field of ten. Skif maps what could harm what matters to you — your body, your accounts, your privacy, your name, your family, your money — and recommends the most proportionate step. Often it is something you can do yourself, today, for nothing.",
  actions: [
    { href: "#check", label: "Run a quick check" },
    { href: "/bookings/new", label: "Book a Protector" },
  ],
  mapCaption: "The ten fields of safety. Each one opens.",
} as const;

export const QUICK_CHECK = {
  eyebrow: "Quick check",
  title: "Two questions. Your first steps.",
  lede: "This runs the same engine as a full assessment, here in your browser. Nothing you tick leaves this page.",
  placeQuestion: "What is this about?",
  concernQuestion: "What worries you?",
  concernsShown: 8,
  empty: "Tick what worries you, and the free steps appear here.",
  stepsTitle: "Start with these. They cost nothing.",
  more: (n: number) =>
    `${n} more ${n === 1 ? "option costs" : "options cost"} money or ${n === 1 ? "needs" : "need"} someone. A full assessment weighs them against your limits and your budget.`,
  cta: { href: "/assessments", label: "Get your full Safety Plan" },
  ctaNote: "Sign in with OrangeCat. Skif keeps no separate account.",
} as const;

export const FIELDS_SECTION = {
  eyebrow: "Ten fields",
  title: "Not only the front door.",
  lede: "A threat model that stops at locks and bodyguards leaves most of a life out. Each field below is a page: what can go wrong, what helps, and what each step costs you.",
  all: { href: "/safety", label: "All ten fields" },
} as const;

/** DOCTRINE.md "Entry points": three doors from day one. */
export const DOORS = [
  {
    key: "WITH_ME",
    index: "A",
    title: "Someone with me",
    body: "A calm, vetted Protector for a night out, the way home or a difficult day. Chosen for judgment and de-escalation, not size, and the match is explained.",
    cta: { href: "/bookings/new", label: "Book a Protector" },
  },
  {
    key: "ASSESS",
    index: "B",
    title: "A plan for my life",
    body: "An assessment across every field you choose. Each step shows what it achieves and what it costs, and where nothing is needed, the plan says so.",
    cta: { href: "/assessments", label: "Start an assessment" },
  },
  {
    key: "PLACE",
    index: "C",
    title: "A place I run",
    body: "Shops, bars, clubs, offices and events: guests, staff, the street outside and the day a protest comes past. Staff who defuse rather than confront.",
    cta: { href: "/assessments", label: "Assess a place" },
  },
] as const;

export const DOORS_SECTION = { eyebrow: "Three ways in", title: "Where would you like to start?" } as const;

/** DOCTRINE.md "The loop". */
export const LOOP = [
  { title: "Assess", body: "What matters, what could harm it, how exposed it really is. A map you can read, not a score." },
  { title: "Improve", body: "Steps ranked by what they achieve and what they cost in money, privacy, freedom and convenience." },
  { title: "Protect", body: "A person only where a person is the proportionate answer, matched on capabilities." },
  { title: "Learn", body: "What worked and how it felt, so the next recommendation is better than the last." },
] as const;

export const METHOD_TEASER = {
  eyebrow: "Method",
  title: "Proportionate, step by step.",
  quote: "You don't need to buy anything.",
  quoteNote: "When your current measures are enough, that is the answer. It is what makes every other answer worth trusting.",
  cta: { href: "/method", label: "How Skif decides" },
} as const;

export const PEOPLE_TEASER = {
  eyebrow: "Protectors and the Academy",
  title: "Judgment before muscle.",
  body: "A Skif Protector is someone you want beside you: calm, observant, trained in de-escalation and first aid. The Academy is where that is learned, and it is open to anyone: from first aid and de-escalation to Jiu-Jitsu, driving and keeping your accounts safe.",
  actions: [
    { href: "/academy", label: "The Academy" },
    { href: "/join", label: "Work with Skif" },
  ],
} as const;

export const FOOTER = {
  tagline: "Safety from every side, without trading away privacy or freedom.",
  columns: [
    { title: "Learn", links: [...NAV.slice(0, 3)] },
    {
      title: "Use Skif",
      links: [
        { href: "/assessments", label: "Safety assessment" },
        { href: "/bookings/new", label: "Book a Protector" },
        { href: "/join", label: "Work with Skif" },
      ],
    },
    {
      title: "In the open",
      links: [
        { href: "/roadmap", label: "Roadmap" },
        { href: "/changelog", label: "Changelog" },
      ],
    },
  ],
  stage: "Beta — running, not released",
} as const;
