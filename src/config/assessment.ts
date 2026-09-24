/**
 * SSOT for the Safety Assessment's questions (SPEC §12): who or what is being
 * protected, what worries the person, what exposes them, any known threat,
 * what they already do, and what they are willing to spend. The interventions
 * that answer them live in ./interventions.ts.
 *
 * `environments` limits a question to the places it makes sense for.
 */
import type { EnvironmentType } from "./environments";

const EVERYWHERE: readonly EnvironmentType[] = ["HOME", "VENUE", "WORKPLACE", "VEHICLE", "JOURNEY", "EVENT"];

export const PROTECTED = [
  { key: "SELF", label: "Me" },
  { key: "HOUSEHOLD", label: "People I live with" },
  { key: "CHILDREN", label: "Children" },
  { key: "GUESTS_OR_STAFF", label: "Guests or staff" },
  { key: "VALUABLES", label: "Valuables or property" },
  { key: "DIGITAL_ASSETS", label: "Digital assets or accounts" },
] as const;
export type ProtectedKey = (typeof PROTECTED)[number]["key"];
export const PROTECTED_KEYS = PROTECTED.map((p) => p.key) as [ProtectedKey, ...ProtectedKey[]];

type ConcernDef = { key: string; label: string; environments: readonly EnvironmentType[]; derived: boolean };

/** `derived` concerns are never ticked; the assessment adds them itself
 * (an upcoming occasion the person mentioned). */
export const CONCERNS = [
  {
    key: "BURGLARY",
    label: "A break-in while nobody is there",
    environments: ["HOME", "WORKPLACE", "VENUE"],
    derived: false,
  },
  {
    key: "UNWANTED_VISITORS",
    label: "Unwanted people at the door",
    environments: ["HOME", "WORKPLACE", "VENUE"],
    derived: false,
  },
  {
    key: "ARRIVING_AT_NIGHT",
    label: "Feeling unsafe arriving at night",
    environments: ["HOME", "JOURNEY", "VEHICLE"],
    derived: false,
  },
  {
    key: "BEING_FOUND",
    label: "Someone finding out where I live or am",
    environments: ["HOME", "WORKPLACE", "JOURNEY", "EVENT"],
    derived: false,
  },
  {
    key: "FOLLOWED",
    label: "Being followed or harassed on the way",
    environments: ["JOURNEY", "EVENT", "VEHICLE"],
    derived: false,
  },
  {
    key: "ONLINE_EXPOSURE",
    label: "My details or holdings being findable online",
    environments: EVERYWHERE,
    derived: false,
  },
  {
    key: "GUEST_CONFLICT",
    label: "Aggression or conflict among guests",
    environments: ["VENUE", "EVENT"],
    derived: false,
  },
  { key: "UPCOMING_EVENT", label: "An upcoming occasion", environments: EVERYWHERE, derived: true },
] as const satisfies readonly ConcernDef[];

export type ConcernKey = (typeof CONCERNS)[number]["key"];
export const CONCERN_KEYS = CONCERNS.map((c) => c.key) as [ConcernKey, ...ConcernKey[]];

/** The concerns a person can tick for this kind of place. */
export function concernsFor(env: EnvironmentType): ConcernDef[] {
  return (CONCERNS as readonly ConcernDef[]).filter((c) => !c.derived && c.environments.includes(env));
}

export function concernApplies(key: string, env: EnvironmentType): boolean {
  return (CONCERNS as readonly ConcernDef[]).find((c) => c.key === key)?.environments.includes(env) ?? false;
}

type Raising = { key: string; label: string; raises: readonly ConcernKey[] };

/** Routines and exposure: vulnerabilities that make concerns more likely,
 * whether or not the person ticked them. */
export const EXPOSURES = [
  {
    key: "PREDICTABLE_ROUTINE",
    label: "I follow the same routine most days",
    raises: ["ARRIVING_AT_NIGHT", "FOLLOWED", "BEING_FOUND"],
  },
  { key: "LATE_ALONE", label: "I'm often out late and alone", raises: ["ARRIVING_AT_NIGHT", "FOLLOWED"] },
  { key: "PUBLIC_PROFILE", label: "I'm publicly known or visibly wealthy", raises: ["BEING_FOUND", "ONLINE_EXPOSURE"] },
  { key: "POSTS_LOCATION", label: "I post where I am online, as it happens", raises: ["BEING_FOUND", "FOLLOWED"] },
  { key: "CROWDS_AND_ALCOHOL", label: "We regularly have crowds or alcohol on site", raises: ["GUEST_CONFLICT"] },
] as const satisfies readonly Raising[];
export type ExposureKey = (typeof EXPOSURES)[number]["key"];
export const EXPOSURE_KEYS = EXPOSURES.map((e) => e.key) as [ExposureKey, ...ExposureKey[]];

