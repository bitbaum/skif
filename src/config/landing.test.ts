import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DOORS, FOOTER_LINKS, HEADER_LINKS, PROTECTOR_INVITE, SIGN_IN } from "./landing";

/** Every link on the landing page must reach a page that exists. */
function pageExists(href: string): boolean {
  const app = join(__dirname, "..", "app");
  return [join(app, href, "page.tsx"), join(app, "(app)", href, "page.tsx")].some(existsSync);
}

describe("landing config", () => {
  it("offers the doctrine's three doors", () => {
    expect(DOORS.map((d) => d.title)).toEqual([
      "I need someone with me",
      "I'm concerned about my safety",
      "I run a venue or event",
    ]);
  });

  it("links only to pages that exist", () => {
    const hrefs = [
      ...DOORS.flatMap((d) => [d.cta.href, ...(d.secondary ? [d.secondary.href] : [])]),
      ...FOOTER_LINKS.map((l) => l.href),
      ...HEADER_LINKS.map((l) => l.href),
      PROTECTOR_INVITE.cta.href,
      SIGN_IN.href,
    ];
    for (const href of hrefs) expect(pageExists(href), href).toBe(true);
  });
});
