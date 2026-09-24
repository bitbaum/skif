import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // `server-only` throws outside a React Server Component bundle; server
      // modules are tested directly, so it is a no-op here.
      "server-only": fileURLToPath(new URL("./src/test/server-only-stub.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    testTimeout: 30_000,
    // Setup hooks boot an in-process Postgres (PGlite, WASM) and apply the
    // migration once per test. That is seconds when the machine is quiet and
    // more than the 10s default under load: measured 2026-09-24 at load ~23,
    // the lifecycle suite failed only in `beforeEach` ("Hook timed out in
    // 10000ms") and passed 4/4 with 60s. A timeout here is a setup budget,
    // not a behaviour check, so it must not be the thing that fails CI.
    hookTimeout: 60_000,
  },
});
