import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { expectSameShape } from "@/test/same-shape";
import { GUIDES } from ".";
import { SLUGS_DE } from "./i18n/de/slugs";
import { SLUGS_FR } from "./i18n/fr/slugs";
import { SLUGS_IT } from "./i18n/it/slugs";
import { GUIDES_SLUGS } from "./slug-list";
import { GUIDE_TRANSLATIONS } from "./translations";

/** Keys whose value is structure, not prose: identical in every language. */
const SAME = new Set(["kind", "anchor", "slug", "fields", "photo", "sources", "checked", "href"]);

describe("guide translations", () => {
  const slugs = { de: SLUGS_DE, fr: SLUGS_FR, it: SLUGS_IT };

  for (const [locale, byslug] of Object.entries(GUIDE_TRANSLATIONS) as [keyof typeof slugs, Record<string, unknown>][]) {
    it(`${locale}: mirror the English guides exactly, and list themselves in slugs.ts`, () => {
      expect([...slugs[locale]].sort()).toEqual(Object.keys(byslug).sort());
      for (const [slug, tr] of Object.entries(byslug)) {
        const en = GUIDES.find((g) => g.slug === slug);
        expect(en, `${locale}/${slug} has no English guide`).toBeDefined();
        expectSameShape(en, tr, `${locale}/${slug}`, SAME);
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
