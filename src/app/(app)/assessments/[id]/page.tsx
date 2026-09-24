import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConstraintList } from "@/components/booking";
import { Badge, Card, formatWhen, PageHeader } from "@/components/ui";
import { concernLabel, costLabel } from "@/config/assessment";
import {
  autonomyLabel,
  basisLabel,
  findIntervention,
  kindLabel,
  levelText,
  needsPurchase,
  privacyLabel,
} from "@/config/interventions";
import { constraintLabel } from "@/config/constraints";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import type { ConcernPlan } from "@/domain/safety-plan";
import { getAssessment } from "@/server/assessments";
import { requireViewer } from "@/server/viewer";

export const metadata: Metadata = { title: "Safety Plan" };

function Intervention({ id, emphasis = false }: { id: string; emphasis?: boolean }) {
  const i = findIntervention(id);
  if (!i) return null;
  return (
    <div className={`rounded-lg border p-3 text-sm ${emphasis ? "border-accent bg-accent-soft" : "border-line"}`}>
      <p className="font-medium">{i.title}</p>
      <p className="mt-1 flex flex-wrap gap-2">
        <Badge>{kindLabel(i.kind)}</Badge>
        {!needsPurchase(i.kind) && <Badge tone="accent">Nothing to buy</Badge>}
      </p>
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

function ConcernSection({ plan }: { plan: ConcernPlan }) {
  return (
    <Card title={concernLabel(plan.concern)}>
      <div className="space-y-4">
        {plan.recommended ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Most proportionate step</h3>
            <Intervention id={plan.recommended} emphasis />
          </div>
        ) : (
          <p className="rounded-lg bg-accent-soft p-3 text-sm text-accent">
            What you already do addresses this. Nothing new needed.
          </p>
        )}
        {plan.alreadyCovered.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Already covered by what you do</h3>
            {plan.alreadyCovered.map((k) => (
              <p key={k} className="text-sm text-muted">
                ✓ {findIntervention(k)?.title}
              </p>
            ))}
          </div>
        )}
        {plan.alternatives.length > 0 && (
          <details className="space-y-2">
            <summary className="cursor-pointer text-sm font-semibold">
              Other options within your limits ({plan.alternatives.length})
            </summary>
            <div className="mt-2 space-y-2">
              {plan.alternatives.map((k) => (
                <Intervention key={k} id={k} />
              ))}
            </div>
          </details>
        )}
        {plan.excluded.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">Ruled out by your limits</h3>
            {plan.excluded.map((e) => (
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

export default async function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const assessment = await getAssessment(getDb(), viewer.sub, id.data);
  if (!assessment) notFound();
  const { plan } = assessment;

  return (
    <>
      <PageHeader title={`Safety Plan: ${assessment.environment.name}`} lead={formatWhen(assessment.createdAt)} />
      {plan.nothingToBuy && (
        <p className="mb-6 rounded-card border border-accent bg-accent-soft p-4 text-accent">
          <strong>You don&apos;t need to buy anything.</strong>{" "}
          {plan.concerns.length === 0
            ? "You told us nothing about this place worries you. That's a fine answer."
            : "Everything below is something you can do, or already do, without spending money."}
        </p>
      )}
      <Card title="Limits this plan respects" className="mb-6">
        <ConstraintList constraints={plan.constraints} />
      </Card>
      <div className="space-y-6">
        {plan.concerns.map((c) => (
          <ConcernSection key={c.concern} plan={c} />
        ))}
      </div>
    </>
  );
}
