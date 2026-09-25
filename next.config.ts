import { execSync } from "node:child_process";
import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  output: "standalone",
  env: { SKIF_BUILD_COMMIT: buildCommit() },
  async headers() {
    // Pages here hold preferences, bookings and incidents: never leak a URL
    // to another site, and never let the app be framed.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
