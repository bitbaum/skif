/**
 * Structure of Skif's public site: links, keys and photographs, once. The
 * words come from src/config/text in the reader's language: `siteText(locale)`
 * puts the two together, and the English bundle is also exported by name for
 * code that is not translated (tests, share pictures).
 *
 * The ten fields of safety render from src/config/harm-families.ts, courses
 * from src/config/academy.ts, scales and limits from the assessment config —
 * never retyped here.
 */

import type { Locale } from "@/i18n/locales";
import { wordsFor } from "./text";

export const PLACE = "Zürich";

/** Fleet contact (bitbaum: public name Cato). Partnerships come here until
 * Skif has an address of its own. */
export const CONTACT_EMAIL = "cato@orangecat.ch";

export function partnerMailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Skif — ${subject}`)}`;
}

/** Pages behind sign-in. A link to one goes through the account screen
 * with its destination, so a person who signs up lands where they meant to
 * go (and someone already signed in passes straight through). */
export function signInTo(path: string, mode: "create" | "sign-in" = "create"): string {
  const q = new URLSearchParams({ ...(mode === "create" ? { mode: "create" } : {}), from: path });
  return `/signin?${q.toString()}`;
}

/** Where Skif is served. Shared links and preview pictures are absolute
 * against it (metadataBase). */
export const PUBLIC_ORIGIN = "https://skif.orangecat.ch";

