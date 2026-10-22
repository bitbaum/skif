import { expect } from "vitest";

const citations = (s: string) => [...s.matchAll(/\[(\d+)\]/g)].map((m) => m[1]).sort().join(",");

/**
 * Walk an English text structure and its translation together: same keys and
 * array lengths everywhere, `same` keys identical (structure: slugs, anchors,
 * links, sources), every string non-empty, every [n] citation kept in the
 * same string. Used for every translated guide, page and article.
 */
export function expectSameShape(en: unknown, tr: unknown, path: string, same: ReadonlySet<string>, key = ""): void {
  if (same.has(key)) {
    expect(tr, path).toEqual(en);
    return;
  }
  if (typeof en === "string") {
    expect(typeof tr, path).toBe("string");
    expect((tr as string).trim().length, path).toBeGreaterThan(0);
    expect(citations(tr as string), `${path} citations`).toBe(citations(en));
    return;
  }
  if (Array.isArray(en)) {
    expect(Array.isArray(tr), path).toBe(true);
    expect((tr as unknown[]).length, path).toBe(en.length);
    en.forEach((v, i) => expectSameShape(v, (tr as unknown[])[i], `${path}[${i}]`, same, key));
    return;
  }
  if (en && typeof en === "object") {
    expect(tr && typeof tr === "object", path).toBe(true);
    expect(Object.keys(tr as object).sort(), path).toEqual(Object.keys(en).sort());
    for (const [k, v] of Object.entries(en)) expectSameShape(v, (tr as Record<string, unknown>)[k], `${path}.${k}`, same, k);
    return;
  }
  expect(tr, path).toEqual(en);
}
