import { afterEach, describe, expect, it, vi } from "vitest";
import { AI_MESSAGES } from "@/config/ai";
import { aiChain, aiStatus, modelCaller } from "./ai";

const ASK = { system: "Reply with JSON.", prompt: "Fill the form.", maxTokens: 500, temperature: 0.3 };

function answer(content: string, status = 200) {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("the model chain", () => {
  afterEach(() => vi.restoreAllMocks());

  it("is unconfigured with no key, and uses only vendors whose key is set", () => {
    expect(aiStatus({})).toBe("unconfigured");
    expect(aiStatus({ GROQ_API_KEY: "k" })).toBe("configured");
    const vendors = new Set(aiChain({ OPENROUTER_API_KEY: "k" }).map((l) => l.provider.id));
    expect([...vendors]).toEqual(["openrouter"]);
  });

  it("returns the model's text, sending the key only to its own vendor", async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => answer('{"values":{}}'));
    const text = await modelCaller({ env: { GROQ_API_KEY: "secret-groq" }, fetchImpl })(ASK);
    expect(text).toBe('{"values":{}}');
    const [url, init] = fetchImpl.mock.calls[0];
    expect(String(url)).toContain("api.groq.com");
    expect(JSON.stringify(init?.headers)).toContain("secret-groq");
  });

  it("falls back past a failing link, then says so in words when none answer", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn<typeof fetch>(async () => answer("", 200));
    const call = modelCaller({ env: { GROQ_API_KEY: "k" }, fetchImpl })(ASK);
    await expect(call).rejects.toThrow(AI_MESSAGES.failed);
    // An empty 200 is a failure, so every Groq link was tried before giving up.
    expect(fetchImpl.mock.calls.length).toBe(aiChain({ GROQ_API_KEY: "k" }).length);
  });

  it("never calls out when no key is set", async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    await expect(modelCaller({ env: {}, fetchImpl })(ASK)).rejects.toThrow(AI_MESSAGES.unconfigured);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
