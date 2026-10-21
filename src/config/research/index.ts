/** SSOT for the Library's research articles, in reading order. */
import { PROTECTIVE_METHODS } from "./protective-methods";
import { SCIENCE_OF_SAFETY } from "./science-of-safety";
import type { Research } from "./types";

export type { Research, Source } from "./types";

export const RESEARCH: readonly Research[] = [SCIENCE_OF_SAFETY, PROTECTIVE_METHODS];

export function researchBySlug(slug: string): Research | undefined {
  return RESEARCH.find((r) => r.slug === slug);
}
