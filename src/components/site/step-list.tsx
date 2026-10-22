import { needsPurchase, providerOf, type Intervention } from "@/config/interventions";
import { wordsFor } from "@/config/text";
import { costText, kindText, levelWord, stepText } from "@/config/text/assessment";
import type { Locale } from "@/i18n/locales";
import { Meter } from "./meter";
import { CARD } from "./shell";

/** What a step takes, in words: "Something you do", or who delivers it. */
function takes(i: Intervention, locale: Locale): string {
  const provider = providerOf(i);
  const providers: Record<string, string> = wordsFor(locale).steps.providers;
  return provider && i.kind !== "PROTECTOR" ? (providers[provider] ?? provider) : kindText(i.kind, locale);
}

/**
 * Steps as cards: the step, who does it, what it costs in money, and what it
 * costs in privacy and freedom on the Method page's scale. Free steps carry a
 * mark, because "you can do this today, for nothing" is the most useful thing
 * a reader can learn from the list.
 */
export function StepList({ steps, locale }: { steps: readonly Intervention[]; locale: Locale }) {
  const t = wordsFor(locale).steps;
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {steps.map((i) => {
        const free = i.cost === "FREE" && !needsPurchase(i.kind);
        const text = stepText(i, locale);
        return (
          <li key={i.key} className={`flex flex-col ${CARD} p-5`}>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded-full px-2.5 py-1 font-medium ${free ? "bg-accent-soft text-accent" : "border border-subtle text-fg-secondary"}`}>
                {i.cost === "FREE" ? t.free : costText(i.cost, locale)}
              </span>
              <span className="text-fg-tertiary">{takes(i, locale)}</span>
            </div>
            <p className="mt-3 flex-1 leading-relaxed text-fg-primary">{text.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-tertiary">{text.tradeoffs}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-subtle pt-3">
              <Meter label={t.privacyCost} value={i.privacyImpact} />
              <Meter label={t.freedomCost} value={i.autonomyImpact} />
              <span className="text-xs text-fg-tertiary">
                {t.benefit} <span className="text-fg-secondary">{levelWord(i.benefit, locale).toLowerCase()}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
