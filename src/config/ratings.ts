/**
 * What a customer rates after a booking. Not stars: three plain questions,
 * each answered on a labelled scale, so the answer means something.
 */
export const RATING_DIMENSIONS = [
  { key: "respect", question: "Did your Protector treat you with respect?" },
  { key: "discretion", question: "Were they discreet?" },
  { key: "feltSafe", question: "Did you feel safe?" },
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
