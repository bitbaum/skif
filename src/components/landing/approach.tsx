import { APPROACH } from "@/config/landing";
import { SectionHeading } from "./section-heading";

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="section-y">
      <div className="section-shell">
        <SectionHeading id="approach-title" eyebrow={APPROACH.eyebrow} title={APPROACH.title} />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-accent pt-5">
              <p className="tabular mb-2 text-sm font-medium text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-2 text-xl font-semibold text-ink">{step.title}</h3>
              <p className="text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <aside className="mt-12 rounded-card border border-line bg-accent-soft p-6 sm:p-10">
          <p className="font-display text-section text-ink">{APPROACH.nothingToBuy.title}</p>
          <p className="mt-4 max-w-lede text-lg text-muted">{APPROACH.nothingToBuy.body}</p>
        </aside>
      </div>
    </section>
  );
}
