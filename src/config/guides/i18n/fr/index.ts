/**
 * The guides in FR: one file per guide, each a full Guide with the same
 * slug, fields, photo, sources, section kinds and anchors as the English one
 * and every human sentence translated. translations.test.ts checks the shape.
 * Add a guide here AND to ./slugs.ts.
 */
import type { Guide } from "../../types";
import { ALCOHOL_AND_DRUGS_FR } from "./alcohol-and-drugs";
import { CHILDREN_FR } from "./childrens-safety";
import { COMBAT_SPORTS_FR } from "./combat-sports";
import { DEVICES_FR } from "./devices-and-accounts";
import { DRIVING_FR } from "./driving";
import { WATER_FR } from "./lakes-and-rivers";
import { BEYOND_PEOPLE_FR } from "./nature-travel-sport";
import { PARKOUR_FR } from "./parkour";
import { MONEY_FR } from "./scams-coercion-keys";
import { SELF_DEFENCE_LADDER_FR } from "./self-defence-ladder";
import { SITUATIONAL_AWARENESS_FR } from "./situational-awareness";
import { TRAVEL_FR } from "./travel";
import { WEAPONS_FR } from "./weapons";
import { PROFESSIONALS_FR } from "./what-professionals-teach";
import { WHERE_YOU_LIVE_FR } from "./where-you-live";
import { WOMEN_FR } from "./womens-safety";

export const GUIDES_FR: Readonly<Record<string, Guide>> = {
  "situational-awareness": SITUATIONAL_AWARENESS_FR,
  "self-defence-ladder": SELF_DEFENCE_LADDER_FR,
  parkour: PARKOUR_FR,
  weapons: WEAPONS_FR,
  "combat-sports": COMBAT_SPORTS_FR,
  "womens-safety": WOMEN_FR,
  "childrens-safety": CHILDREN_FR,
  "devices-and-accounts": DEVICES_FR,
  "scams-coercion-keys": MONEY_FR,
  "alcohol-and-drugs": ALCOHOL_AND_DRUGS_FR,
  driving: DRIVING_FR,
  "lakes-and-rivers": WATER_FR,
  travel: TRAVEL_FR,
  "where-you-live": WHERE_YOU_LIVE_FR,
  "nature-travel-sport": BEYOND_PEOPLE_FR,
  "what-professionals-teach": PROFESSIONALS_FR,
};
