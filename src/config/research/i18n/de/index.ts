/**
 * The research articles in DE: one file per article, each a full Research
 * mirroring the English (same sections, anchors, sources, [n] citations).
 * translations.test.ts checks the shape.
 */
import type { Research } from "../../types";
import { PROTECTIVE_METHODS_DE } from "./protective-methods";
import { SCIENCE_OF_SAFETY_DE } from "./science-of-safety";

export const RESEARCH_DE: Readonly<Record<string, Research>> = {
  "science-of-safety": SCIENCE_OF_SAFETY_DE,
  "protective-methods": PROTECTIVE_METHODS_DE,
};
