/**
 * The research articles in IT: one file per article, each a full Research
 * mirroring the English (same sections, anchors, sources, [n] citations).
 * translations.test.ts checks the shape.
 */
import type { Research } from "../../types";
import { PROTECTIVE_METHODS_IT } from "./protective-methods";
import { SCIENCE_OF_SAFETY_IT } from "./science-of-safety";

export const RESEARCH_IT: Readonly<Record<string, Research>> = {
  "science-of-safety": SCIENCE_OF_SAFETY_IT,
  "protective-methods": PROTECTIVE_METHODS_IT,
};
