import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConstraintList } from "@/components/booking";
import { FindingsByFamily, PlanSteps, PlanSummary } from "@/components/safety-plan";
import { DefinitionList, FoldCard, formatWhen, PageHeader } from "@/components/ui";
import { budgetLabel, exposureLabel, protectedLabel, threatLabel } from "@/config/assessment";
import { constraintLabel } from "@/config/constraints";
import { environmentTypeLabel } from "@/config/environments";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { readPlan } from "@/domain/plan-versions";
import { describeLeans } from "@/domain/preference-fit";
import { getAssessment } from "@/server/assessments";
import { requireViewer } from "@/server/viewer";

export const metadata: Metadata = { title: "Safety Plan" };

const list = (keys: readonly string[], label: (k: string) => string) => (keys.length ? keys.map(label).join(", ") : "—");

export default async function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireViewer();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const assessment = await getAssessment(getDb(), viewer.sub, id.data);
  if (!assessment) notFound();
  const plan = readPlan(assessment.plan);

  return (
    <>
      <PageHeader
        title={`Safety Plan: ${assessment.environment.name}`}
        lead={`${environmentTypeLabel(assessment.environment.type)} · ${formatWhen(assessment.createdAt)}`}
      />
      <PlanSummary plan={plan} />
      <PlanSteps plan={plan} />
      {/* What the plan rests on: there to check, not to act on, so folded. */}
      <FoldCard
        title="What this plan is based on"
        action="Show"
        preview={[plan.budget ? budgetLabel(plan.budget) : null, ...plan.constraints.map(constraintLabel)].filter(Boolean).join(" · ")}
        className="mb-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <section>
            <h3 className="mb-2 text-sm font-semibold">What you told us</h3>
            <DefinitionList
              items={[
                ["Protecting", list(assessment.protecting, protectedLabel)],
                ["Exposure", list(assessment.exposures, exposureLabel)],
                ["Known threats", list(assessment.threats, threatLabel)],
                ["Coming up", assessment.upcoming || "—"],
                ["Budget", plan.budget ? budgetLabel(plan.budget) : "Not asked"],
              ]}
            />
          </section>
          <section>
            <h3 className="mb-2 text-sm font-semibold">Limits and leans this plan follows</h3>
            <ConstraintList constraints={plan.constraints} />
            <p className="mt-3 text-sm text-muted">
              {plan.leans
                ? `Leans: ${describeLeans(plan.leans).join(", ") || "balanced on everything"}.`
                : "Made before trade-off leans were taken into account."}
            </p>
          </section>
        </div>
      </FoldCard>
      <FindingsByFamily plan={plan} wholeLife={assessment.environment.type === "PERSON"} />
    </>
  );
}
