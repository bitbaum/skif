/**
 * What a public page looks like when someone shares its link: the title and
 * description a chat app shows, and the picture it shows with them. One entry
 * per public page, built from the config each page already renders, so a
 * shared link always says what the page says.
 *
 * The picture is drawn by src/app/og/[...path]/route.tsx from the same entry:
 * the page's photograph, its eyebrow and headline, and the stag.
 */
import type { Metadata } from "next";
import type { SitePage } from "@bitbaum/sitekit";
import { CHECKLISTS } from "@/config/checklists";
import { GUIDES } from "@/config/guides";
import { HARM_FAMILIES } from "@/config/harm-families";
import type { PhotoKey } from "@/config/photos";
import { DEFAULT_LOCALE, LOCALE_TAGS, LOCALES, localizedPath, type Locale } from "@/i18n/locales";
import { RESEARCH } from "@/config/research";
import { ACADEMY_HERO, ACT, EMERGENCY_PAGE, HOME, LIBRARY } from "@/config/site";
import { businessPage } from "./business";
import { joinPage } from "./join";
import { methodPage } from "./method";
import { privacyPage } from "./privacy";
import { protectorsPage } from "./protectors";

export type ShareCard = {
  /** The page's path, "/" for home. */
  path: string;
  /** The page's own title, as in the browser tab. */
  title: string;
  description: string;
  /** Small line above the headline on the picture. */
  eyebrow: string;
  /** The large line on the picture. */
  headline: string;
  photo?: PhotoKey;
};

function heroStatement(page: SitePage): string {
  const hero = page.sections.find((s) => s.kind === "hero");
  return hero && hero.kind === "hero" ? hero.statement : page.title;
}

function fromSitePage(path: string, page: SitePage, description: string, photo?: PhotoKey): ShareCard {
  return { path, title: page.title, description, eyebrow: page.title, headline: heroStatement(page), photo };
}

export const SHARE_CARDS: readonly ShareCard[] = [
  { path: "/", title: "Skif", description: HOME.lead[0], eyebrow: "Skif · Zürich", headline: HOME.statement, photo: "nightStreet" },
  { path: "/emergency", title: "Emergency", description: EMERGENCY_PAGE.lead, eyebrow: "Emergency", headline: EMERGENCY_PAGE.statement },
  { path: "/act", title: "Act", description: ACT.lead[0], eyebrow: "Act", headline: ACT.statement, photo: "zurichTram" },
  { path: "/library", title: "Library", description: LIBRARY.lead[0], eyebrow: "Library", headline: LIBRARY.statement, photo: "books" },
  { path: "/academy", title: "Academy", description: ACADEMY_HERO.lead, eyebrow: "Academy", headline: ACADEMY_HERO.statement, photo: "grappling" },
  {
    path: "/guides",
    title: "Guides",
    description: "Practical guides: self-defence, weapons, combat sports, alcohol and drugs, driving, travel, devices, money, children and more.",
    eyebrow: `Library · ${GUIDES.length} guides`,
    headline: "Read deeper. Act today.",
    photo: "parkour",
  },
  fromSitePage("/protectors", protectorsPage(), "A vetted, calm professional beside you: what people book a Protector for, how a booking works, and the rules it keeps.", "doorway"),
  fromSitePage("/business", businessPage(), "Shops, bars, clubs, offices and events: an assessment of the place, staff who defuse, training, and the day a protest comes past.", "tramStop"),
  fromSitePage("/join", joinPage(), "Work with Skif as a Protector, a school or a specialist.", "parkour"),
  fromSitePage("/method", methodPage(), "The most proportionate step, what every step costs, hard limits, and how a Protector is chosen."),
  fromSitePage("/privacy", privacyPage(), "Every record Skif stores about you, who sees it, and what Skif never collects."),
  ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, title: g.title, description: g.summary, eyebrow: "Guide", headline: g.title, photo: g.photo })),
  ...RESEARCH.map((r) => ({ path: `/research/${r.slug}`, title: r.title, description: r.summary, eyebrow: `Research · ${r.sources.length} sources`, headline: r.title, photo: r.photo })),
  ...CHECKLISTS.map((c) => ({
    path: `/act/${c.slug}`,
    title: c.title,
    description: c.when,
    eyebrow: `Checklist · ${c.minutes} minutes`,
    headline: c.title,
    photo: "photo" in c ? (c.photo as PhotoKey) : undefined,
  })),
  ...HARM_FAMILIES.map((f) => ({
    path: `/safety/${f.slug}`,
    title: f.label,
    description: f.headline,
    eyebrow: `Field · ${f.label}`,
    headline: f.headline,
    photo: "photo" in f ? (f.photo as PhotoKey) : undefined,
  })),
];

export function shareCard(path: string): ShareCard | undefined {
  return SHARE_CARDS.find((c) => c.path === path);
}

/** The picture's address for a page: /og for home, /og/<path> otherwise. */
export function shareImagePath(path: string): string {
  return path === "/" ? "/og/home" : `/og${path}`;
}

/** The page's metadata, including what a chat app shows for a shared link,
 * its address in `locale` and its addresses in the other languages. */
export function shareMetadata(path: string, locale: Locale = DEFAULT_LOCALE): Metadata {
  const card = shareCard(path);
  if (!card) return {};
  const here = localizedPath(path, locale);
  const languages = Object.fromEntries([...LOCALES.map((l) => [LOCALE_TAGS[l], localizedPath(path, l)]), ["x-default", path]]);
  const image = { url: shareImagePath(path), width: 1200, height: 630, alt: card.headline };
  return {
    title: path === "/" ? { absolute: `Skif · ${HOME.statement}` } : card.title,
    description: card.description,
    alternates: { canonical: here, languages },
    openGraph: {
      type: path.startsWith("/guides/") || path.startsWith("/research/") ? "article" : "website",
      siteName: "Skif",
      url: here,
      locale: LOCALE_TAGS[locale].replace("-", "_"),
      title: path === "/" ? `Skif · ${HOME.statement}` : card.title,
      description: card.description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: card.title, description: card.description, images: [image.url] },
  };
}
