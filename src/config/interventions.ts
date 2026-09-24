import type { ConcernKey, CostTier, MeasureKey } from "./assessment";
import type { AxisKey, HardConstraintKey } from "./constraints";

/**
 * SSOT for the intervention catalogue (SPEC §2, §12). Every intervention keeps
 * its dimensions apart — benefit, evidence, privacy, autonomy, cost — rather
 * than folding them into one score.
 *
 * Honesty about evidence (§16): every benefit and confidence below is Skif's
 * own judgment, not yet backed by cited research, and says so. None is rated
 * high-confidence until evidence exists.
 */

export const LEVELS = [
  { key: "LOW", label: "Low" },
  { key: "MEDIUM", label: "Medium" },
  { key: "HIGH", label: "High" },
] as const;
export type Level = (typeof LEVELS)[number]["key"];

export function levelText(key: Level): string {
  return LEVELS.find((l) => l.key === key)?.label ?? key;
}

/** What following the intervention actually involves (§12). Anything that
 * involves a product, a professional service or a Protector means spending money. */
export const INTERVENTION_KINDS = [
  { key: "BEHAVIOURAL", label: "Something you do", purchase: false },
  { key: "ENVIRONMENTAL", label: "A change to the place", purchase: false },
  { key: "PRODUCT", label: "Needs a product", purchase: true },
  { key: "PROFESSIONAL_SERVICE", label: "Needs a professional service", purchase: true },
  { key: "PROTECTOR", label: "Needs a Protector", purchase: true },
] as const;
export type InterventionKind = (typeof INTERVENTION_KINDS)[number]["key"];

export function kindLabel(key: InterventionKind): string {
  return INTERVENTION_KINDS.find((k) => k.key === key)?.label ?? key;
}

export function needsPurchase(kind: InterventionKind): boolean {
  return INTERVENTION_KINDS.find((k) => k.key === kind)?.purchase ?? true;
}

/** Where a benefit rating comes from (§16). Only SKIF_JUDGMENT is used today. */
export const EVIDENCE_BASES = [
  { key: "RESEARCH", label: "Published research" },
  { key: "INTERNAL_OBSERVATION", label: "Observed in Skif deployments" },
  { key: "EXPERT_OPINION", label: "Named expert's opinion" },
  { key: "SKIF_JUDGMENT", label: "Skif's own judgment — no research cited yet" },
  { key: "VENDOR_CLAIM", label: "Manufacturer's claim, unverified" },
] as const;
export type EvidenceBasis = (typeof EVIDENCE_BASES)[number]["key"];

export function basisLabel(key: EvidenceBasis): string {
  return EVIDENCE_BASES.find((b) => b.key === key)?.label ?? key;
}

export const PRIVACY_IMPACT = [
  { level: 0, label: "No data, no devices watching" },
  { level: 1, label: "Shares a little with people you choose" },
  { level: 2, label: "Records or signals beyond your home" },
  { level: 3, label: "Watches people or leaves your control" },
] as const;

export const AUTONOMY_IMPACT = [
  { level: 0, label: "Changes nothing about how you live" },
  { level: 1, label: "Asks a small routine of you" },
  { level: 2, label: "Something else decides or acts for you" },
  { level: 3, label: "Restricts what you can do" },
] as const;

type Impact = 0 | 1 | 2 | 3;

export function privacyLabel(level: number): string {
  return PRIVACY_IMPACT.find((i) => i.level === level)?.label ?? String(level);
}

export function autonomyLabel(level: number): string {
  return AUTONOMY_IMPACT.find((i) => i.level === level)?.label ?? String(level);
}

/** Which pole of a preference axis an intervention sits at; DISCRETION is
 * the presence style (-1 discreet, 1 visible). Unlisted axes are neutral. */
export type Leans = Partial<Record<AxisKey | "DISCRETION", -1 | 1>>;

export type Intervention = {
  key: string;
  title: string;
  addresses: readonly ConcernKey[];
  privacyImpact: Impact;
  autonomyImpact: Impact;
  cost: CostTier;
  kind: InterventionKind;
  benefit: Level;
  evidence: { confidence: Level; basis: EvidenceBasis };
  /** Hard constraints this intervention would break; any overlap with the
   * person's active constraints excludes it. */
  conflictsWith: readonly HardConstraintKey[];
  /** A measure the person already has that makes this redundant. */
  coveredBy?: MeasureKey;
  tradeoffs: string;
  leans: Leans;
};

