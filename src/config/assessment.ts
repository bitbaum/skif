import type { HardConstraintKey } from "./constraints";

/**
 * SSOT for the Safety Assessment: what a person can be worried about, what
 * they already do, and the catalogue of interventions Skif can recommend.
 *
 * Interventions are ordered for recommendation by `intrusiveness`, then
 * `cost` — the most proportionate option that still addresses the concern
 * wins. Anything that would break a hard constraint the person has set
 * (`conflictsWith`) is excluded and shown as excluded, with the constraint
 * that excluded it.
 */
export const CONCERNS = [
  { key: "BURGLARY", label: "A break-in while I'm away" },
  { key: "UNWANTED_VISITORS", label: "Unwanted people at my door" },
  { key: "ARRIVING_AT_NIGHT", label: "Feeling unsafe arriving home at night" },
  { key: "BEING_FOUND", label: "Someone finding out where I live" },
] as const;

export type ConcernKey = (typeof CONCERNS)[number]["key"];
export const CONCERN_KEYS = CONCERNS.map((c) => c.key) as [ConcernKey, ...ConcernKey[]];

export const MEASURES = [
  { key: "SOLID_DOOR_LOCK", label: "A solid door with a multi-point or security lock" },
  { key: "DOOR_VIEWER", label: "A door viewer or chain" },
  { key: "ENTRANCE_LIGHTING", label: "A well-lit entrance" },
  { key: "NEIGHBOUR_CONTACT", label: "A neighbour who keeps an eye out" },
  { key: "CHECK_IN_CONTACT", label: "Someone I message when I get home" },
  { key: "ADDRESS_BLOCKED", label: "My address is not in public directories" },
] as const;

export type MeasureKey = (typeof MEASURES)[number]["key"];
export const MEASURE_KEYS = MEASURES.map((m) => m.key) as [MeasureKey, ...MeasureKey[]];

export const COST_TIERS = [
  { key: "FREE", label: "Free", rank: 0 },
  { key: "LOW", label: "Under CHF 100", rank: 1 },
  { key: "MEDIUM", label: "CHF 100–500", rank: 2 },
  { key: "HIGH", label: "Over CHF 500 or a subscription", rank: 3 },
] as const;

export type CostTier = (typeof COST_TIERS)[number]["key"];

export const INTRUSIVENESS = [
  { level: 0, label: "No data, no devices watching" },
  { level: 1, label: "Shares a little with people you choose" },
  { level: 2, label: "Records or signals beyond your home" },
  { level: 3, label: "Watches people or leaves your control" },
] as const;

export type Intervention = {
  key: string;
  title: string;
  addresses: readonly ConcernKey[];
  intrusiveness: 0 | 1 | 2 | 3;
  cost: CostTier;
  /** True when following it means buying a product or a service. */
  purchase: boolean;
  /** Hard constraints this intervention would break; any overlap with the person's
   * active constraints excludes it. */
  conflictsWith: readonly HardConstraintKey[];
  /** A measure the person already has that makes this redundant. */
  coveredBy?: MeasureKey;
  tradeoffs: string;
};

