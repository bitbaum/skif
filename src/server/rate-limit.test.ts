import { beforeEach, describe, expect, it, vi } from "vitest";
import { RATE_LIMITS } from "@/config/rate-limits";

let forwarded = "";
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": forwarded }),
}));

const { checkRateLimit, retryAfter, retryMinutes } = await import("./rate-limit");

describe("rate limits", () => {
  beforeEach(() => {
    forwarded = "";
  });

  it("refuses a person past their allowance, with an honest wait, and not someone else", async () => {
    const now = 1_000_000;
    for (let i = 0; i < RATE_LIMITS.BOOKING.limit; i++) {
      expect((await checkRateLimit("BOOKING", "oc-a", now)).success).toBe(true);
    }
    expect(await checkRateLimit("BOOKING", "oc-a", now)).toEqual({
      success: false,
      error: "Too many attempts. Please try again in 60 minutes.",
    });
    expect((await checkRateLimit("BOOKING", "oc-b", now)).success).toBe(true);
    expect((await checkRateLimit("BOOKING", "oc-a", now + RATE_LIMITS.BOOKING.windowMs)).success).toBe(true);
  });

  it("keys sign-in on the proxy's hop, so a forged first hop buys no fresh bucket", async () => {
    const now = 5_000_000;
    for (let i = 0; i < RATE_LIMITS.SIGN_IN.limit; i++) {
      forwarded = `10.0.0.${i}, 203.0.113.7`;
      expect(await retryAfter("SIGN_IN", undefined, now)).toBe(0);
    }
    forwarded = "198.51.100.1, 203.0.113.7";
    expect(await retryAfter("SIGN_IN", undefined, now)).toBe(15);
    forwarded = "203.0.113.8";
    expect(await retryAfter("SIGN_IN", undefined, now)).toBe(0);
  });

  it("never asks anyone to wait less than a minute", () => {
    expect(retryMinutes({ retryAfterSeconds: 1 })).toBe(1);
  });
});
