/**
 * The guides in DE: one file per guide, each a full Guide with the same
 * slug, fields, photo, sources, section kinds and anchors as the English one
 * and every human sentence translated. translations.test.ts checks the shape.
 * Add a guide here AND to ./slugs.ts.
 */
import type { Guide } from "../../types";
import { ALCOHOL_AND_DRUGS_DE } from "./alcohol-and-drugs";
import { CHILDREN_DE } from "./childrens-safety";
import { COMBAT_SPORTS_DE } from "./combat-sports";
import { DEVICES_DE } from "./devices-and-accounts";
import { DRIVING_DE } from "./driving";
import { WATER_DE } from "./lakes-and-rivers";
import { BEYOND_PEOPLE_DE } from "./nature-travel-sport";
import { PARKOUR_DE } from "./parkour";
import { MONEY_DE } from "./scams-coercion-keys";
import { SELF_DEFENCE_LADDER_DE } from "./self-defence-ladder";
import { SITUATIONAL_AWARENESS_DE } from "./situational-awareness";
import { TRAVEL_DE } from "./travel";
import { WEAPONS_DE } from "./weapons";
import { PROFESSIONALS_DE } from "./what-professionals-teach";
import { WHERE_YOU_LIVE_DE } from "./where-you-live";
import { WOMEN_DE } from "./womens-safety";

export const GUIDES_DE: Readonly<Record<string, Guide>> = {
  "situational-awareness": SITUATIONAL_AWARENESS_DE,
  "self-defence-ladder": SELF_DEFENCE_LADDER_DE,
  parkour: PARKOUR_DE,
  weapons: WEAPONS_DE,
  "combat-sports": COMBAT_SPORTS_DE,
  "womens-safety": WOMEN_DE,
  "childrens-safety": CHILDREN_DE,
  "devices-and-accounts": DEVICES_DE,
  "scams-coercion-keys": MONEY_DE,
  "alcohol-and-drugs": ALCOHOL_AND_DRUGS_DE,
  driving: DRIVING_DE,
  "lakes-and-rivers": WATER_DE,
  travel: TRAVEL_DE,
  "where-you-live": WHERE_YOU_LIVE_DE,
  "nature-travel-sport": BEYOND_PEOPLE_DE,
  "what-professionals-teach": PROFESSIONALS_DE,
};
