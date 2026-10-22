import { describe, expect, it } from "vitest";
import { RESEARCH } from "@/config/research";
import { RESEARCH_TRANSLATIONS } from "@/config/research/translations";
import { expectSameShape } from "@/test/same-shape";
import { ENGLISH_PAGES, PAGE_TRANSLATIONS, type PageName } from "./pages";

/** Structure, not prose: identical in every language. */
const SAME = new Set(["kind", "anchor", "href", "path", "slug", "fields", "photo", "sources", "checked", "icon", "value"]);

describe("translated pages and articles", () => {
  for (const [locale, pages] of Object.entries(PAGE_TRANSLATIONS)) {
    it(`${locale}: every content page is translated and mirrors the English one`, () => {
      expect(Object.keys(pages).sort()).toEqual(Object.keys(ENGLISH_PAGES).sort());
      for (const [name, page] of Object.entries(pages)) expectSameShape(ENGLISH_PAGES[name as PageName](), page, `${locale}/${name}`, SAME);
    });
  }

  for (const [locale, articles] of Object.entries(RESEARCH_TRANSLATIONS)) {
    it(`${locale}: every research article is translated and mirrors the English one`, () => {
      expect(Object.keys(articles).sort()).toEqual(RESEARCH.map((r) => r.slug).sort());
      for (const [slug, tr] of Object.entries(articles)) expectSameShape(RESEARCH.find((r) => r.slug === slug), tr, `${locale}/${slug}`, SAME);
    });
  }
});
