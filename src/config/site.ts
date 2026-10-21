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

/**
 * The site map: the header's panels, the phone menu and the footer all read
 * it, and every internal link in them comes from here (fleet navigation
 * contract, rule 6). `covers` lists the first path segments each section owns,
 * so a field page or a guide marks "Library" as current.
 */
export const MENU = [
  {
    key: "ACT",
    label: "Act",
    href: "/act",
    covers: ["act"],
    blurb: "Do something today: a checklist for your situation, a quick check, a full plan or a Protector.",
    links: [
      { href: "/act", label: "Checklists", note: "One situation each, done in one sitting." },
      { href: "/act#check", label: "Quick check", note: "Two questions, your free first steps." },
      { href: signInTo("/assessments"), label: "Safety assessment", note: "A full plan, weighed against your limits." },
      { href: signInTo("/bookings/new"), label: "Book a Protector", note: "Someone calm beside you." },
    ],
    featured: { href: "/act/protest-near-my-shop", label: "A protest is coming past my shop", photo: "zurichTram" },
  },
  {
    key: "LIBRARY",
    label: "Library",
    href: "/library",
    covers: ["library", "safety", "guides", "research", "method"],
    blurb: "Understand safety from every side: ten fields, guides, research with sources, and how Skif decides.",
    links: [
      { href: "/library", label: "The ten fields", note: "What can go wrong, and every step that helps." },
      { href: "/guides", label: "Guides", note: "Deep reading that ends in steps you can take." },
      { href: "/research/science-of-safety", label: "The science of safety", note: "What works, measured, with every source." },
      { href: "/research/protective-methods", label: "What professionals publish", note: "Threat assessment, Run Hide Tell, and more." },
      { href: "/method", label: "How Skif decides", note: "Proportion, costs, limits, matching." },
    ],
    featured: { href: "/guides/self-defence-ladder", label: "Escape first: the self-defence ladder", photo: "parkour" },
  },
  {
    key: "ACADEMY",
    label: "Academy",
    href: "/academy",
    covers: ["academy"],
    blurb: "What Protectors learn, open to anyone: first aid to Jiu-Jitsu, weapons and the law to digital security.",
    links: [
      { href: "/academy", label: "All courses", note: "Nine areas, one at a time." },
      { href: "/join", label: "Teach with Skif", note: "Schools, gyms, ranges and trainers." },
    ],
    featured: { href: "/academy", label: "Learn what Protectors learn", photo: "grappling" },
  },
  {
    key: "PROTECTORS",
    label: "Protectors",
    href: "/protectors",
    covers: ["protectors", "join"],
    blurb: "Vetted, calm professionals, matched on judgment and explained.",
    links: [
      { href: "/protectors", label: "How it works", note: "What people book, and how a booking runs." },
      { href: signInTo("/bookings/new"), label: "Book a Protector", note: "Ask for what you need." },
      { href: "/business", label: "For businesses and venues", note: "Shops, bars, clubs, offices, events." },
      { href: "/join", label: "Become a Protector", note: "Judgment, calm, care." },
    ],
    featured: { href: "/protectors", label: "Someone calm beside you", photo: "doorway" },
  },
] as const;

/** Pages behind sign-in. A link to one goes through the account screen
 * with its destination, so a person who signs up lands where they meant to
 * go (and someone already signed in passes straight through). */
export function signInTo(path: string, mode: "create" | "sign-in" = "create"): string {
  const q = new URLSearchParams({ ...(mode === "create" ? { mode: "create" } : {}), from: path });
  return `/signin?${q.toString()}`;
}

export const SIGN_IN = { href: "/signin", label: "Sign in" } as const;
export const CREATE_ACCOUNT = { href: "/signin?mode=create", label: "Create account" } as const;

/** The account screen's words. Accounts are OrangeCat accounts (fleet identity
 * contract); the screen says so once, in the fine print, and never makes it a
 * step the person has to understand. */
export const ACCOUNT = {
  create: {
    title: "Create your Skif account",
    lede: "Free, and it takes a minute. Then save Safety Plans, set your limits and preferences, and book a Protector.",
    submit: "Create account",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign in",
  },
  signIn: {
    title: "Sign in to Skif",
    lede: "Welcome back.",
    submit: "Continue",
    switchPrompt: "New to Skif?",
    switchLabel: "Create an account",
  },
  providers: { google: "With Google", github: "With GitHub" },
  fineprint:
    "Skif accounts run on OrangeCat, the account service shared by the products built here: one account, and Skif itself stores no password and no email address, only an anonymous id.",
  notConfigured: "Accounts are not switched on in this copy of Skif.",
} as const;

/** Where Skif is served. Shared links and preview pictures are absolute
 * against it (src/app/layout.tsx metadataBase). */
export const PUBLIC_ORIGIN = "https://skif.orangecat.ch";

export const ACADEMY_HERO = {
  statement: "Learn what Protectors learn.",
  lead: "From first aid and de-escalation to parkour, Muay Thai, Jiu-Jitsu, weapons and the law, and keeping your accounts and money safe. Open to anyone who wants to be more capable and freer for it.",
} as const;

export const HOME = {
  eyebrow: `Skif · ${PLACE} · ${STAGE}`,
  statement: "Safety and freedom, from every side.",
  lead: [
    "Your body, your accounts, your privacy, your name, your family, your money, the places you go. Skif maps what could harm what matters to you, then helps you take the most proportionate step, counting what it would cost your freedom.",
  ],
  actions: [
    { href: "/act", label: "Act now" },
    { href: "/library", label: "Understand safety" },
  ],
} as const;

