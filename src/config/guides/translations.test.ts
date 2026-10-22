import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GUIDES } from ".";
import { SLUGS_DE } from "./i18n/de/slugs";
import { SLUGS_FR } from "./i18n/fr/slugs";
import { SLUGS_IT } from "./i18n/it/slugs";
import { GUIDES_SLUGS } from "./slug-list";
import { GUIDE_TRANSLATIONS } from "./translations";

/** Keys whose value is structure, not prose: identical in every language. */
const SAME = new Set(["kind", "anchor", "slug", "fields", "photo", "sources", "checked", "href", "columns_count"]);

const citations = (s: string) => [...s.matchAll(/\[(\d+)\]/g)].map((m) => m[1]).sort().join(",");

/** Walk the English and translated guide together: same shape everywhere,
 * structure identical, and every [n] citation kept in the same string. */
function sameShape(en: unknown, tr: unknown, path: string, key = ""): void {
  if (SAME.has(key)) {
    expect(tr, path).toEqual(en);
    return;
  }
  if (typeof en === "string") {
    expect(typeof tr, path).toBe("string");
    expect((tr as string).trim().length, path).toBeGreaterThan(0);
    expect(citations(tr as string), `${path} citations`).toBe(citations(en));
    return;
  }
  if (Array.isArray(en)) {
    expect(Array.isArray(tr), path).toBe(true);
    expect((tr as unknown[]).length, path).toBe(en.length);
    en.forEach((v, i) => sameShape(v, (tr as unknown[])[i], `${path}[${i}]`, key));
    return;
  }
  if (en && typeof en === "object") {
    expect(tr && typeof tr === "object", path).toBe(true);
    expect(Object.keys(tr as object).sort(), path).toEqual(Object.keys(en).sort());
    for (const [k, v] of Object.entries(en)) sameShape(v, (tr as Record<string, unknown>)[k], `${path}.${k}`, k);
    return;
  }
  expect(tr, path).toEqual(en);
}

describe("guide translations", () => {
  const slugs = { de: SLUGS_DE, fr: SLUGS_FR, it: SLUGS_IT };

  for (const [locale, byslug] of Object.entries(GUIDE_TRANSLATIONS) as [keyof typeof slugs, Record<string, unknown>][]) {
    it(`${locale}: mirror the English guides exactly, and list themselves in slugs.ts`, () => {
      expect([...slugs[locale]].sort()).toEqual(Object.keys(byslug).sort());
      for (const [slug, tr] of Object.entries(byslug)) {
        const en = GUIDES.find((g) => g.slug === slug);
        expect(en, `${locale}/${slug} has no English guide`).toBeDefined();
        sameShape(en, tr, `${locale}/${slug}`);
      }
    });
  }

  it("keeps the client's slug list in step with the guides", () => {
    expect([...GUIDES_SLUGS]).toEqual(GUIDES.map((g) => g.slug));
  });

  it("writes German the Swiss way: no ß in any German guide", () => {
    for (const slug of SLUGS_DE) expect(readFileSync(join(__dirname, "i18n", "de", `${slug}.ts`), "utf8"), slug).not.toContain("ß");
  });
});