export const INTERVENTIONS = [
  {
    key: "NEIGHBOUR_ARRANGEMENT",
    title: "Agree with a neighbour to keep an eye out and empty the mailbox when you're away",
    addresses: ["BURGLARY", "UNWANTED_VISITORS"],
    intrusiveness: 1,
    cost: "FREE",
    purchase: false,
    conflictsWith: [],
    coveredBy: "NEIGHBOUR_CONTACT",
    tradeoffs: "Relies on someone else's attention; they learn when you are away.",
  },
  {
    key: "DOOR_POLICY",
    title: "Don't open to unannounced visitors; speak through the closed door or intercom",
    addresses: ["UNWANTED_VISITORS"],
    intrusiveness: 0,
    cost: "FREE",
    purchase: false,
    conflictsWith: [],
    tradeoffs: "Can feel awkward with deliveries or officials; ask for ID through the door.",
  },
  {
    key: "LIVED_IN_ROUTINE",
    title: "Make the home look lived-in: a lamp on a timer you already own, blinds as usual",
    addresses: ["BURGLARY"],
    intrusiveness: 0,
    cost: "FREE",
    purchase: false,
    conflictsWith: [],
    tradeoffs: "Deters opportunists, not a determined intruder.",
  },
  {
    key: "CHECK_IN_ROUTINE",
    title: "Message one trusted person when you leave and when you're home",
    addresses: ["ARRIVING_AT_NIGHT", "BEING_FOUND"],
    intrusiveness: 1,
    cost: "FREE",
    purchase: false,
    conflictsWith: [],
    coveredBy: "CHECK_IN_CONTACT",
    tradeoffs: "Someone you trust knows your timing; agree what they do if you go quiet.",
  },
  {
    key: "ADDRESS_BLOCK",
    title:
      "Remove your address from public directories and ask the Personenmeldeamt for a data-release block",
    addresses: ["BEING_FOUND"],
    intrusiveness: 0,
    cost: "FREE",
    purchase: false,
    conflictsWith: [],
    coveredBy: "ADDRESS_BLOCKED",
    tradeoffs: "Some paperwork; legitimate senders may find you harder to reach.",
  },
  {
    key: "DOOR_VIEWER_FIT",
    title: "Fit a door viewer or chain",
    addresses: ["UNWANTED_VISITORS"],
    intrusiveness: 0,
    cost: "LOW",
    purchase: true,
    conflictsWith: [],
    coveredBy: "DOOR_VIEWER",
    tradeoffs: "Renters need the landlord's consent to drill.",
  },
  {
    key: "ENTRANCE_LIGHT",
    title: "Motion light at the entrance (no camera)",
    addresses: ["ARRIVING_AT_NIGHT", "BURGLARY"],
    intrusiveness: 0,
    cost: "LOW",
    purchase: true,
    conflictsWith: [],
    coveredBy: "ENTRANCE_LIGHTING",
    tradeoffs: "May need building management's approval; can bother neighbours.",
  },
  {
    key: "LOCK_UPGRADE",
    title: "Upgrade to a security cylinder and strike plate",
    addresses: ["BURGLARY"],
    intrusiveness: 0,
    cost: "MEDIUM",
    purchase: true,
    conflictsWith: [],
    coveredBy: "SOLID_DOOR_LOCK",
    tradeoffs: "Real cost; renters need the landlord's consent.",
  },
  {
    key: "ACCOMPANIED_HOME",
    title: "Book a Skif Protector to accompany you home on the nights that worry you",
    addresses: ["ARRIVING_AT_NIGHT", "BEING_FOUND"],
    intrusiveness: 1,
    cost: "MEDIUM",
    purchase: true,
    conflictsWith: ["NO_HUMAN_PROTECTOR"],
    tradeoffs: "A paid service each time; a Protector learns your address.",
  },
  {
    key: "LOCAL_SIREN_ALARM",
    title: "Local siren alarm on the door, no monitoring centre",
    addresses: ["BURGLARY"],
    intrusiveness: 1,
    cost: "MEDIUM",
    purchase: true,
    conflictsWith: [],
    tradeoffs: "Nobody is called; false alarms annoy neighbours.",
  },
  {
    key: "LOCAL_DOORBELL_CAMERA",
    title: "Doorbell camera recording to a card at home, pointed only at your door",
    addresses: ["UNWANTED_VISITORS", "BURGLARY"],
    intrusiveness: 2,
    cost: "MEDIUM",
    purchase: true,
    conflictsWith: ["NO_PERSISTENT_RECORDING", "NO_EXTERIOR_CAMERAS"],
    tradeoffs: "Records neighbours and passers-by; Swiss data-protection rules apply to shared areas.",
  },
  {
    key: "CLOUD_DOORBELL_CAMERA",
    title: "Cloud doorbell camera with face recognition",
    addresses: ["UNWANTED_VISITORS", "BURGLARY"],
    intrusiveness: 3,
    cost: "HIGH",
    purchase: true,
    conflictsWith: [
      "NO_CLOUD_VIDEO",
      "NO_FACIAL_RECOGNITION",
      "LOCAL_ONLY_PROCESSING",
      "NO_PERSISTENT_RECORDING",
      "NO_EXTERIOR_CAMERAS",
    ],
    tradeoffs: "Video and faces sit with a vendor who can share them without you deciding.",
  },
  {
    key: "INDOOR_CAMERA",
    title: "Indoor camera",
    addresses: ["BURGLARY"],
    intrusiveness: 3,
    cost: "MEDIUM",
    purchase: true,
    conflictsWith: ["NO_INTERIOR_CAMERAS", "NO_CLOUD_VIDEO", "NO_PERSISTENT_RECORDING"],
    tradeoffs: "Films your private life and anyone who visits.",
  },
  {
    key: "MONITORED_ALARM",
    title: "Monitored alarm with automatic police dispatch",
    addresses: ["BURGLARY"],
    intrusiveness: 2,
    cost: "HIGH",
    purchase: true,
    conflictsWith: ["NO_AUTO_POLICE_SHARING", "LOCAL_ONLY_PROCESSING"],
    tradeoffs: "Subscription; alarms go to the police without you deciding.",
  },
] as const satisfies readonly Intervention[];

export type InterventionKey = (typeof INTERVENTIONS)[number]["key"];

export function findIntervention(key: string): Intervention | undefined {
  return INTERVENTIONS.find((i) => i.key === key);
}

export function concernLabel(key: string): string {
  return CONCERNS.find((c) => c.key === key)?.label ?? key;
}

export function costLabel(key: CostTier): string {
  return COST_TIERS.find((c) => c.key === key)?.label ?? key;
}

export function costRank(key: CostTier): number {
  return COST_TIERS.find((c) => c.key === key)?.rank ?? Number.MAX_SAFE_INTEGER;
}

export function intrusivenessLabel(level: number): string {
  return INTRUSIVENESS.find((i) => i.level === level)?.label ?? String(level);
}

