/**
 * The guides in IT: one file per guide, each a full Guide with the same
 * slug, fields, photo, sources, section kinds and anchors as the English one
 * and every human sentence translated. translations.test.ts checks the shape.
 * Add a guide here AND to ./slugs.ts.
 */
import type { Guide } from "../../types";
import { ALCOHOL_AND_DRUGS } from "./alcohol-and-drugs";
import { BEYOND_PEOPLE } from "./beyond-people";
import { COMBAT_SPORTS } from "./combat-sports";
import { DEVICES } from "./devices";
import { DRIVING } from "./driving";
import { MONEY } from "./money";
import { PARKOUR } from "./parkour";
import { PROFESSIONALS } from "./professionals";
import { SELF_DEFENCE_LADDER } from "./self-defence-ladder";
import { SITUATIONAL_AWARENESS } from "./situational-awareness";
import { TRAVEL } from "./travel";
import { WATER } from "./water";
import { WEAPONS } from "./weapons";
import { WHERE_YOU_LIVE } from "./where-you-live";
import { CHILDREN, WOMEN } from "./women-and-children";

export const GUIDES_IT: Readonly<Record<string, Guide>> = {
  "situational-awareness": SITUATIONAL_AWARENESS,
  "self-defence-ladder": SELF_DEFENCE_LADDER,
  parkour: PARKOUR,
  weapons: WEAPONS,
  "combat-sports": COMBAT_SPORTS,
  "womens-safety": WOMEN,
  "childrens-safety": CHILDREN,
  "devices-and-accounts": DEVICES,
  "scams-coercion-keys": MONEY,
  "alcohol-and-drugs": ALCOHOL_AND_DRUGS,
  driving: DRIVING,
  "lakes-and-rivers": WATER,
  travel: TRAVEL,
  "where-you-live": WHERE_YOU_LIVE,
  "nature-travel-sport": BEYOND_PEOPLE,
  "what-professionals-teach": PROFESSIONALS,
};
