import "server-only";
import type { DevelopmentProfile } from "bip-kit";
import { DEVELOPMENT_SOURCE } from "@/config/development";
import { developmentProfileFrom } from "@/domain/development";

type Fetcher = (input: string, init: RequestInit & { next?: { revalidate?: number } }) => Promise<Response>;

/**
 * Skif's roadmap and changelog, read from the fleet map at request time.
 *
 * The response is reused for `revalidateSeconds`, so a page view is not a call
 * to Loki. Any failure — network, timeout, non-2xx, bad JSON, a payload that
 * fails validation — returns `null`, which the page renders as "unavailable".
 * There is no stored fallback: an old or invented roadmap would be a claim.
 */
export async function loadDevelopment(fetcher: Fetcher = fetch): Promise<DevelopmentProfile | null> {
  const { mapUrl, slug, revalidateSeconds, timeoutMs } = DEVELOPMENT_SOURCE;
  try {
    const response = await fetcher(mapUrl, {
      headers: { accept: "application/json" },
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) return null;
    return developmentProfileFrom(await response.json(), slug);
  } catch {
    return null;
  }
}
