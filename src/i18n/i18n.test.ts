import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { englishRewrites } from "./english";
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

  it("serves English through next.config rewrites, never a rewrite from the proxy", () => {
    // A proxy rewrite fails behind the box's reverse proxy (src/i18n/english.ts).
    const proxy = readFileSync(join(__dirname, "..", "proxy.ts"), "utf8");
    expect(proxy).not.toMatch(/NextResponse\.rewrite|x-middleware-rewrite/);
    const config = readFileSync(join(__dirname, "..", "..", "next.config.ts"), "utf8");
    expect(config).toMatch(/englishRewrites\(/);

    const pub = readdirSync(join(__dirname, "..", "app", "[locale]", "(public)"), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    const rewrites = englishRewrites(pub);
    expect(rewrites[0]).toEqual({ source: "/", destination: "/en" });
    for (const seg of ["act", "blog", "emergency", "signin", "guides"]) expect(rewrites[1].source, seg).toMatch(new RegExp(`[(|]${seg}[|)]`));
    for (const seg of UNLOCALIZED_SEGMENTS) expect(rewrites[1].source, seg).not.toMatch(new RegExp(`[(|]${seg}[|)]`));
  });
});
