/**
 * SSOT for Skif's guides: the order here is the order on /guides. Each
 * guide names the fields of safety it serves, and each field's page lists
 * its guides.
 */
import type { HarmFamily } from "../harm-families";
import { ALCOHOL_AND_DRUGS } from "./alcohol-and-drugs";
import { BEYOND_PEOPLE } from "./beyond-people";
import { COMBAT_SPORTS } from "./combat-sports";
import { DEVICES } from "./devices";
import { DRIVING } from "./driving";
import { MONEY } from "./money";
import { PROFESSIONALS } from "./professionals";
import { SELF_DEFENCE_LADDER } from "./self-defence-ladder";
import { SITUATIONAL_AWARENESS } from "./situational-awareness";
import { TRAVEL } from "./travel";
import type { Guide } from "./types";
import { WATER } from "./water";
import { WEAPONS } from "./weapons";
import { WHERE_YOU_LIVE } from "./where-you-live";
import { CHILDREN, WOMEN } from "./women-and-children";

export type { Guide } from "./types";

export const GUIDES: readonly Guide[] = [
  SITUATIONAL_AWARENESS,
  SELF_DEFENCE_LADDER,
  WEAPONS,
  COMBAT_SPORTS,
  WOMEN,
  CHILDREN,
  DEVICES,
  MONEY,
  ALCOHOL_AND_DRUGS,
  DRIVING,
  WATER,
  TRAVEL,
  WHERE_YOU_LIVE,
  BEYOND_PEOPLE,
  PROFESSIONALS,
];

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesFor(field: HarmFamily): Guide[] {
  return GUIDES.filter((g) => g.fields.includes(field));
}
