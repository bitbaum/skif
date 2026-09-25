import { afterEach, describe, expect, it, vi } from "vitest";

describe("GET /api/health", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("names the app and the commit it serves, and says when there is no database", async () => {
    vi.stubEnv("SKIF_BUILD_COMMIT", "abc123");
    vi.stubEnv("DATABASE_URL", "");
    const { GET } = await import("./route");
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: false, app: "skif", commit: "abc123", database: "unconfigured" });
  });
});
