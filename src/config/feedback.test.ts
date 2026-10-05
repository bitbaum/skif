import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Where the Loki widget may load inside the signed-in app (src/config/feedback.ts):
 * the person's own pages, by their layout, and never under /ops.
 */
const APP = join(__dirname, "..", "app", "(app)");
const OWN_PAGES = ["preferences", "bookings", "assessments", "protector"];
const WIDGET_IMPORT = /@\/components\/(loki-watch|feedback-widget)"/;

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

describe("Loki widget in the app", () => {
  it("covers every section of the app: the person's own pages, or Operations", () => {
    const sections = readdirSync(APP).filter((name) => statSync(join(APP, name)).isDirectory());
    expect(sections.sort()).toEqual([...OWN_PAGES, "ops"].sort());
  });

  it("is mounted by the layout of each of the person's own pages", () => {
    for (const section of OWN_PAGES) {
      expect(readFileSync(join(APP, section, "layout.tsx"), "utf8"), section).toMatch(/WithLokiWatch/);
    }
  });

  it("never loads under /ops, whose layout drops it after a client-side navigation", () => {
    const ops = join(APP, "ops");
    for (const file of filesUnder(ops)) expect(readFileSync(file, "utf8"), file).not.toMatch(WIDGET_IMPORT);
    expect(readFileSync(join(ops, "layout.tsx"), "utf8")).toMatch(/<NoFeedbackWidget \/>/);
  });

  it("is not in the app-wide layout, which wraps /ops too", () => {
    expect(readFileSync(join(APP, "layout.tsx"), "utf8")).not.toMatch(WIDGET_IMPORT);
  });
});
