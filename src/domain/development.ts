import type { DevelopmentProfile } from "bip-kit";
import { z } from "zod";

/**
 * The boundary between the fleet map (someone else's JSON, fetched over the
 * network) and Skif's pages. Nothing from the map is rendered until it has
 * passed these schemas; anything that doesn't is treated exactly like an
 * unreachable map — "unavailable", never a guess.
 */

const optionalText = z.string().nullish();

const milestoneSchema = z.union([z.string(), z.object({ title: z.string(), done: z.boolean() })]);

const roadmapItemSchema = z.object({
  title: z.string().min(1),
  status: optionalText,
  progress: z.number().finite().nullish(),
  targetDate: optionalText,
  milestones: z.array(milestoneSchema),
  source: optionalText,
});

const changelogEntrySchema = z.object({ date: z.string().min(1), done: z.string().min(1) });

/** One product's entry. Fields the pages don't render are ignored, not rejected. */
const projectSchema = z.object({
  slug: z.string(),
  name: z.string().min(1),
  what: optionalText,
  roadmap: z.array(roadmapItemSchema),
  changelog: z.array(changelogEntrySchema),
});

/** The map itself. Other products' entries are only checked for a slug, so a
 * malformed neighbour can't take Skif's pages down with it. */
const mapSchema = z.object({ projects: z.array(z.looseObject({ slug: z.string() })) });

/**
 * The product's one-line description is the first paragraph of the profile's
 * `what`; the rest of that field is the owner's intake notes, written for the
 * agents building the product rather than for a reader of its roadmap.
 */
export function leadParagraph(what: string | null | undefined): string | null {
  const first = what?.split(/\n\s*\n/)[0]?.trim();
  return first ? first : null;
}

/** Validate a fetched map and project `slug`'s entry into what the pages render.
 * `null` means "not usable": malformed map, missing product, or malformed entry. */
export function developmentProfileFrom(map: unknown, slug: string): DevelopmentProfile | null {
  const parsedMap = mapSchema.safeParse(map);
  if (!parsedMap.success) return null;
  const entry = parsedMap.data.projects.find((p) => p.slug === slug);
  const parsed = projectSchema.safeParse(entry);
  if (!parsed.success) return null;
  const p = parsed.data;
  return {
    slug: p.slug,
    name: p.name,
    what: leadParagraph(p.what),
    roadmap: p.roadmap.map((item) => ({
      title: item.title,
      status: item.status ?? null,
      progress: item.progress == null ? null : Math.min(100, Math.max(0, item.progress)),
      targetDate: item.targetDate ?? null,
      milestones: item.milestones,
      source: item.source ?? null,
    })),
    changelog: p.changelog.map((entry) => ({ date: entry.date, done: entry.done })),
  };
}
