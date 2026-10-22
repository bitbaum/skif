import { describe, expect, it } from "vitest";
import { LANGUAGES, LANGUAGES_SHOWN } from "./constraints";

describe("languages", () => {
  it("lists each language once, with the folded ones last so `more` folds exactly them", () => {
    expect(new Set(LANGUAGES.map((l) => l.key)).size).toBe(LANGUAGES.length);
    LANGUAGES.forEach((l, i) => expect("folded" in l, l.key).toBe(i >= LANGUAGES_SHOWN));
  });

  it("shows Switzerland's languages and English without unfolding", () => {
    const shown = LANGUAGES.slice(0, LANGUAGES_SHOWN).map((l) => l.key);
    for (const k of ["en", "de", "gsw", "fr", "it", "rm"]) expect(shown).toContain(k);
  });
});
