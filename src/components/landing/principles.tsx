import { PRINCIPLES } from "@/config/landing";
import { SectionHeading } from "./section-heading";

export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="section-y border-t border-line bg-surface">
      <div className="section-shell">
        <SectionHeading id="principles-title" eyebrow={PRINCIPLES.eyebrow} title={PRINCIPLES.title} />
        <ul className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PRINCIPLES.items.map((p) => (
            <li key={p.title} className="max-w-copy">
              <h3 className="mb-2 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