export const QUICK_CHECK = {
  eyebrow: "Quick check",
  title: "Two questions. Your first steps.",
  lede: "The same engine as a full assessment, running in your browser. Nothing you tick leaves this page.",
  placeQuestion: "What is this about?",
  concernQuestion: "What worries you?",
  concernsShown: 8,
  empty: "Tick what worries you, and the free steps appear here.",
  stepsTitle: "Start with these. They cost nothing.",
  more: (n: number) =>
    `${n} more ${n === 1 ? "option costs" : "options cost"} money or ${n === 1 ? "needs" : "need"} someone. A full assessment weighs them against your limits and your budget.`,
  cta: { href: signInTo("/assessments"), label: "Get your full Safety Plan" },
  ctaNote: "Free. Create an account or sign in, in under a minute.",
} as const;

/** The two halves of the site. */
export const PATHS = [
  {
    key: "ACT",
    eyebrow: "Act",
    title: "Do something today.",
    body: "Checklists for one situation each, a quick check, a full Safety Plan, or a Protector beside you. Minutes, not reading.",
    photo: "zurichTram",
    href: "/act",
    label: "Open Act",
  },
  {
    key: "LIBRARY",
    eyebrow: "Library",
    title: "Understand it properly.",
    body: "Ten fields of safety, deep guides, the research behind them and how Skif decides. For when you want to know why.",
    photo: "books",
    href: "/library",
    label: "Open the Library",
  },
] as const;

export const FIELDS_SECTION = {
  eyebrow: "Ten fields",
  title: "Not only the front door.",
  lede: "A threat model that stops at locks and bodyguards leaves most of a life out. Each field is a page: what can go wrong, and every step that helps, with what it costs you.",
} as const;

export const FREEDOM = {
  eyebrow: "Safety and freedom",
  title: "Safer should never mean smaller.",
  body: "Surveillance, restriction and constant fear can make someone technically safer and their life worse. Skif counts that cost on every step: what it asks of your privacy, your freedom and your time. The goal is a life you can live fully, with risk you chose, knowing its size.",
} as const;

export const ACT = {
  eyebrow: "Act",
  statement: "Do something today.",
  lead: [
    "Pick the situation you are in. Each checklist takes one sitting and links to the guide behind it, if you want the why.",
  ],
  help: {
    title: "Get help",
    items: [
      { key: "WITH_ME", title: "Someone with me", body: "A calm, vetted Protector for a night out, the way home, a difficult day or a shop on a hard evening.", href: signInTo("/bookings/new"), label: "Book a Protector" },
      { key: "ASSESS", title: "A plan for my life", body: "An assessment across every field you choose, with what each step achieves and costs, and \u201cnothing needed\u201d where that is true.", href: signInTo("/assessments"), label: "Start an assessment" },
      { key: "PLACE", title: "A place I run", body: "Shops, bars, clubs, offices and events: guests, staff, the street outside and the day a protest comes past.", href: signInTo("/assessments"), label: "Assess a place" },
    ],
  },
  checklistsTitle: "Checklists",
  checkTitle: "Not sure where to start?",
} as const;

export const LIBRARY = {
  eyebrow: "Library",
  statement: "Understand safety, from every side.",
  lead: [
    "Ten fields of safety, guides you can act on, the research behind them, and the rules Skif decides by. Read in any order.",
  ],
  fieldsTitle: "The ten fields",
  guidesTitle: "Guides",
  researchTitle: "Research",
  researchLede: "Longer reading with every source named: what the science says, and what protective professionals publish about their methods.",
  method: { title: "How Skif decides", body: "The most proportionate step, what every step costs, the limits you set, and how a Protector is chosen.", href: "/method" },
} as const;

export const PEOPLE_TEASER = {
  eyebrow: "Protectors and the Academy",
  title: "Judgment before muscle.",
  body: "A Skif Protector is someone you want beside you: calm, observant, trained in de-escalation and first aid. The Academy is where that is learned, and it is open to anyone: first aid, parkour, Muay Thai, Jiu-Jitsu, weapons and the law, and keeping your accounts safe.",
  actions: [
    { href: "/protectors", label: "About Protectors" },
    { href: "/academy", label: "The Academy" },
  ],
} as const;

/** The footer repeats the site map (MENU) and adds the pages that belong to
 * no section. */
export const FOOTER = {
  tagline: "Safety and freedom, from every side.",
  more: {
    title: "Skif",
    links: [
      { href: "/privacy", label: "What Skif keeps" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/changelog", label: "Changelog" },
      { href: "/credits", label: "Photo credits" },
    ],
  },
  stage: "Beta — running, not released",
} as const;

/** DOCTRINE.md "The loop", shown on the Method page. */
export const LOOP = [
  { title: "Assess", body: "What matters, what could harm it, how exposed it really is. A map you can read, not a score." },
  { title: "Improve", body: "Steps ranked by what they achieve and what they cost in money, privacy, freedom and convenience." },
  { title: "Protect", body: "A person only where a person is the proportionate answer, matched on capabilities." },
  { title: "Learn", body: "What worked and how it felt, so the next recommendation is better than the last." },
] as const;
