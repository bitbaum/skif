/**
 * How often each abuse-prone action may run (the numbers are Skif's; the
 * algorithm is limitkit's). Sign-in has no identity yet, so it is counted per
 * client IP; the rest are counted per signed-in person, so people sharing one
 * NAT never use up each other's allowance.
 */
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

export const RATE_LIMITS = {
  SIGN_IN: { limit: 10, windowMs: 15 * MINUTE, per: "ip" },
  BOOKING: { limit: 10, windowMs: HOUR, per: "person" },
  COMPLAINT: { limit: 5, windowMs: HOUR, per: "person" },
  APPLY: { limit: 5, windowMs: 24 * HOUR, per: "person" },
  // Each call spends a share of a free model tier the whole app lives on.
  FORM_ASSIST: { limit: 20, windowMs: HOUR, per: "person" },
} as const satisfies Record<string, { limit: number; windowMs: number; per: "ip" | "person" }>;

export type RateLimited = keyof typeof RATE_LIMITS;