/** A known threat makes the concerns it touches a high priority. */
export const THREATS = [
  {
    key: "SPECIFIC_PERSON",
    label: "A specific person has threatened or harassed me",
    raises: ["BEING_FOUND", "UNWANTED_VISITORS", "FOLLOWED", "ARRIVING_AT_NIGHT"],
  },
  {
    key: "PAST_INCIDENT",
    label: "Something has already happened here",
    raises: ["BURGLARY", "UNWANTED_VISITORS", "GUEST_CONFLICT"],
  },
  { key: "ONLINE_HARASSMENT", label: "I'm being harassed online", raises: ["ONLINE_EXPOSURE", "BEING_FOUND"] },
] as const satisfies readonly Raising[];
export type ThreatKey = (typeof THREATS)[number]["key"];
export const THREAT_KEYS = THREATS.map((t) => t.key) as [ThreatKey, ...ThreatKey[]];

type MeasureDef = { key: string; label: string; environments: readonly EnvironmentType[] };

export const MEASURES = [
  {
    key: "SOLID_DOOR_LOCK",
    label: "A solid door with a multi-point or security lock",
    environments: ["HOME", "WORKPLACE", "VENUE"],
  },
  { key: "DOOR_VIEWER", label: "A door viewer or chain", environments: ["HOME", "WORKPLACE"] },
  { key: "ENTRANCE_LIGHTING", label: "A well-lit entrance", environments: ["HOME", "WORKPLACE", "VENUE"] },
  { key: "NEIGHBOUR_CONTACT", label: "A neighbour who keeps an eye out", environments: ["HOME", "WORKPLACE", "VENUE"] },
  { key: "CHECK_IN_CONTACT", label: "Someone I message when I get there", environments: EVERYWHERE },
  { key: "ADDRESS_BLOCKED", label: "My address is not in public directories", environments: ["HOME"] },
  { key: "STAFF_TRAINED", label: "Our staff are trained in de-escalation", environments: ["VENUE", "WORKPLACE", "EVENT"] },
] as const satisfies readonly MeasureDef[];

export type MeasureKey = (typeof MEASURES)[number]["key"];
export const MEASURE_KEYS = MEASURES.map((m) => m.key) as [MeasureKey, ...MeasureKey[]];

export function measuresFor(env: EnvironmentType): MeasureDef[] {
  return (MEASURES as readonly MeasureDef[]).filter((m) => m.environments.includes(env));
}

/** Cost tiers double as budgets: a budget is the highest tier someone will pay. */
export const COST_TIERS = [
  { key: "FREE", label: "Free", rank: 0, budget: "Nothing — only free steps" },
  { key: "LOW", label: "Under CHF 100", rank: 1, budget: "Up to CHF 100" },
  { key: "MEDIUM", label: "CHF 100–500", rank: 2, budget: "Up to CHF 500" },
  { key: "HIGH", label: "Over CHF 500 or a subscription", rank: 3, budget: "More, if it's clearly worth it" },
] as const;

export type CostTier = (typeof COST_TIERS)[number]["key"];
export const COST_TIER_KEYS = COST_TIERS.map((c) => c.key) as [CostTier, ...CostTier[]];

export const ASSESSMENT_LIMITS = { upcomingMax: 300 } as const;

const labelOf = (list: readonly { key: string; label: string }[], key: string) =>
  list.find((x) => x.key === key)?.label ?? key;

export const concernLabel = (key: string) => labelOf(CONCERNS, key);
export const exposureLabel = (key: string) => labelOf(EXPOSURES, key);
export const threatLabel = (key: string) => labelOf(THREATS, key);
export const protectedLabel = (key: string) => labelOf(PROTECTED, key);
export const costLabel = (key: CostTier) => labelOf(COST_TIERS, key);

export function budgetLabel(key: CostTier): string {
  return COST_TIERS.find((c) => c.key === key)?.budget ?? key;
}

export function costRank(key: CostTier): number {
  return COST_TIERS.find((c) => c.key === key)?.rank ?? Number.MAX_SAFE_INTEGER;
}
