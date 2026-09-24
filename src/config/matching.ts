import type { ServiceKey } from "./services";
import type { ProtectorSkill } from "./protectors";

/**
 * Weights for the deterministic Protector ranking (src/domain/matching.ts).
 * Every point a Protector earns is shown to Operations with its reason, so a
 * change here is visible in the UI, never hidden inside a score.
 */
export const MATCH_WEIGHTS = {
  /** Per language shared with the customer's preferred languages. */
  sharedLanguage: 10,
  /** Per skill the service calls for that the Protector has. */
  relevantSkill: 15,
  /** Protector's presence style matches the customer's. */
  presenceStyle: 10,
  /** Multiplied by the average past rating (0..1 scale). */
  pastRatings: 30,
  /** Subtracted per job the Protector completed in the fairness window. */
  recentWorkload: 2,
} as const;

/** Jobs completed within this many days count toward workload balancing. */
export const WORKLOAD_WINDOW_DAYS = 30;

/** The skills that matter most for each service. */
export const SERVICE_SKILLS: Record<ServiceKey, readonly ProtectorSkill[]> = {
  NIGHT_OUT: ["DE_ESCALATION", "NIGHTLIFE", "FIRST_AID"],
  GET_HOME: ["DE_ESCALATION", "TRAUMA_INFORMED"],
  HIGH_EXPOSURE: ["CLOSE_PROTECTION", "DE_ESCALATION"],
  FAMILY: ["CHILDREN", "FIRST_AID", "DE_ESCALATION"],
  VENUE_STAFF: ["DE_ESCALATION", "NIGHTLIFE", "FIRST_AID"],
};
