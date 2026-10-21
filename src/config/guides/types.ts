import type { SiteSection } from "@bitbaum/sitekit";
import type { HarmFamily } from "../harm-families";
import type { PhotoKey } from "../photos";
import type { Source } from "../research/types";

/**
 * A guide: deep, actionable reading on one subject, written as sitekit
 * sections so every guide renders, numbers and validates the same way.
 *
 * Rules every guide keeps (docs/DOCTRINE.md): safety AND freedom — the aim is
 * a life lived fully, never fear; facts only where a public source states
 * them, and that source is named in the text; Skif's own judgment says so;
 * the law is described, never advised on. A guide's sections are everything
 * after its opening, which the page builds from `statement` and `lead`.
 */
export type Guide = {
  slug: string;
  title: string;
  /** The fields of safety this guide serves; the first is its home. */
  fields: readonly [HarmFamily, ...HarmFamily[]];
  /** One line for lists. */
  summary: string;
  /** The opening photograph, when one fits. */
  photo?: PhotoKey;
  statement: string;
  lead: readonly string[];
  sections: readonly Exclude<SiteSection, { kind: "hero" }>[];
  /** When the guide states figures, their sources, cited in the text as [n]
   * exactly as in a research article; `checked` is when they were read. */
  sources?: readonly Source[];
  checked?: string;
};
