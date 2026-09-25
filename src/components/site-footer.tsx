import Link from "next/link";

/** On every page: where Skif is going and what has changed, plus the honest
 * release state (fleet rule — nothing is "live"; everything is beta). */
export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-6 text-sm text-muted">
      <span>Beta — running, not released</span>
      <nav aria-label="Development" className="flex gap-x-5">
        <Link href="/roadmap" className="inline-flex min-h-11 items-center underline hover:text-ink">
          Roadmap
        </Link>
        <Link href="/changelog" className="inline-flex min-h-11 items-center underline hover:text-ink">
          Changelog
        </Link>
      </nav>
    </footer>
  );
}
