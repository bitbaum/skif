import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = join(__dirname, "..", "..");

function tsx(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? tsx(path) : path.endsWith(".tsx") ? [path] : [];
  });
}

/** One shape per kind (shell.ts): a card is CARD, a framed section PANEL.
 * Retyping either, or the old signed-in card, is how two looks crept in. */
const RETYPED = [/rounded-card border border-subtle bg-surface-raised/, /rounded-card border border-line bg-surface\b/, /rounded-card border border-line bg-bg/];

describe("one shape per kind", () => {
  it("draws every card and framed section from shell.ts, never retyped", () => {
    const offenders = tsx(SRC).flatMap((f) => RETYPED.filter((re) => re.test(readFileSync(f, "utf8"))).map((re) => `${f.slice(SRC.length)}: ${re.source}`));
    expect(offenders).toEqual([]);
  });
});
