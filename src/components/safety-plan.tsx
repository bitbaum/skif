import { budgetLabel, concernFamily, concernLabel, costLabel } from "@/config/assessment";
import { HARM_FAMILIES } from "@/config/harm-families";
import { providerLabel } from "@/config/providers";
import { constraintLabel } from "@/config/constraints";
import {
  autonomyLabel,
  basisLabel,
  findIntervention,
  kindLabel,
  levelText,
  needsPurchase,
  privacyLabel,
  providerOf,
  type Intervention,
} from "@/config/interventions";
import { PRIORITY_LABELS } from "@/domain/findings";
import { planVerdict, type FindingPlan, type PlanVerdict, type SafetyPlan } from "@/domain/safety-plan";
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
      {providerOf(i) && <p className="mt-1 text-muted">From: {providerLabel(providerOf(i)!)}</p>}
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

/** Benefit never appears without what it costs in privacy and freedom
 * (docs/DOCTRINE.md: the Safety Graph). */
function ImpactLine({ i }: { i: Intervention }) {
  return (
    <span className="block text-muted">
      Benefit {levelText(i.benefit).toLowerCase()} · Privacy: {privacyLabel(i.privacyImpact).toLowerCase()} · Freedom:{" "}
      {autonomyLabel(i.autonomyImpact).toLowerCase()} · {costLabel(i.cost)}
    </span>
  );
}

function KeyList({ title, keys, mark, note }: { title: string; keys: string[]; mark: string; note?: (key: string) => string }) {
  if (keys.length === 0) return null;
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      {keys.map((k) => {
        const i = findIntervention(k);
        if (!i) return null;
        return (
          <p key={k} className="text-sm">
            {mark} {i.title}
            {note && <span className="text-muted"> — {note(k)}</span>}
            <ImpactLine i={i} />
          </p>
        );
      })}
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
        <KeyList
          title="Ruled out by your limits"
          keys={finding.excluded.map((e) => e.key)}
          mark="✕"
          note={(k) => (finding.excluded.find((e) => e.key === k)?.constraints ?? []).map(constraintLabel).join(", ")}
        />
      </div>
    </Card>
  );
}

const VERDICT: Record<PlanVerdict, { badge: string; headline: string; detail: string }> = {
  ADEQUATE: {
    badge: "Adequate as it is",
    headline: "Your current measures are adequate.",
    detail: "Nothing you told us needs anything new. That is a real answer, not an empty one.",
  },
  NOTHING_TO_BUY: {
    badge: "Nothing to buy",
    headline: "You don't need to buy anything.",
    detail: "Everything recommended below is something you can do, or already do, without spending money.",
  },
  SOME_SPENDING: {
    badge: "Some steps cost money",
    headline: "Some steps below cost money.",
    detail: "Each one says why it beat the free options, and what it costs you in privacy and freedom.",
  },
};

export function VerdictBadge({ plan }: { plan: SafetyPlan }) {
  const verdict = planVerdict(plan);
  return <Badge tone={verdict === "SOME_SPENDING" ? "neutral" : "accent"}>{VERDICT[verdict].badge}</Badge>;
}

export function PlanSummary({ plan }: { plan: SafetyPlan }) {
  const verdict = VERDICT[planVerdict(plan)];
  return (
    <p className="mb-6 rounded-card border border-accent bg-accent-soft p-4 text-accent">
      <strong>{verdict.headline}</strong> {verdict.detail}
      {plan.budget && ` Budget you gave: ${budgetLabel(plan.budget).toLowerCase()}.`}
    </p>
  );
}

/** Findings under their harm family, in the doctrine's order; for a whole-life
 * assessment, the families nothing was raised in are named too. */
export function FindingsByFamily({ plan, wholeLife }: { plan: SafetyPlan; wholeLife: boolean }) {
  const groups = HARM_FAMILIES.map((f) => ({
    ...f,
    findings: plan.findings.filter((x) => concernFamily(x.concern) === f.key),
  }));
  const quiet = groups.filter((g) => g.findings.length === 0);
  return (
    <div className="space-y-8">
      {groups
        .filter((g) => g.findings.length > 0)
        .map((g) => (
          <section key={g.key} className="space-y-4">
            <h2 className="text-xl font-semibold">{g.label}</h2>
            {g.findings.map((f) => (
              <FindingSection key={f.concern} finding={f} />
            ))}
          </section>
        ))}
      {wholeLife && quiet.length > 0 && (
        <p className="text-sm text-muted">
          Nothing raised about: {quiet.map((g) => g.label.toLowerCase()).join(", ")}.
        </p>
      )}
    </div>
  );
}
