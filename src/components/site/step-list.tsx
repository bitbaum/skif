import { costLabel } from "@/config/assessment";
import { kindLabel, levelText, needsPurchase, providerOf, type Intervention } from "@/config/interventions";
import { providerLabel } from "@/config/providers";
import { Meter } from "./meter";

/** What a step takes, in words: "Something you do", or who delivers it. */
function takes(i: Intervention): string {
  const provider = providerOf(i);
  return provider && i.kind !== "PROTECTOR" ? providerLabel(provider) : kindLabel(i.kind);
}

/**
 * Steps as cards: the step, who does it, what it costs in money, and what it
 * costs in privacy and freedom on the Method page's scale. Free steps carry a
 * mark, because "you can do this today, for nothing" is the most useful thing
 * a reader can learn from the list.
 */
export function StepList({ steps }: { steps: readonly Intervention[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {steps.map((i) => {
        const free = i.cost === "FREE" && !needsPurchase(i.kind);
        return (
          <li key={i.key} className="flex flex-col rounded-card border border-subtle bg-surface-raised p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded-full px-2.5 py-1 font-medium ${free ? "bg-accent-soft text-accent" : "border border-subtle text-fg-secondary"}`}>
                {i.cost === "FREE" ? "Free" : costLabel(i.cost)}
              </span>
              <span className="text-fg-tertiary">{takes(i)}</span>
            </div>
            <p className="mt-3 flex-1 leading-relaxed text-fg-primary">{i.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-tertiary">{i.tradeoffs}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-subtle pt-3">
              <Meter label="Privacy cost" value={i.privacyImpact} />
              <Meter label="Freedom cost" value={i.autonomyImpact} />
              <span className="text-xs text-fg-tertiary">
                Benefit <span className="text-fg-secondary">{levelText(i.benefit).toLowerCase()}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
