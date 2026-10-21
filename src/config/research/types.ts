import type { SiteSection } from "@bitbaum/sitekit";
import type { HarmFamily } from "../harm-families";
import type { PhotoKey } from "../photos";

/** A source a research article cites. Text cites it as [n], n being its
 * position in `sources` counted from 1 (src/site/site.test.ts checks every
 * [n] has a source and every source is cited). */
export type Source = {
  title: string;
  publisher: string;
  year: number;
  url: string;
};

/**
 * A research article: longer reading for the Library, every factual claim
 * numbered to a source the author read. Only claims confirmed in the source
 * are used; where a widely repeated claim could not be confirmed, the article
 * says so instead of repeating it.
 */
export type Research = {
  slug: string;
  title: string;
  fields: readonly [HarmFamily, ...HarmFamily[]];
  summary: string;
  photo?: PhotoKey;
  statement: string;
  lead: readonly string[];
  sections: readonly Exclude<SiteSection, { kind: "hero" }>[];
  sources: readonly Source[];
  /** When the sources were read. */
  checked: string;
};