export function siteText(locale: Locale) {
  const w = wordsFor(locale);
  const m = w.menu;

  /** /emergency: the one page someone may open in a hurry, so it says the
   * least and leads with the numbers. */
  const EMERGENCY_PAGE = { href: "/emergency", ...w.emergency } as const;

  /**
   * The site map: the header's panels, the phone menu and the footer all read
   * it, and every internal link in them comes from here (fleet navigation
   * contract, rule 6). `covers` lists the first path segments each section
   * owns, so a field page or a guide marks "Library" as current.
   */
  const MENU = [
    {
      key: "ACT",
      label: m.act.label,
      href: "/act",
      covers: ["act", "emergency"],
      blurb: m.act.blurb,
      links: [
        { href: EMERGENCY_PAGE.href, ...m.act.emergency },
        { href: "/act", ...m.act.checklists },
        { href: "/act#check", ...m.act.quickCheck },
        { href: signInTo("/assessments"), ...m.act.assessment },
        { href: signInTo("/bookings/new"), ...m.act.book },
      ],
      featured: { href: "/act/protest-near-my-shop", label: m.act.featured, photo: "zurichTram" },
    },
    {
      key: "LIBRARY",
      label: m.library.label,
      href: "/library",
      covers: ["library", "safety", "guides", "research", "method"],
      blurb: m.library.blurb,
      links: [
        { href: "/library", ...m.library.fields },
        { href: "/guides", ...m.library.guides },
        { href: "/research/science-of-safety", ...m.library.science },
        { href: "/research/protective-methods", ...m.library.methods },
        { href: "/method", ...m.library.method },
      ],
      featured: { href: "/guides/self-defence-ladder", label: m.library.featured, photo: "parkour" },
    },
    {
      key: "ACADEMY",
      label: m.academy.label,
      href: "/academy",
      covers: ["academy"],
      blurb: m.academy.blurb,
      links: [
        { href: "/academy", ...m.academy.courses },
        { href: "/join", ...m.academy.teach },
      ],
      featured: { href: "/academy", label: m.academy.featured, photo: "grappling" },
    },
    {
      key: "PROTECTORS",
      label: m.protectors.label,
      href: "/protectors",
      covers: ["protectors", "join", "business"],
      blurb: m.protectors.blurb,
      links: [
        { href: "/protectors", ...m.protectors.how },
        { href: signInTo("/bookings/new"), ...m.protectors.book },
        { href: "/business", ...m.protectors.business },
        { href: "/join", ...m.protectors.join },
      ],
      featured: { href: "/protectors", label: m.protectors.featured, photo: "doorway" },
    },
  ] as const;

  return {
    STAGE: w.stage,
    EMERGENCY_PAGE,
    MENU,
    HEADER: w.header,
    SIGN_IN: { href: "/signin", label: w.header.signIn },
    CREATE_ACCOUNT: { href: "/signin?mode=create", label: w.header.createAccount },
    /** The signed-in part of Skif: where "My Skif" lands, and its sections,
     * in the order a person needs them. Short labels so the row fits a phone. */
    MY_SKIF: {
      href: "/assessments",
      label: w.mySkif.label,
      nav: w.mySkif.nav,
      sections: [
        { href: "/assessments", label: w.mySkif.plan },
        { href: "/bookings", label: w.mySkif.bookings },
        { href: "/cases", label: w.mySkif.cases },
        { href: "/preferences", label: w.mySkif.preferences },
        { href: "/training", label: w.mySkif.training },
      ],
      protector: { href: "/protector", label: w.mySkif.protector, jobs: w.mySkif.jobs },
      ops: { href: "/ops", label: w.mySkif.ops },
    },
    /** The account screen's words. Accounts are OrangeCat accounts (fleet
     * identity contract); the screen says so once, in the fine print. */
    ACCOUNT: w.account,
    ACADEMY_HERO: w.academyHero,
    HOME: {
      eyebrow: `Skif · ${PLACE} · ${w.stage}`,
      statement: w.home.statement,
      lead: [w.home.lead],
      actions: [
        { href: "/act", label: w.home.act },
        { href: "/library", label: w.home.understand },
      ],
      business: w.home.business,
      pathsLabel: w.home.pathsLabel,
      checklistsTitle: w.home.checklistsTitle,
      allChecklists: w.home.allChecklists,
    },
    QUICK_CHECK: {
      ...w.quickCheck,
      concernsShown: 8,
      cta: { href: signInTo("/assessments"), label: w.quickCheck.cta },
    },
    /** The two halves of the site. */
    PATHS: [
      { key: "ACT", ...w.paths.act, photo: "zurichTram", href: "/act" },
      { key: "LIBRARY", ...w.paths.library, photo: "books", href: "/library" },
    ] as const,
    FIELDS_SECTION: w.fieldsSection,
    FREEDOM: w.freedom,
    ACT: {
      eyebrow: m.act.label,
      statement: w.act.statement,
      lead: [w.act.lead],
      help: {
        title: w.act.helpTitle,
        items: [
          { key: "WITH_ME", ...w.act.withMe, href: signInTo("/bookings/new") },
          { key: "ASSESS", ...w.act.assess, href: signInTo("/assessments") },
          { key: "PLACE", ...w.act.place, href: signInTo("/assessments") },
        ],
      },
      checklistsTitle: w.act.checklistsTitle,
      checkTitle: w.act.checkTitle,
    },
    LIBRARY: {
      eyebrow: m.library.label,
      statement: w.library.statement,
      lead: [w.library.lead],
      fieldsTitle: w.library.fieldsTitle,
      guidesTitle: w.library.guidesTitle,
      researchTitle: w.library.researchTitle,
      researchLede: w.library.researchLede,
      method: { title: w.library.methodTitle, body: w.library.methodBody, href: "/method", read: w.library.readMethod },
      sources: w.library.sources,
    },
    PEOPLE_TEASER: {
      ...w.peopleTeaser,
      actions: [
        { href: "/protectors", label: w.peopleTeaser.protectors },
        { href: "/academy", label: w.peopleTeaser.academy },
      ],
    },
    /** The footer repeats the site map (MENU) and adds the pages that belong
     * to no section. */
    FOOTER: {
      ...w.footer,
      tagline: w.tagline,
      more: {
        title: w.footer.more,
        links: [
          { href: "/privacy", label: w.footer.privacy },
          { href: "/blog", label: w.footer.blog },
          { href: "/roadmap", label: w.footer.roadmap },
          { href: "/changelog", label: w.footer.changelog },
          { href: "/credits", label: w.footer.credits },
        ],
      },
      stage: w.stageLine,
    },
    BLOG: w.blog,
    NOT_TRANSLATED: w.notTranslated,
  };
}

export type SiteText = ReturnType<typeof siteText>;

/** English, for code that is not translated: tests, share pictures, the
 * signed-in pages' own words. */
export const {
  STAGE,
  EMERGENCY_PAGE,
  MENU,
  SIGN_IN,
  CREATE_ACCOUNT,
  MY_SKIF,
  ACCOUNT,
  ACADEMY_HERO,
  HOME,
  QUICK_CHECK,
  PATHS,
  FIELDS_SECTION,
  FREEDOM,
  ACT,
  LIBRARY,
  PEOPLE_TEASER,
  FOOTER,
  BLOG,
} = siteText("en");

/** DOCTRINE.md "The loop", shown on the Method page. */
export const LOOP = [
  { title: "Assess", body: "What matters, what could harm it, how exposed it really is. A map you can read, not a score." },
  { title: "Improve", body: "Steps ranked by what they achieve and what they cost in money, privacy, freedom and convenience." },
  { title: "Protect", body: "A person only where a person is the proportionate answer, matched on capabilities." },
  { title: "Learn", body: "What worked and how it felt, so the next recommendation is better than the last." },
] as const;
