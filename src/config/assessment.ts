/**
 * SSOT for the Safety Assessment's questions (SPEC §12): who or what is being
 * protected, what worries the person, what exposes them, any known threat,
 * what they already do, and what they are willing to spend. The interventions
 * that answer them live in ./interventions.ts.
 *
 * `environments` limits a question to the places it makes sense for.
 */
import { concernApplies, EVERYWHERE, type ConcernKey } from "./concerns";
import type { EnvironmentType } from "./environments";

export * from "./concerns";

export const PROTECTED = [
  { key: "SELF", label: "Me" },
  { key: "HOUSEHOLD", label: "People I live with" },
  { key: "CHILDREN", label: "Children" },
  { key: "GUESTS_OR_STAFF", label: "Guests or staff" },
  { key: "VALUABLES", label: "Valuables or property" },
  { key: "DIGITAL_ASSETS", label: "Digital assets or accounts" },
  { key: "IDENTITY", label: "My identity and privacy" },
  { key: "REPUTATION", label: "My reputation or my business's" },
  { key: "HEALTH", label: "Our health and wellbeing" },
  { key: "RELATIVES", label: "Relatives who rely on me" },
  { key: "ORGANISATION", label: "A company or organisation I run" },
] as const;
export type ProtectedKey = (typeof PROTECTED)[number]["key"];
export const PROTECTED_KEYS = PROTECTED.map((p) => p.key) as [ProtectedKey, ...ProtectedKey[]];

type Raising = { key: string; label: string; raises: readonly ConcernKey[] };

/** Exposures or threats worth asking about here: those that raise at least
 * one concern that applies to this kind of place. */
export function raisingFor<T extends { raises: readonly ConcernKey[] }>(list: readonly T[], env: EnvironmentType): T[] {
  return list.filter((x) => x.raises.some((c) => concernApplies(c, env)));
}

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
  { key: "CROWDS_AND_ALCOHOL", label: "We regularly have crowds or alcohol on site", raises: ["GUEST_CONFLICT", "MEDICAL_EMERGENCY"] },
  {
    key: "HOLDS_CRYPTO",
    label: "I hold crypto or other assets that are easy to move",
    raises: ["CRYPTO_KEYS", "COERCION", "FRAUD", "ACCOUNT_TAKEOVER"],
  },
  {
    key: "REUSED_PASSWORDS",
    label: "I reuse passwords, or my email has no second factor",
    raises: ["ACCOUNT_TAKEOVER", "LOCKED_OUT"],
  },
  {
    key: "PUBLIC_WORK",
    label: "My work is public, political or controversial",
    raises: ["REPUTATION_ATTACK", "IMPERSONATION", "BEING_FOUND"],
  },
  {
    key: "CHILDREN_ONLINE",
    label: "My children have their own phones or social media",
    raises: ["CHILDREN_SAFETY", "LOCATION_TRACKING"],
  },
  {
    key: "RELATIVE_ALONE",
    label: "An older relative lives alone or handles money on the phone",
    raises: ["RELATIVE_TARGETED", "FRAUD", "MEDICAL_EMERGENCY"],
  },
  {
    key: "ONLY_I_KNOW",
    label: "Only I know how to get into our accounts, or where things are",
    raises: ["NO_PLAN", "LOCKED_OUT"],
  },
  {
    key: "NEW_TO_AREA",
    label: "I'm new here, or travel somewhere unfamiliar often",
    raises: ["UNFAMILIAR_AREA", "KNOWING_MY_RIGHTS"],
  },
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
  {
    key: "ONLINE_HARASSMENT",
    label: "I'm being harassed online",
    raises: ["ONLINE_EXPOSURE", "BEING_FOUND", "REPUTATION_ATTACK", "IMPERSONATION"],
  },
  {
    key: "ACCOUNT_BREACHED",
    label: "An account or device of mine has already been broken into",
    raises: ["ACCOUNT_TAKEOVER", "DEVICE_COMPROMISE", "LOCKED_OUT", "FRAUD"],
  },
  {
    key: "EXTORTION",
    label: "Someone is trying to blackmail or extort me",
    raises: ["COERCION", "REPUTATION_ATTACK", "BEING_FOUND"],
  },
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
  { key: "ADDRESS_BLOCKED", label: "My address is not in public directories", environments: ["PERSON", "HOME"] },
  { key: "STAFF_TRAINED", label: "Our staff are trained in de-escalation", environments: ["VENUE", "WORKPLACE", "EVENT"] },
  {
    key: "PASSWORD_MANAGER",
    label: "A password manager, and two-factor on email and bank",
    environments: ["PERSON", "WORKPLACE", "VENUE"],
  },
  { key: "KEYS_BACKED_UP", label: "Crypto keys in cold storage with a tested backup", environments: ["PERSON"] },
  { key: "RECOVERY_STORED", label: "Account recovery codes kept offline, somewhere safe", environments: ["PERSON", "WORKPLACE"] },
  { key: "FAMILY_PLAN", label: "My family knows who to call and where to meet", environments: ["PERSON", "HOME"] },
  { key: "FIRST_AIDER", label: "Someone here has done a first-aid course", environments: EVERYWHERE },
  { key: "SMOKE_ALARMS", label: "Working smoke alarms and a fire extinguisher", environments: ["HOME", "WORKPLACE", "VENUE"] },
  { key: "CODE_WORD", label: "A family code word for calls asking for money", environments: ["PERSON"] },
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
