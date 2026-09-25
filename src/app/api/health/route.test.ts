import { afterEach, describe, expect, it, vi } from "vitest";

const MODEL_KEYS = ["GROQ_API_KEY", "GEMINI_API_KEY", "OPENROUTER_API_KEY"];

describe("GET /api/health", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("names the app and the commit it serves, and says when there is no database, mail or model", async () => {
    vi.stubEnv("SKIF_BUILD_COMMIT", "abc123");
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("RESEND_API_KEY", "");
    for (const key of MODEL_KEYS) vi.stubEnv(key, "");
    const { GET } = await import("./route");
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: false,
      app: "skif",
      commit: "abc123",
      database: "unconfigured",
      mail: "unconfigured",
      ai: "unconfigured",
    });
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

  it("reports a configured model from the environment alone, without calling out", async () => {
    vi.stubEnv("DATABASE_URL", "");
    for (const key of MODEL_KEYS) vi.stubEnv(key, "");
    vi.stubEnv("GROQ_API_KEY", "set");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { GET } = await import("./route");
    expect((await (await GET()).json()).ai).toBe("configured");
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
