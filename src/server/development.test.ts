import { describe, expect, it, vi } from "vitest";
import { DEVELOPMENT_SOURCE } from "@/config/development";
import { loadDevelopment } from "./development";

const entry = { slug: "skif", name: "Skif", what: null, roadmap: [], changelog: [{ date: "2026-09-24", done: "v1" }] };

describe("loadDevelopment", () => {
  it("reads the fleet map with a revalidating cache and a timeout", async () => {
    const fetcher = vi.fn(async () => Response.json({ projects: [entry] }));
    const profile = await loadDevelopment(fetcher);
    expect(profile?.changelog).toEqual([{ date: "2026-09-24", done: "v1" }]);
    expect(fetcher).toHaveBeenCalledWith(
      DEVELOPMENT_SOURCE.mapUrl,
      expect.objectContaining({
        next: { revalidate: DEVELOPMENT_SOURCE.revalidateSeconds },
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("says unavailable (null) when Loki is unreachable", async () => {
    expect(await loadDevelopment(async () => Promise.reject(new TypeError("fetch failed")))).toBeNull();
  });

  it("says unavailable (null) on an error status", async () => {
    expect(await loadDevelopment(async () => new Response("down", { status: 503 }))).toBeNull();
  });

  it("says unavailable (null) when the body is not JSON", async () => {
    expect(await loadDevelopment(async () => new Response("<html>"))).toBeNull();
  });

  it("says unavailable (null) when the payload fails validation", async () => {
    expect(await loadDevelopment(async () => Response.json({ projects: [{ ...entry, changelog: "x" }] }))).toBeNull();
  });
});
