import { HARM_FAMILIES } from "@/config/harm-families";
import { WHOLE_LIFE } from "@/config/landing";
import { SectionHeading } from "./section-heading";

/** Renders the families of harm from their SSOT — never retyped here. */
export function WholeLife() {
  return (
    <section aria-labelledby="whole-life-title" className="section-y border-y border-line bg-surface">
      <div className="section-shell">
        <SectionHeading id="whole-life-title" {...WHOLE_LIFE} />
        <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5">
          {HARM_FAMILIES.map((f) => (
            <li key={f.key} className="border-b border-line py-5 lg:pr-4">
              <h3 className="mb-1 font-semibold text-ink">{f.label}</h3>
              <p className="text-sm text-muted">{f.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
