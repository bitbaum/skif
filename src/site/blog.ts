/**
 * Skif's blog: markdown in content/blog/<slug>.md, parsed by bip-kit into
 * typed blocks. Every post is read once, when the site is built.
 *
 * Frontmatter: title, summary, date (YYYY-MM-DD), optional photo (a key of
 * PHOTOS). A post missing any of the first three fails the build rather than
 * vanish quietly — blog.test.ts reads every file.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseContentBlocks, parseFrontmatter, readingTime, type ContentBlock } from "bip-kit";
import { PHOTOS, type PhotoKey } from "@/config/photos";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  photo?: PhotoKey;
  minutes: number;
  blocks: ContentBlock[];
};

const DIR = join(/* turbopackIgnore: true */ process.cwd(), "content", "blog");

function isPhoto(key: unknown): key is PhotoKey {
  return typeof key === "string" && key in PHOTOS;
}

export function parsePost(slug: string, raw: string): BlogPost {
  const { meta, body } = parseFrontmatter(raw);
  const field = (k: string): string => {
    const v = meta[k];
    if (typeof v !== "string" || !v.trim()) throw new Error(`content/blog/${slug}.md: frontmatter needs "${k}"`);
    return v.trim();
  };
  const date = field("date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`content/blog/${slug}.md: date must be YYYY-MM-DD`);
  if (meta.photo !== undefined && !isPhoto(meta.photo)) throw new Error(`content/blog/${slug}.md: unknown photo "${String(meta.photo)}"`);
  const blocks = parseContentBlocks(body);
  return {
    slug,
    title: field("title"),
    summary: field("summary"),
    date,
    photo: isPhoto(meta.photo) ? meta.photo : undefined,
    minutes: readingTime(blocks).minutes,
    blocks,
  };
}

/** Newest first. */
export const BLOG_POSTS: readonly BlogPost[] = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parsePost(f.slice(0, -3), readFileSync(join(DIR, f), "utf8")))
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** "22 October 2026", in the reader's language. */
export function postDate(date: string, localeTag: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(localeTag, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
