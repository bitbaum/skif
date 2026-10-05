import { describe, expect, it } from "vitest";
import nextConfig from "./next.config";

async function header(key: string): Promise<string | undefined> {
  const rules = (await nextConfig.headers?.()) ?? [];
  return rules.find((r) => r.source === "/:path*")?.headers.find((h) => h.key === key)?.value;
}

describe("security headers", () => {
  it("never sends a URL to another site, yet lets a same-origin form post carry its origin", async () => {
    // `no-referrer` would also keep URLs on site, but makes browsers send
    // `Origin: null` with a plain form POST, which Next's CSRF check refuses:
    // every form then failed with JavaScript off.
    expect(await header("Referrer-Policy")).toBe("same-origin");
  });

  it("never lets the app be framed", async () => {
    expect(await header("X-Frame-Options")).toBe("DENY");
  });
});
