import Link from "next/link";
import { FOOTER, FOOTER_LINKS, STAGE } from "@/config/landing";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="section-shell flex flex-col gap-6 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-lede space-y-2">
          <p className="wordmark text-ink">Skif</p>
          <p className="text-sm text-muted">{FOOTER.tagline}</p>
          <p className="text-sm text-muted">
            {FOOTER.place} · {STAGE}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {FOOTER_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-muted hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
