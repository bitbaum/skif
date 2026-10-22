import { existsSync } from "node:fs";
import { join } from "node:path";
import { validateSite, type SitePage } from "@bitbaum/sitekit";
import { describe, expect, it } from "vitest";
import { ACADEMY_AREAS, COURSES, coursesIn } from "@/config/academy";
import { postBySlug } from "./blog";
import { CHECKLISTS } from "@/config/checklists";
import { guideBySlug, GUIDES } from "@/config/guides";
import { GUIDE_TRANSLATIONS } from "@/config/guides/translations";
import type { Locale } from "@/i18n/locales";
import { SELF_DEFENCE_LADDER } from "@/config/guides/self-defence-ladder";
import { familyBySlug, HARM_FAMILIES } from "@/config/harm-families";
import { PHOTOS } from "@/config/photos";
import { RESEARCH } from "@/config/research";
import { ACT, CREATE_ACCOUNT, FOOTER, HOME, LIBRARY, MENU, PATHS, PEOPLE_TEASER, QUICK_CHECK, SIGN_IN } from "@/config/site";
import { fieldConcerns, fieldSteps } from "./fields";
import { guidePage } from "./guides";
import { joinPage } from "./join";
import { methodPage } from "./method";
import { businessPage } from "./business";
import { privacyPage } from "./privacy";
import { protectorsPage } from "./protectors";
import { citations, researchPage } from "./research";
import { SHARE_CARDS, shareCard } from "./share";

const APP = join(__dirname, "..", "app");
const PUBLIC = join(__dirname, "..", "..", "public");

/** True when an in-site link reaches a page that exists. */
function pageExists(href: string): boolean {
  const [route, query = ""] = href.split("#")[0].split("?");
  const from = new URLSearchParams(query).get("from");
  if (from && !pageExists(from)) return false;
  const path = route.replace(/^\/+|\/+$/g, "");
  if (path === "") return existsSync(join(APP, "[locale]", "(public)", "page.tsx"));
  const [first, second] = path.split("/");
  if (second && first === "safety") return Boolean(familyBySlug(second));
  if (second && first === "guides") return GUIDES.some((g) => g.slug === second);
  if (second && first === "research") return RESEARCH.some((r) => r.slug === second);
  if (second && first === "act") return CHECKLISTS.some((c) => c.slug === second);
  if (second && first === "blog") return Boolean(postBySlug(second));
  return [join("[locale]", "(public)"), "(app)"].some((group) => existsSync(join(APP, group, path, "page.tsx")));
}

const CONTENT_PAGES: SitePage[] = [methodPage(), joinPage(), protectorsPage(), privacyPage(), businessPage(), ...GUIDES.map((g) => guidePage(g)),
  ...Object.entries(GUIDE_TRANSLATIONS).flatMap(([locale, byslug]) => Object.values(byslug).map((g) => guidePage(g, locale as Locale))), ...RESEARCH.map(researchPage)];

function heroLinks(page: SitePage): string[] {
  return page.sections.flatMap((s) => (s.kind === "hero" ? (s.actions ?? []).map((a) => a.href) : []));
}

describe("public site", () => {
  it("validates every content page against sitekit's schema", () => {
    const result = validateSite({
      chrome: { name: "Skif", tagline: "Safety and freedom, from every side.", footerNote: "Beta" },
      pages: CONTENT_PAGES,
    });
    expect(result.success ? [] : result.errors).toEqual([]);
  });

  it("links only to pages that exist", () => {
    const hrefs = [
      ...MENU.flatMap((m) => [m.href, m.featured.href, ...m.links.map((l) => l.href)]),
      SIGN_IN.href,
      CREATE_ACCOUNT.href,
      ...HOME.actions.map((a) => a.href),
      QUICK_CHECK.cta.href,
      ...PATHS.map((p) => p.href),
      ...ACT.help.items.map((h) => h.href),
      ...PEOPLE_TEASER.actions.map((a) => a.href),
      LIBRARY.method.href,
      ...FOOTER.more.links.map((l) => l.href),
      ...CONTENT_PAGES.flatMap(heroLinks),
    ].filter((h) => h.startsWith("/"));
    for (const href of hrefs) expect(pageExists(href), href).toBe(true);
  });

  it("gives every field something to read and steps least intrusive first", () => {
    expect(new Set(HARM_FAMILIES.map((f) => f.slug)).size).toBe(HARM_FAMILIES.length);
    for (const f of HARM_FAMILIES) {
      expect(fieldConcerns(f).length, f.key).toBeGreaterThan(0);
      const privacy = fieldSteps(f).map((i) => i.privacyImpact);
      expect(privacy.length, f.key).toBeGreaterThan(0);
      expect(privacy, f.key).toEqual([...privacy].sort((a, b) => a - b));
    }
  });

  it("has a course in every Academy area", () => {
    for (const a of ACADEMY_AREAS) expect(coursesIn(a.key).length, a.key).toBeGreaterThan(0);
  });

  it("gives every guide a unique slug and real substance", () => {
    expect(new Set(GUIDES.map((g) => g.slug)).size).toBe(GUIDES.length);
    for (const g of GUIDES) expect(g.sections.length, g.slug).toBeGreaterThanOrEqual(3);
  });

  it("names only Academy courses and areas that exist in the ladder's training table", () => {
    const table = SELF_DEFENCE_LADDER.sections.find((s) => s.kind === "table");
    const named = table && table.kind === "table" ? table.rows.map((r) => r[2]) : [];
    const known = new Set<string>([...COURSES.map((c) => c.title), ...ACADEMY_AREAS.map((a) => a.title), "Striking and grappling arts"]);
    for (const n of named) expect(known.has(n), n).toBe(true);
  });

  it("points checklists at guides that exist", () => {
    expect(new Set(CHECKLISTS.map((c) => c.slug)).size).toBe(CHECKLISTS.length);
    for (const c of CHECKLISTS) if ("guide" in c) expect(guideBySlug(c.guide), c.slug).toBeDefined();
  });

  it("cites every source in a research article, and cites nothing that is missing", () => {
    for (const r of RESEARCH) {
      const cited = citations(r);
      expect(cited, r.slug).toEqual(r.sources.map((_, i) => i + 1));
    }
  });

  it("cites every source in a guide that has them, and gives no figures without them", () => {
    for (const g of GUIDES) {
      const cited = citations(g);
      expect(cited, g.slug).toEqual((g.sources ?? []).map((_, i) => i + 1));
      if (g.sources) expect(g.checked, g.slug).toBeTruthy();
    }
  });

  it("gives every shared link a picture of a page that exists, and every menu page one", () => {
    expect(new Set(SHARE_CARDS.map((c) => c.path)).size).toBe(SHARE_CARDS.length);
    for (const c of SHARE_CARDS) expect(pageExists(c.path), c.path).toBe(true);
    for (const href of MENU.flatMap((m) => [m.href, ...m.links.map((l) => l.href)])) {
      const path = href.split(/[?#]/)[0];
      if (path.startsWith("/") && !path.startsWith("/signin") && !path.startsWith("/assessments") && !path.startsWith("/bookings")) {
        expect(shareCard(path), path).toBeDefined();
      }
    }
  });

  it("has a file for every photograph, credited", () => {
    for (const [key, p] of Object.entries(PHOTOS)) {
      expect(existsSync(join(PUBLIC, p.src)), key).toBe(true);
      expect(p.credit.page.startsWith("https://unsplash.com/"), key).toBe(true);
    }
  });
});
