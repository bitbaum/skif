import { existsSync } from "node:fs";
import { join } from "node:path";
import { validateSite, type SitePage } from "@bitbaum/sitekit";
import { describe, expect, it } from "vitest";
import { ACADEMY_AREAS, COURSES, coursesIn } from "@/config/academy";
import { GUIDES } from "@/config/guides";
import { SELF_DEFENCE_LADDER } from "@/config/guides/self-defence-ladder";
import { familyBySlug, HARM_FAMILIES } from "@/config/harm-families";
import { DOORS, FOOTER, HOME, METHOD_TEASER, NAV, PEOPLE_TEASER, QUICK_CHECK, SIGN_IN } from "@/config/site";
import { academyPage } from "./academy";
import { fieldConcerns, fieldPage, fieldSteps } from "./fields";
import { guidePage } from "./guides";
import { joinPage } from "./join";
import { methodPage } from "./method";

const APP = join(__dirname, "..", "app");

/** True when an in-site link reaches a page that exists. */
function pageExists(href: string): boolean {
  const path = href.split("#")[0].replace(/^\/+|\/+$/g, "");
  if (path === "") return existsSync(join(APP, "(public)", "page.tsx"));
  const [first, second] = path.split("/");
  if (first === "safety" && second) return Boolean(familyBySlug(second));
  if (first === "guides" && second) return GUIDES.some((g) => g.slug === second);
  return ["(public)", "(app)"].some((group) => existsSync(join(APP, group, path, "page.tsx")));
}

const CONTENT_PAGES: SitePage[] = [
  methodPage(),
  academyPage(),
  joinPage(),
  ...HARM_FAMILIES.map(fieldPage),
  ...GUIDES.map(guidePage),
];

function hrefsOf(page: SitePage): string[] {
  return page.sections.flatMap((s) => (s.kind === "hero" ? (s.actions ?? []).map((a) => a.href) : []));
}

describe("public site", () => {
  it("validates every content page against sitekit's schema", () => {
    const result = validateSite({
      chrome: { name: "Skif", tagline: "Safety, studied from every side.", footerNote: "Beta" },
      pages: CONTENT_PAGES,
    });
    expect(result.success ? [] : result.errors).toEqual([]);
  });

  it("links only to pages that exist", () => {
    const hrefs = [
      ...NAV.map((n) => n.href),
      SIGN_IN.href,
      ...HOME.actions.map((a) => a.href),
      QUICK_CHECK.cta.href,
      METHOD_TEASER.cta.href,
      ...PEOPLE_TEASER.actions.map((a) => a.href),
      ...DOORS.map((d) => d.cta.href),
      ...FOOTER.columns.flatMap((c) => c.links.map((l) => l.href)),
      ...CONTENT_PAGES.flatMap(hrefsOf),
    ].filter((h) => h.startsWith("/"));
    for (const href of hrefs) expect(pageExists(href), href).toBe(true);
  });

  it("points the home page's in-page actions at sections that exist", () => {
    for (const a of HOME.actions.filter((x) => x.href.startsWith("#"))) expect(a.href).toBe("#check");
  });

  it("gives every field a page with something to read: concerns and steps", () => {
    expect(new Set(HARM_FAMILIES.map((f) => f.slug)).size).toBe(HARM_FAMILIES.length);
    for (const f of HARM_FAMILIES) {
      expect(fieldConcerns(f).length, f.key).toBeGreaterThan(0);
      expect(fieldSteps(f).length, f.key).toBeGreaterThan(0);
    }
  });

  it("lists field steps least intrusive first, as a plan would", () => {
    for (const f of HARM_FAMILIES) {
      const privacy = fieldSteps(f).map((i) => i.privacyImpact);
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
});
