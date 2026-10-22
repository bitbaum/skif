import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isUnlocalizedPath, localizedPath, UNLOCALIZED_SEGMENTS, unlocalizedPath } from "./locales";

describe("language routing", () => {
  it("prefixes every language but English, and strips it again", () => {
    expect(localizedPath("/act", "en")).toBe("/act");
    expect(localizedPath("/act", "de")).toBe("/de/act");
    expect(localizedPath("/", "fr")).toBe("/fr");
    expect(unlocalizedPath("/it/guides/driving")).toBe("/guides/driving");
    expect(unlocalizedPath("/de")).toBe("/");
    expect(unlocalizedPath("/design")).toBe("/design");
    expect(unlocalizedPath("/en/safety/privacy")).toBe("/safety/privacy");
    expect(unlocalizedPath("/english")).toBe("/english");
  });

  it("leaves the signed-in pages, the API and share pictures to themselves", () => {
    // The proxy's matcher must be a literal, so read it as text.
    const proxy = readFileSync(join(__dirname, "..", "proxy.ts"), "utf8");
    const skipped = new Set(proxy.match(/\(\?!([^)]*)\)/)?.[1].split("|") ?? []);
    for (const seg of UNLOCALIZED_SEGMENTS) {
      expect(skipped.has(seg), seg).toBe(true);
      expect(isUnlocalizedPath(`/${seg}/x`), seg).toBe(true);
    }
    expect(isUnlocalizedPath("/act")).toBe(false);
  });
});
