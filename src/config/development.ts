/**
 * Where Skif's public roadmap and changelog come from.
 *
 * Fleet rule ("The identity contract", bitbaum/fleet AGENTS.md): a product site
 * RENDERS its roadmap and changelog, it does not author them. The producer is
 * Skif's Loki project profile — the roadmap is its goals, the changelog its dev
 * log — published on the fleet map. There is deliberately no local copy here to
 * fall back on: when the map is unreachable, the pages say so.
 */
export const DEVELOPMENT_SOURCE = {
  /** The public fleet map: `{ projects: [...] }`, one entry per product. */
  mapUrl: "https://loki.orangecat.ch/api/fleet/map",
  /** Skif's entry on the map (joined by repo slug). */
  slug: "skif",
  /** Human-readable view of the same records, linked from both pages. */
  profileUrl: "https://loki.orangecat.ch/fleet",
  /** How long a fetched map is reused before Loki is asked again. */
  revalidateSeconds: 300,
  /** Give up on Loki after this long and say the records are unavailable. */
  timeoutMs: 8_000,
} as const;

/** Page copy passed to bip-kit's renderer (its defaults, with Skif's link names). */
export const DEVELOPMENT_LABELS = {
  home: "Back to Skif",
  profile: "Fleet development map",
} as const;
