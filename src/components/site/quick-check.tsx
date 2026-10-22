"use client";

import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import { buttonClass, segmentClass } from "@/components/ui";
import { costLabel } from "@/config/assessment";
import { concernLabel, concernsFor, type ConcernKey } from "@/config/concerns";
import { ENVIRONMENT_TYPES, type EnvironmentType } from "@/config/environments";
import { findIntervention, kindLabel } from "@/config/interventions";
import { useLocale } from "next-intl";
import { siteText } from "@/config/site";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locales";
import { buildSafetyPlan, planSteps } from "@/domain/safety-plan";
import { ACTION, LABEL } from "./shell";

/** The free first steps: the real plan engine, with nothing spent, no limits
 * and no leanings. Everything a full assessment adds only refines this. */
function freeSteps(environment: EnvironmentType, concerns: ConcernKey[]) {
  const plan = buildSafetyPlan({
    environment,
    concerns,
    exposures: [],
    threats: [],
    upcoming: "",
    measures: [],
    constraints: [],
    budget: "FREE",
    leans: {},
  });
  const steps = planSteps(plan);
  const chosen = new Set(steps.map((s) => s.key));
  const paid = new Set(plan.findings.flatMap((f) => f.overBudget).filter((k) => !chosen.has(k)));
  return { steps, paid: paid.size };
}

export function QuickCheck() {
  const found = useLocale();
  const { QUICK_CHECK } = siteText(isLocale(found) ? found : DEFAULT_LOCALE);
  const [environment, setEnvironment] = useState<EnvironmentType>("PERSON");
  const [concerns, setConcerns] = useState<ConcernKey[]>([]);
  const [showAll, setShowAll] = useState(false);

  const options = concernsFor(environment);
  const shown = showAll ? options : options.slice(0, QUICK_CHECK.concernsShown);
  const result = useMemo(() => freeSteps(environment, concerns), [environment, concerns]);

  function choosePlace(next: EnvironmentType) {
    setEnvironment(next);
    const fits = new Set(concernsFor(next).map((c) => c.key));
    setConcerns((current) => current.filter((c) => fits.has(c)));
    setShowAll(false);
  }

  function toggle(key: ConcernKey) {
    setConcerns((current) => (current.includes(key) ? current.filter((c) => c !== key) : [...current, key]));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <form className="space-y-10 lg:col-span-6" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className={LABEL}>01 · {QUICK_CHECK.placeQuestion}</legend>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ENVIRONMENT_TYPES.map((env) => (
              <label key={env.key} className={`${segmentClass} ${env.key === "PERSON" ? "col-span-2 sm:col-span-3" : ""}`}>
                <input
                  type="radio"
                  name="place"
                  className="sr-only"
                  checked={environment === env.key}
                  onChange={() => choosePlace(env.key)}
                />
                {env.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={LABEL}>02 · {QUICK_CHECK.concernQuestion}</legend>
          <ul className="mt-4 divide-y divide-subtle border-y border-subtle">
            {shown.map((c) => (
              <li key={c.key}>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 py-2 text-sm text-fg-primary has-focus-visible:outline-2 has-focus-visible:outline-accent">
                  <input
                    type="checkbox"
                    className="size-4 shrink-0 accent-accent"
                    checked={concerns.includes(c.key)}
                    onChange={() => toggle(c.key)}
                  />
                  {c.label}
                </label>
              </li>
            ))}
          </ul>
          {options.length > shown.length && (
            <button type="button" className={`${buttonClass.link} mt-2`} onClick={() => setShowAll(true)}>
              {QUICK_CHECK.showAll(options.length)}
            </button>
          )}
        </fieldset>
      </form>

      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-24" aria-live="polite">
          {result.steps.length === 0 ? (
            <p className="border-l-2 border-strong pl-4 text-fg-secondary">{QUICK_CHECK.empty}</p>
          ) : (
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-display text-fg-primary">{QUICK_CHECK.stepsTitle}</h3>
              <ol className="mt-5 space-y-5">
                {result.steps.map((s, i) => {
                  const step = findIntervention(s.key);
                  if (!step) return null;
                  return (
                    <li key={s.key} className="grid grid-cols-[2rem_1fr] gap-x-2">
                      <span className="pt-0.5 font-mono text-xs tabular-nums text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="text-fg-primary">{step.title}</p>
                        <p className="mt-1 font-mono text-xs text-fg-tertiary">
                          {kindLabel(step.kind)} · {costLabel(step.cost)} · Answers: {s.concerns.map(concernLabel).join("; ").toLowerCase()}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              {result.paid > 0 && <p className="mt-6 text-sm text-fg-secondary">{QUICK_CHECK.more(result.paid)}</p>}
            </div>
          )}
          <div className="mt-8 border-t border-subtle pt-6">
            <Link href={QUICK_CHECK.cta.href} className={ACTION.primary}>
              {QUICK_CHECK.cta.label}
            </Link>
            <p className="mt-3 text-sm text-fg-tertiary">{QUICK_CHECK.ctaNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