export const INTERVENTIONS = [
  {
    key: "NEIGHBOUR_ARRANGEMENT",
    title: "Agree with a neighbour to keep an eye out and empty the mailbox when you're away",
    addresses: ["BURGLARY", "UNWANTED_VISITORS"],
    privacyImpact: 1,
    autonomyImpact: 0,
    cost: "FREE",
    kind: "BEHAVIOURAL",
    benefit: "MEDIUM",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    coveredBy: "NEIGHBOUR_CONTACT",
    tradeoffs: "Relies on someone else's attention; they learn when you are away.",
    leans: { SCOPE: 1, HUMAN_TECH: -1, AUTONOMY: -1 },
  },
  {
    key: "DOOR_POLICY",
    title: "Don't open to unannounced visitors; speak through the closed door or intercom",
    addresses: ["UNWANTED_VISITORS"],
    privacyImpact: 0,
    autonomyImpact: 0,
    cost: "FREE",
    kind: "BEHAVIOURAL",
    benefit: "MEDIUM",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    tradeoffs: "Can feel awkward with deliveries or officials; ask for ID through the door.",
    leans: { PRIVACY: -1, AUTONOMY: -1, HUMAN_TECH: -1 },
  },
  {
    key: "LIVED_IN_ROUTINE",
    title: "Make the home look lived-in: a lamp on a timer you already own, blinds as usual",
    addresses: ["BURGLARY"],
    privacyImpact: 0,
    autonomyImpact: 0,
    cost: "FREE",
    kind: "ENVIRONMENTAL",
    benefit: "LOW",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    tradeoffs: "Deters opportunists, not a determined intruder.",
    leans: { PRIVACY: -1, AUTONOMY: -1, HARDENING: -1 },
  },
  {
    key: "CHECK_IN_ROUTINE",
    title: "Message one trusted person when you leave and when you're home",
    addresses: ["ARRIVING_AT_NIGHT", "BEING_FOUND"],
    privacyImpact: 1,
    autonomyImpact: 1,
    cost: "FREE",
    kind: "BEHAVIOURAL",
    benefit: "MEDIUM",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    coveredBy: "CHECK_IN_CONTACT",
    tradeoffs: "Someone you trust knows your timing; agree what they do if you go quiet.",
    leans: { HUMAN_TECH: -1, AUTONOMY: -1, SCOPE: 1 },
  },
  {
    key: "ADDRESS_BLOCK",
    title:
      "Remove your address from public directories and ask the Personenmeldeamt for a data-release block",
    addresses: ["BEING_FOUND"],
    privacyImpact: 0,
    autonomyImpact: 0,
    cost: "FREE",
    kind: "BEHAVIOURAL",
    benefit: "HIGH",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    coveredBy: "ADDRESS_BLOCKED",
    tradeoffs: "Some paperwork; legitimate senders may find you harder to reach.",
    leans: { PRIVACY: -1, AUTONOMY: -1 },
  },
  {
    key: "DOOR_VIEWER_FIT",
    title: "Fit a door viewer or chain",
    addresses: ["UNWANTED_VISITORS"],
    privacyImpact: 0,
    autonomyImpact: 0,
    cost: "LOW",
    kind: "PRODUCT",
    benefit: "MEDIUM",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    coveredBy: "DOOR_VIEWER",
    tradeoffs: "Renters need the landlord's consent to drill.",
    leans: { PRIVACY: -1, AUTONOMY: -1, HARDENING: 1 },
  },
  {
    key: "ENTRANCE_LIGHT",
    title: "Motion light at the entrance (no camera)",
    addresses: ["ARRIVING_AT_NIGHT", "BURGLARY"],
    privacyImpact: 0,
    autonomyImpact: 0,
    cost: "LOW",
    kind: "PRODUCT",
    benefit: "MEDIUM",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    coveredBy: "ENTRANCE_LIGHTING",
    tradeoffs: "May need building management's approval; can bother neighbours.",
    leans: { PRIVACY: -1, AUTONOMY: 1, HUMAN_TECH: 1, SCOPE: 1 },
  },
  {
    key: "LOCK_UPGRADE",
    title: "Upgrade to a security cylinder and strike plate",
    addresses: ["BURGLARY"],
    privacyImpact: 0,
    autonomyImpact: 0,
    cost: "MEDIUM",
    kind: "PRODUCT",
    benefit: "HIGH",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    coveredBy: "SOLID_DOOR_LOCK",
    tradeoffs: "Real cost; renters need the landlord's consent.",
    leans: { PRIVACY: -1, HUMAN_TECH: 1, HARDENING: 1 },
  },
  {
    key: "ACCOMPANIED_HOME",
    title: "Book a Skif Protector to accompany you home on the nights that worry you",
    addresses: ["ARRIVING_AT_NIGHT", "BEING_FOUND"],
    privacyImpact: 1,
    autonomyImpact: 1,
    cost: "MEDIUM",
    kind: "PROTECTOR",
    benefit: "HIGH",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: ["NO_HUMAN_PROTECTOR"],
    tradeoffs: "A paid service each time; a Protector learns your address.",
    leans: { HUMAN_TECH: -1, HARDENING: 1 },
  },
  {
    key: "LOCAL_SIREN_ALARM",
    title: "Local siren alarm on the door, no monitoring centre",
    addresses: ["BURGLARY"],
    privacyImpact: 1,
    autonomyImpact: 1,
    cost: "MEDIUM",
    kind: "PRODUCT",
    benefit: "MEDIUM",
    evidence: { confidence: "LOW", basis: "SKIF_JUDGMENT" },
    conflictsWith: [],
    tradeoffs: "Nobody is called; false alarms annoy neighbours.",
    leans: { AUTONOMY: 1, HUMAN_TECH: 1, PROCESSING: -1, DISCRETION: 1, HARDENING: 1 },
  },
  {
    key: "LOCAL_DOORBELL_CAMERA",
    title: "Doorbell camera recording to a card at home, pointed only at your door",
    addresses: ["UNWANTED_VISITORS", "BURGLARY"],
    privacyImpact: 2,
    autonomyImpact: 1,
    cost: "MEDIUM",
    kind: "PRODUCT",
    benefit: "MEDIUM",
    evidence: { confidence: "LOW", basis: "SKIF_JUDGMENT" },
    conflictsWith: ["NO_PERSISTENT_RECORDING", "NO_EXTERIOR_CAMERAS"],
    tradeoffs: "Records neighbours and passers-by; Swiss data-protection rules apply to shared areas.",
    leans: { PRIVACY: 1, AUTONOMY: 1, HUMAN_TECH: 1, PROCESSING: -1, DISCRETION: 1 },
  },
  {
    key: "CLOUD_DOORBELL_CAMERA",
    title: "Cloud doorbell camera with face recognition",
    addresses: ["UNWANTED_VISITORS", "BURGLARY"],
    privacyImpact: 3,
    autonomyImpact: 2,
    cost: "HIGH",
    kind: "PRODUCT",
    benefit: "MEDIUM",
    evidence: { confidence: "LOW", basis: "SKIF_JUDGMENT" },
    conflictsWith: [
      "NO_CLOUD_VIDEO",
      "NO_FACIAL_RECOGNITION",
      "LOCAL_ONLY_PROCESSING",
      "NO_PERSISTENT_RECORDING",
      "NO_EXTERIOR_CAMERAS",
    ],
    tradeoffs: "Video and faces sit with a vendor who can share them without you deciding.",
    leans: { PRIVACY: 1, AUTONOMY: 1, HUMAN_TECH: 1, PROCESSING: 1, DISCRETION: 1 },
  },
  {
    key: "INDOOR_CAMERA",
    title: "Indoor camera",
    addresses: ["BURGLARY"],
    privacyImpact: 3,
    autonomyImpact: 2,
    cost: "MEDIUM",
    kind: "PRODUCT",
    benefit: "LOW",
    evidence: { confidence: "LOW", basis: "SKIF_JUDGMENT" },
    conflictsWith: ["NO_INTERIOR_CAMERAS", "NO_CLOUD_VIDEO", "NO_PERSISTENT_RECORDING"],
    tradeoffs: "Films your private life and anyone who visits.",
    leans: { PRIVACY: 1, AUTONOMY: 1, HUMAN_TECH: 1, PROCESSING: 1 },
  },
  {
    key: "MONITORED_ALARM",
    title: "Monitored alarm with automatic police dispatch",
    addresses: ["BURGLARY"],
    privacyImpact: 2,
    autonomyImpact: 2,
    cost: "HIGH",
    kind: "PROFESSIONAL_SERVICE",
    benefit: "HIGH",
    evidence: { confidence: "MEDIUM", basis: "SKIF_JUDGMENT" },
    conflictsWith: ["NO_AUTO_POLICE_SHARING", "LOCAL_ONLY_PROCESSING"],
    tradeoffs: "Subscription; alarms go to the police without you deciding.",
    leans: { AUTONOMY: 1, HUMAN_TECH: 1, PROCESSING: 1, DISCRETION: 1, HARDENING: 1 },
  },
] as const satisfies readonly Intervention[];

export type InterventionKey = (typeof INTERVENTIONS)[number]["key"];

export function findIntervention(key: string): Intervention | undefined {
  return (INTERVENTIONS as readonly Intervention[]).find((i) => i.key === key);
}
