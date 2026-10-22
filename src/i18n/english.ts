/**
 * How English, the default language, is served without a prefix: /act shows
 * /en/act. This is a next.config rewrite, NOT a proxy rewrite, and must stay
 * one.
 *
 * A rewrite returned from the proxy is compared with the server's own origin,
 * and behind Caddy the two never match: the proxy sees https://localhost, the
 * box runs the app as http://127.0.0.1 (HOSTNAME=127.0.0.1). Next then treats
 * the rewrite as an external proxy target, dials TLS at a plain-http socket
 * and answers 500 (EPROTO). On 2026-10-22 that took down every English page
 * for a day while /de, /fr and /it worked — and nothing local catches it,
 * because nothing local sits behind https. heidi's middleware.ts records the
 * same outage. A config rewrite is resolved inside the router: no URL is
 * rebuilt and no protocol is guessed.
 *
 * Pure, so next.config.ts and the tests share it.
 */
export type Rewrite = { source: string; destination: string };

/** One rewrite per public top-level segment (the folders in
 * src/app/[locale]/(public)), plus the home page. An address outside them is
 * left alone and renders the 404 page. */
export function englishRewrites(segments: readonly string[]): Rewrite[] {
  const list = [...segments].filter((s) => /^[a-z][a-z0-9-]*$/.test(s)).sort();
  if (list.length === 0) return [{ source: "/", destination: "/en" }];
  const one = list.join("|");
  return [
    { source: "/", destination: "/en" },
    { source: `/:segment(${one})`, destination: "/en/:segment" },
    { source: `/:segment(${one})/:rest*`, destination: "/en/:segment/:rest*" },
  ];
}
