/**
 * The guides in FR: one file per guide, each a full Guide with the same
 * slug, fields, photo, sources, section kinds and anchors as the English one
 * and every human sentence translated. translations.test.ts checks the shape.
 * Add a guide here AND to ./slugs.ts.
 */
import type { Guide } from "../../types";

export const GUIDES_FR: Readonly<Record<string, Guide>> = {};
