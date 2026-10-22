import { describe, expect, it } from "vitest";
import { heardNothing, speechChain, speechConfigured } from "./speech";

describe("speech", () => {
  it("is on only with a Groq key, and walks Whisper models only", () => {
    expect(speechConfigured({})).toBe(false);
    expect(speechConfigured({ GROQ_API_KEY: "  " })).toBe(false);
    expect(speechConfigured({ GROQ_API_KEY: "gsk_x" })).toBe(true);
    expect(speechChain().map((l) => l.model)).toEqual(["whisper-large-v3-turbo", "whisper-large-v3"]);
  });

  it("treats Whisper's silence captions as nothing said, and real words as words", () => {
    for (const t of ["", "  ", "Thank you.", "Untertitel im Auftrag des ZDF, 2017", "Merci."]) expect(heardNothing(t), t).toBe(true);
    expect(heardNothing("Eight years in event security, first-aid certified.")).toBe(false);
  });
});
