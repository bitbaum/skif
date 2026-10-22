import { describe, expect, it } from "vitest";
import { BLOG_POSTS, parsePost, postDate } from "./blog";
import { shareCard } from "./share";

describe("blog", () => {
  it("reads every post, newest first, each with a share card", () => {
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
    for (const [i, p] of BLOG_POSTS.entries()) {
      expect(p.blocks.length, p.slug).toBeGreaterThan(0);
      expect(shareCard(`/blog/${p.slug}`)?.title, p.slug).toBe(p.title);
      if (i > 0) expect(BLOG_POSTS[i - 1].date >= p.date).toBe(true);
    }
  });

  it("carries a table or a picture in every post, never prose alone", () => {
    for (const p of BLOG_POSTS) expect(p.blocks.some((b) => ["table", "mermaid", "figure", "image", "chart"].includes(b.type)), p.slug).toBe(true);
  });

  it("refuses a post with missing or malformed frontmatter", () => {
    expect(() => parsePost("x", "---\ntitle: T\ndate: 2026-10-22\n---\nBody")).toThrow(/summary/);
    expect(() => parsePost("x", "---\ntitle: T\nsummary: S\ndate: 22.10.2026\n---\nBody")).toThrow(/YYYY-MM-DD/);
    expect(() => parsePost("x", "---\ntitle: T\nsummary: S\ndate: 2026-10-22\nphoto: nope\n---\nBody")).toThrow(/photo/);
  });

  it("writes the date in the reader's language", () => {
    expect(postDate("2026-10-22", "de-CH")).toBe("22. Oktober 2026");
    expect(postDate("2026-10-22", "en-GB")).toBe("22 October 2026");
  });
});
