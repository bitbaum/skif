import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { englishRewrites } from "./src/i18n/english";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** The commit this build was made from, inlined at build time so /api/health
 * can say what production is serving. The deploy checks out the exact commit
 * it builds, so HEAD is what was compiled; GITHUB_SHA only when there is no
 * .git. Unknown is reported as unknown, never guessed. */
function buildCommit(): string {
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return process.env.GITHUB_SHA ?? "";
  }
}

/** The public site's top-level pages, read from the folders that define them. */
function publicSegments(): string[] {
  return readdirSync(join(process.cwd(), "src", "app", "[locale]", "(public)"), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

const nextConfig: NextConfig = {
  output: "standalone",
  // The blog's markdown is read from disk (src/site/blog.ts), and the box runs
  // .next/standalone/server.js from its own folder: without this the posts are
  // not in the release, and any page rendered on request crashes reading them.
  outputFileTracingIncludes: { "/**": ["./content/blog/**/*"] },
  env: { SKIF_BUILD_COMMIT: buildCommit() },
  // English without a prefix. See src/i18n/english.ts for why this is here and
  // never in the proxy.
  async rewrites() {
    return { beforeFiles: englishRewrites(publicSegments()), afterFiles: [], fallback: [] };
  },
  async headers() {
    // Pages here hold preferences, bookings and incidents: never leak a URL
    // to another site, and never let the app be framed.
    //
    // `same-origin`, not `no-referrer`: both send nothing to another site,
    // but under `no-referrer` a browser sends `Origin: null` with a plain
    // form POST, and Next refuses a Server Action whose origin does not match
    // its host (CSRF protection). Every form failed with JavaScript off.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "same-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
