/**
 * SSOT for what a person can be worried about (SPEC §12), each in one harm
 * family (docs/DOCTRINE.md) and limited to the kinds of place it makes sense
 * for. The interventions that answer them live in ./interventions.
 */
import type { EnvironmentType } from "./environments";
import type { HarmFamily } from "./harm-families";

export const EVERYWHERE: readonly EnvironmentType[] = ["PERSON", "HOME", "VENUE", "WORKPLACE", "VEHICLE", "JOURNEY", "EVENT"];
/** Concerns about a life rather than a place; a business can have them too. */
const LIFE: readonly EnvironmentType[] = ["PERSON"];
const LIFE_AND_WORK: readonly EnvironmentType[] = ["PERSON", "WORKPLACE", "VENUE"];

type ConcernDef = {
  key: string;
  label: string;
  family: HarmFamily;
  environments: readonly EnvironmentType[];
  derived: boolean;
};

/** `derived` concerns are never ticked; the assessment adds them itself
 * (an upcoming occasion the person mentioned). */
export const CONCERNS = [
  {
    key: "BURGLARY",
    family: "PHYSICAL",
    label: "A break-in while nobody is there",
    environments: ["HOME", "WORKPLACE", "VENUE"],
    derived: false,
  },
  {
    key: "UNWANTED_VISITORS",
    family: "PHYSICAL",
    label: "Unwanted people at the door",
    environments: ["HOME", "WORKPLACE", "VENUE"],
    derived: false,
  },
  {
    key: "ARRIVING_AT_NIGHT",
    family: "PHYSICAL",
    label: "Feeling unsafe arriving at night",
    environments: ["PERSON", "HOME", "JOURNEY", "VEHICLE"],
    derived: false,
  },
  {
    key: "BEING_FOUND",
    family: "PRIVACY",
    label: "Someone finding out where I live or am",
    environments: ["PERSON", "HOME", "WORKPLACE", "JOURNEY", "EVENT"],
    derived: false,
  },
  {
    key: "FOLLOWED",
    family: "PHYSICAL",
    label: "Being followed or harassed on the way",
    environments: ["PERSON", "JOURNEY", "EVENT", "VEHICLE"],
    derived: false,
  },
  {
    key: "ONLINE_EXPOSURE",
    family: "PRIVACY",
    label: "My details or holdings being findable online",
    environments: EVERYWHERE,
    derived: false,
  },
  {
    key: "GUEST_CONFLICT",
    family: "PHYSICAL",
    label: "Aggression or conflict among guests",
    environments: ["VENUE", "EVENT"],
    derived: false,
  },
  {
    key: "ACCOUNT_TAKEOVER",
    label: "Someone getting into my email, phone number or accounts",
    family: "CYBER",
    environments: LIFE_AND_WORK,
    derived: false,
  },
  {
    key: "DEVICE_COMPROMISE",
    label: "A phone or laptop of mine being hacked or spied on",
    family: "CYBER",
    environments: LIFE_AND_WORK,
    derived: false,
  },
  {
    key: "CRYPTO_KEYS",
    label: "Losing my crypto keys, or having them stolen",
    family: "CYBER",
    environments: LIFE,
    derived: false,
  },
  {
    key: "LOCATION_TRACKING",
    label: "Being tracked through my phone, car or a hidden tracker",
    family: "PRIVACY",
    environments: ["PERSON", "VEHICLE", "JOURNEY"],
    derived: false,
  },
  {
    key: "IMPERSONATION",
    label: "Someone pretending to be me, or fake material about me",
    family: "REPUTATIONAL",
    environments: LIFE_AND_WORK,
    derived: false,
  },
  {
    key: "REPUTATION_ATTACK",
    label: "A pile-on or campaign against my name",
    family: "REPUTATIONAL",
    environments: LIFE_AND_WORK,
    derived: false,
  },
  {
    key: "CHILDREN_SAFETY",
    label: "My children's safety, online or on the way",
    family: "FAMILY",
    environments: ["PERSON", "HOME"],
    derived: false,
  },
  {
    key: "RELATIVE_TARGETED",
    label: "An older or vulnerable relative being targeted",
    family: "FAMILY",
    environments: LIFE,
    derived: false,
  },
  {
    key: "MEDICAL_EMERGENCY",
    label: "A medical emergency with nobody knowing what to do",
    family: "HEALTH",
    environments: EVERYWHERE,
    derived: false,
  },
  {
    key: "FRAUD",
    label: "Fraud or a scam costing me money",
    family: "FINANCIAL",
    environments: LIFE_AND_WORK,
    derived: false,
  },
  {
    key: "COERCION",
    label: "Being pressured or forced to hand over money or keys",
    family: "FINANCIAL",
    environments: ["PERSON", "HOME"],
    derived: false,
  },
  {
    key: "HAZARD",
    label: "Fire, gas, water or another hazard",
    family: "ENVIRONMENTAL",
    environments: ["HOME", "WORKPLACE", "VENUE", "EVENT"],
    derived: false,
  },
  {
    key: "UNFAMILIAR_AREA",
    label: "Not knowing the area — where help is, what to avoid",
    family: "ENVIRONMENTAL",
    environments: ["PERSON", "HOME", "JOURNEY", "EVENT"],
    derived: false,
  },
  {
    key: "INSTITUTION_DATA",
    label: "A company, employer or authority holding or sharing data about me",
    family: "INSTITUTIONAL",
    environments: LIFE,
    derived: false,
  },
  {
    key: "KNOWING_MY_RIGHTS",
    label: "Not knowing my rights when dealing with police, authorities or an employer",
    family: "INSTITUTIONAL",
    environments: LIFE_AND_WORK,
    derived: false,
  },
  {
    key: "LOCKED_OUT",
    label: "Losing my phone or accounts with no way back in",
    family: "RESILIENCE",
    environments: LIFE_AND_WORK,
    derived: false,
  },
  {
    key: "NO_PLAN",
    label: "Nobody knowing what to do if something happens to me",
    family: "RESILIENCE",
    environments: EVERYWHERE,
    derived: false,
  },
  { key: "UPCOMING_EVENT", label: "An upcoming occasion", family: "ENVIRONMENTAL", environments: EVERYWHERE, derived: true },
] as const satisfies readonly ConcernDef[];

export type ConcernKey = (typeof CONCERNS)[number]["key"];
export const CONCERN_KEYS = CONCERNS.map((c) => c.key) as [ConcernKey, ...ConcernKey[]];

/** The concerns a person can tick for this kind of place. */
export function concernsFor(env: EnvironmentType): ConcernDef[] {
  return (CONCERNS as readonly ConcernDef[]).filter((c) => !c.derived && c.environments.includes(env));
}

export function concernFamily(key: string): HarmFamily | undefined {
  return (CONCERNS as readonly ConcernDef[]).find((c) => c.key === key)?.family;
}

export function concernApplies(key: string, env: EnvironmentType): boolean {
  return (CONCERNS as readonly ConcernDef[]).find((c) => c.key === key)?.environments.includes(env) ?? false;
}

export function concernLabel(key: string): string {
  return (CONCERNS as readonly ConcernDef[]).find((c) => c.key === key)?.label ?? key;
}
