/**
 * SSOT for Skif's guides: the order here is the order on /guides. Each
 * guide names the fields of safety it serves, and each field's page lists
 * its guides.
 */
import type { HarmFamily } from "../harm-families";
import { BEYOND_PEOPLE } from "./beyond-people";
import { COMBAT_SPORTS } from "./combat-sports";
import { DEVICES } from "./devices";
import { MONEY } from "./money";
import { PROFESSIONALS } from "./professionals";
import { SELF_DEFENCE_LADDER } from "./self-defence-ladder";
import type { Guide } from "./types";
import { WEAPONS } from "./weapons";
import { CHILDREN, WOMEN } from "./women-and-children";

export type { Guide } from "./types";

export const GUIDES: readonly Guide[] = [
  SELF_DEFENCE_LADDER,
  WEAPONS,
  COMBAT_SPORTS,
  WOMEN,
  CHILDREN,
  DEVICES,
  MONEY,
  BEYOND_PEOPLE,
  PROFESSIONALS,
];

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesFor(field: HarmFamily): Guide[] {
  return GUIDES.filter((g) => g.fields.includes(field));
}
