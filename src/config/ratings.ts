/**
 * What a customer rates after a booking. Not stars: plain questions, each
 * answered on a labelled scale, so the answer means something (SPEC §10).
 * An `optional` question may be skipped — judgment is only observable if
 * something tense happened.
 */
export const RATING_DIMENSIONS = [
  { key: "respect", question: "Did your Protector treat you with respect?", optional: false },
  { key: "discretion", question: "Were they discreet?", optional: false },
  { key: "feltSafe", question: "Did you feel safe?", optional: false },
  { key: "professionalism", question: "Were they professional?", optional: false },
  { key: "communication", question: "Did they communicate clearly with you?", optional: false },
  { key: "punctuality", question: "Were they on time and reliable?", optional: false },
  { key: "judgment", question: "If anything tense happened, did they handle it well?", optional: true },
] as const;

export type RatingDimension = (typeof RATING_DIMENSIONS)[number]["key"];

export const RATING_SCALE = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "Barely" },
  { value: 3, label: "Somewhat" },
  { value: 4, label: "Mostly" },
  { value: 5, label: "Completely" },
] as const;

export const RATING_MIN = RATING_SCALE[0].value;
export const RATING_MAX = RATING_SCALE[RATING_SCALE.length - 1].value;

export function ratingLabel(value: number): string {
  return RATING_SCALE.find((s) => s.value === value)?.label ?? String(value);
}

export const RATING_COMMENT_MAX = 1000;
