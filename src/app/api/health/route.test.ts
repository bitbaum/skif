import { afterEach, describe, expect, it, vi } from "vitest";

describe("GET /api/health", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("names the app and the commit it serves, and says when there is no database", async () => {
    vi.stubEnv("SKIF_BUILD_COMMIT", "abc123");
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("RESEND_API_KEY", "");
    const { GET } = await import("./route");
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: false, app: "skif", commit: "abc123", database: "unconfigured", mail: "unconfigured" });
  });

  it("says mail is configured only with a Resend key and an Ops address, without touching the network", async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("RESEND_API_KEY", "re_live_key");
    vi.stubEnv("SKIF_OPS_EMAIL", "ops@example.org");
    const { GET } = await import("./route");
    expect((await (await GET()).json()).mail).toBe("configured");
    vi.stubEnv("SKIF_OPS_EMAIL", "");
    expect((await (await GET()).json()).mail).toBe("unconfigured");
  });
});
