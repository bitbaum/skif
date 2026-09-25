import { describe, expect, it, vi } from "vitest";
import type { CompleteFn } from "@bitbaum/ai-kit/forms";
import { AI_MESSAGES } from "@/config/ai";
import { AI_FORMS, PROTECTOR_APPLICATION_FORM } from "@/config/ai-forms";
import { capabilityFieldName } from "@/config/capabilities";
import { fail, ok } from "@/domain/result";
import { formAssistHandler, type FormAssistDeps } from "./form-assist";

const TARGET = PROTECTOR_APPLICATION_FORM.key;

function setup(overrides: Partial<FormAssistDeps> = {}, reply = "") {
  const complete = vi.fn<CompleteFn>(async () => reply);
  const limit = vi.fn(async () => ok(null));
  const handler = formAssistHandler({
    signedIn: async () => "oc-protector",
    configured: () => true,
    limit,
    complete,
    ...overrides,
  });
  const post = (body: unknown) =>
    handler(new Request("http://skif.test/api/ai/form-assist", { method: "POST", body: JSON.stringify(body) }));
  return { complete, limit, post };
}

const FILL = {
  target: TARGET,
  intent: "fill",
  instruction: "Eight years in event security, first aid certified, I speak German and English.",
};

describe("the form-assist route", () => {
  it("is registered for the Protector's own application and nothing else", () => {
    // Location and incident data must not leave Skif, and a model must never
    // match or judge people: no booking, assessment, report or complaint form.
    expect(AI_FORMS.map((f) => f.key)).toEqual(["protector-application"]);
  });

  it("refuses someone who is not signed in before any model is asked", async () => {
    const { complete, limit, post } = setup({ signedIn: async () => null });
    const res = await post(FILL);
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ ok: false, error: AI_MESSAGES.signIn });
    expect(complete).not.toHaveBeenCalled();
    expect(limit).not.toHaveBeenCalled();
  });

  it("says in words when no model is configured, without spending the person's allowance", async () => {
    const { complete, limit, post } = setup({ configured: () => false });
    const res = await post(FILL);
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe(AI_MESSAGES.unconfigured);
    expect(limit).not.toHaveBeenCalled();
    expect(complete).not.toHaveBeenCalled();
  });

  it("is rate-limited per person", async () => {
    const { complete, post } = setup({ limit: async () => fail("Too many attempts. Please try again in 5 minutes.") });
    const res = await post(FILL);
    expect(res.status).toBe(429);
    expect((await res.json()).error).toMatch(/Too many attempts/);
    expect(complete).not.toHaveBeenCalled();
  });

  it("fills only declared fields and options from the model's reply", async () => {
    const reply = JSON.stringify({
      values: {
        bio: "I keep things calm.",
        languages: ["de", "en", "klingon"],
        experienceYears: 8,
        [capabilityFieldName("EVENT_SECURITY", "level")]: "PROFICIENT",
        [capabilityFieldName("FIRST_AID", "certification")]: "INVENTED-123",
        status: "APPROVED",
      },
      message: "Filled from your description.",
    });
    const { post } = setup({}, reply);
    const res = await post(FILL);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.values.languages).toEqual(["de", "en"]);
    expect(body.values.experienceYears).toBe(8);
    expect(body.values[capabilityFieldName("EVENT_SECURITY", "level")]).toBe("PROFICIENT");
    // Certificates are typed by the person from a document, never by a model;
    // and a model cannot approve anyone.
    expect(body.values).not.toHaveProperty(capabilityFieldName("FIRST_AID", "certification"));
    expect(body.values).not.toHaveProperty("status");
  });

  it("sends a model only the form's own fields — never page text or undeclared values", async () => {
    const { complete, post } = setup({}, JSON.stringify({ values: { bio: "Calm." }, message: "ok" }));
    await post({
      ...FILL,
      values: { bio: "", area: "Seefeld, Zürich", meetingPoint: "Bellevue" },
      pageContext: "Booking at Bellevue 22:00, incident reported",
      history: [{ role: "user", text: "hi", location: "Langstrasse" }],
    });
    expect(complete).toHaveBeenCalledOnce();
    const sent = JSON.stringify(complete.mock.calls[0][0]);
    for (const leak of ["Seefeld", "Bellevue", "incident reported", "Langstrasse", "meetingPoint"]) {
      expect(sent).not.toContain(leak);
    }
  });

  it("rejects a form that is not registered, without asking a model", async () => {
    const { complete, post } = setup();
    const res = await post({ ...FILL, target: "booking" });
    expect(res.ok).toBe(false);
    expect(complete).not.toHaveBeenCalled();
  });

  it("passes the model caller's own sentence through when no model answers", async () => {
    const { post } = setup({
      complete: async () => {
        throw new Error(AI_MESSAGES.failed);
      },
    });
    const res = await post(FILL);
    expect(res.ok).toBe(false);
    expect((await res.json()).error).toBe(AI_MESSAGES.failed);
  });
});
