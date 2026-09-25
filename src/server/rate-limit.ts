import "server-only";
import { clientIp, slidingWindow, type Limiter, type LimitResult } from "limitkit";
import { headers } from "next/headers";
import { RATE_LIMITS, type RateLimited } from "@/config/rate-limits";
import { fail, ok, type Result } from "@/domain/result";

/** One limiter per action, per process (limitkit's bounded memory store). The
 * app runs as one process on the box, so the limit is the configured one. */
const limiters = Object.fromEntries(
  Object.entries(RATE_LIMITS).map(([name, rule]) => [name, slidingWindow(rule)]),
) as Record<RateLimited, Limiter>;

/** Whole minutes until the window opens again, at least one. */
export function retryMinutes(result: Pick<LimitResult, "retryAfterSeconds">): number {
  return Math.max(1, Math.ceil(result.retryAfterSeconds / 60));
}

export function refusalMessage(minutes: number): string {
  return `Too many attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
}

/** Count one attempt at `action`, keyed on who is asking: the signed-in
 * person, or — for sign-in — the client IP as the proxy saw it (limitkit reads
 * the last X-Forwarded-For hop, the one a client cannot forge). */
export async function checkRateLimit(action: RateLimited, sub?: string, now = Date.now()): Promise<Result<null>> {
  const minutes = await retryAfter(action, sub, now);
  return minutes === 0 ? ok(null) : fail(refusalMessage(minutes));
}

/** As checkRateLimit, but the minutes to wait (0 when allowed) — for a caller
 * that must carry the refusal through a redirect. */
export async function retryAfter(action: RateLimited, sub?: string, now = Date.now()): Promise<number> {
  const rule = RATE_LIMITS[action];
  const who = rule.per === "person" && sub ? `sub:${sub}` : `ip:${clientIp(await headers())}`;
  const result = limiters[action].check(`${action}:${who}`, now);
  return result.allowed ? 0 : retryMinutes(result);
}
