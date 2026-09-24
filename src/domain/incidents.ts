/** How Operations works through an incident (SPEC §11, §22). */
export const INCIDENT_REVIEW_STATUSES = ["OPEN", "UNDER_REVIEW", "RESOLVED"] as const;
export type IncidentReviewStatus = (typeof INCIDENT_REVIEW_STATUSES)[number];

const MOVES: Record<IncidentReviewStatus, readonly IncidentReviewStatus[]> = {
  OPEN: ["UNDER_REVIEW", "RESOLVED"],
  UNDER_REVIEW: ["RESOLVED"],
  RESOLVED: [],
};

export function mayReview(from: IncidentReviewStatus, to: IncidentReviewStatus): boolean {
  return MOVES[from].includes(to);
}

export function reviewMoves(from: IncidentReviewStatus): readonly IncidentReviewStatus[] {
  return MOVES[from];
}

export const REVIEW_LABELS: Record<IncidentReviewStatus, string> = {
  OPEN: "Open",
  UNDER_REVIEW: "Under review",
  RESOLVED: "Resolved",
};
