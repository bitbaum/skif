import type { CapabilityKey, CapabilityLevel } from "./capabilities";
import type { ServiceKey } from "./services";

/**
 * Weights for the deterministic Protector ranking (src/domain/matching.ts).
 * Every point a Protector earns is shown to Operations with its reason, so a
 * change here is visible in the UI, never hidden inside a score.
 */
export const MATCH_WEIGHTS = {
  /** Per language shared with the customer's preferred languages. */
  sharedLanguage: 10,
  /** Per relevant capability, scaled by level and verification below. */
  relevantCapability: 20,
  /** Protector's presence style matches the customer's. */
  presenceStyle: 10,
  /** Multiplied by the average past rating (0..1 scale). */
  pastRatings: 30,
  /** Subtracted per job the Protector completed in the fairness window. */
  recentWorkload: 2,
} as const;

export const LEVEL_FACTOR: Record<CapabilityLevel, number> = {
  BASIC: 0.5,
  PROFICIENT: 0.75,
  ADVANCED: 1,
};

/** A capability nobody has checked counts, but for less (SPEC §7, §9). */
export const VERIFICATION_FACTOR = { VERIFIED: 1, SELF_DECLARED: 0.5 } as const;

/** Jobs completed within this many days count toward workload balancing. */
export const WORKLOAD_WINDOW_DAYS = 30;

/** The capabilities that matter most for each service, most important first. */
export const SERVICE_CAPABILITIES: Record<ServiceKey, readonly CapabilityKey[]> = {
  NIGHT_OUT: ["DE_ESCALATION", "NIGHTLIFE", "FIRST_AID"],
  GET_HOME: ["DE_ESCALATION", "TRAUMA_INFORMED"],
  HIGH_EXPOSURE: ["CLOSE_PROTECTION", "DE_ESCALATION", "DIGITAL_ASSET_LITERACY"],
  FAMILY: ["CHILDREN", "FIRST_AID", "DE_ESCALATION"],
  VENUE_STAFF: ["DE_ESCALATION", "NIGHTLIFE", "FIRST_AID"],
};
