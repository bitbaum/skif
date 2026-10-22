/**
 * The research articles in FR: one file per article, each a full Research
 * mirroring the English (same sections, anchors, sources, [n] citations).
 * translations.test.ts checks the shape.
 */
import type { Research } from "../../types";
import { PROTECTIVE_METHODS_FR } from "./protective-methods";
import { SCIENCE_OF_SAFETY_FR } from "./science-of-safety";

export const RESEARCH_FR: Readonly<Record<string, Research>> = {
  "science-of-safety": SCIENCE_OF_SAFETY_FR,
  "protective-methods": PROTECTIVE_METHODS_FR,
};
