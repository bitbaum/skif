import { budgetLabel, concernLabel, costLabel } from "@/config/assessment";
import { constraintLabel } from "@/config/constraints";
import {
  autonomyLabel,
  basisLabel,
  findIntervention,
  kindLabel,
  levelText,
  needsPurchase,
  privacyLabel,
} from "@/config/interventions";
import { PRIORITY_LABELS } from "@/domain/findings";
import type { FindingPlan, SafetyPlan } from "@/domain/safety-plan";
import { Badge, Card } from "./ui";

export function InterventionCard({ id, why, emphasis = false }: { id: string; why?: string[]; emphasis?: boolean }) {
  const i = findIntervention(id);
  if (!i) return null;
  return (
    <div className={`rounded-lg border p-3 text-sm ${emphasis ? "border-accent bg-accent-soft" : "border-line"}`}>
      <p className="font-medium">{i.title}</p>
      <p className="mt-1 flex flex-wrap gap-2">
        <Badge>{kindLabel(i.kind)}</Badge>
        {!needsPurchase(i.kind) && <Badge tone="accent">Nothing to buy</Badge>}
      </p>
      {why && why.length > 0 && (
        <ul className="mt-2 list-disc pl-5">
          {why.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}
      <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-0.5 text-muted">
        <dt>Expected benefit</dt>
        <dd>
          {levelText(i.benefit)} · confidence {levelText(i.evidence.confidence).toLowerCase()} (
          {basisLabel(i.evidence.basis)})
        </dd>
        <dt>Privacy</dt>
        <dd>{privacyLabel(i.privacyImpact)}</dd>
        <dt>Freedom</dt>
        <dd>{autonomyLabel(i.autonomyImpact)}</dd>
        <dt>Cost</dt>
        <dd>{costLabel(i.cost)}</dd>
      </dl>
      <p className="mt-2 text-muted">Trade-off: {i.tradeoffs}</p>
    </div>
  );
}

const OUTCOME_NOTE: Record<Exclude<FindingPlan["outcome"], "RECOMMENDED">, string> = {
  COVERED: "What you already do addresses this. Nothing new needed.",
  NOTHING_FITS: "Nothing within your limits and budget addresses this. Options over budget are listed below.",
};

function KeyList({ title, keys, mark }: { title: string; keys: string[]; mark: string }) {
  if (keys.length === 0) return null;
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold">{title}</h3>
      {keys.map((k) => (
        <p key={k} className="text-sm text-muted">
          {mark} {findIntervention(k)?.title}
        </p>
      ))}
    </div>
  );
}

export function FindingSection({ finding }: { finding: FindingPlan }) {
  return (
    <Card title={concernLabel(finding.concern)}>
      <div className="space-y-4">
        <div className="text-sm">
          <Badge tone={finding.priority === "HIGH" ? "danger" : finding.priority === "MEDIUM" ? "warn" : "neutral"}>
            {PRIORITY_LABELS[finding.priority]}
          </Badge>
          <ul className="mt-2 space-y-0.5 text-muted">
            {finding.because.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        {finding.recommended ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Most proportionate step</h3>
            <InterventionCard id={finding.recommended.key} why={finding.recommended.why} emphasis />
          </div>
        ) : (
          finding.outcome !== "RECOMMENDED" && (
            <p className="rounded-lg bg-accent-soft p-3 text-sm text-accent">{OUTCOME_NOTE[finding.outcome]}</p>
          )
        )}
        <KeyList title="Already covered by what you do" keys={finding.alreadyCovered} mark="✓" />
        {finding.alternatives.length > 0 && (
          <details>
            <summary className="cursor-pointer text-sm font-semibold">
              Other options within your limits ({finding.alternatives.length})
            </summary>
            <div className="mt-2 space-y-2">
              {finding.alternatives.map((k) => (
                <InterventionCard key={k} id={k} />
              ))}
            </div>
          </details>
        )}
        <KeyList title="Over your budget" keys={finding.overBudget} mark="·" />
        {finding.excluded.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Ruled out by your limits</h3>
            {finding.excluded.map((e) => (
              <p key={e.key} className="text-sm text-muted">
                ✕ {findIntervention(e.key)?.title} — {e.constraints.map(constraintLabel).join(", ")}
              </p>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export function PlanSummary({ plan }: { plan: SafetyPlan }) {
  if (!plan.nothingToBuy) return null;
  return (
    <p className="mb-6 rounded-card border border-accent bg-accent-soft p-4 text-accent">
      <strong>You don&apos;t need to buy anything.</strong>{" "}
      {plan.findings.length === 0
        ? "Nothing you told us about this place needs addressing. That's a fine answer."
        : "Everything recommended below is something you can do, or already do, without spending money."}
      {plan.budget && ` Budget you gave: ${budgetLabel(plan.budget).toLowerCase()}.`}
    </p>
  );
}
