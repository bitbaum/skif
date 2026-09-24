import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConstraintList } from "@/components/booking";
import { FindingSection, PlanSummary } from "@/components/safety-plan";
import { Card, DefinitionList, formatWhen, PageHeader } from "@/components/ui";
import { budgetLabel, exposureLabel, protectedLabel, threatLabel } from "@/config/assessment";
import { environmentTypeLabel } from "@/config/environments";
import { getDb } from "@/db/client";
import { idInput } from "@/domain/inputs";
import { readPlan } from "@/domain/plan-versions";
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
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Card title="What you told us">
          <DefinitionList
            items={[
              ["Protecting", list(assessment.protecting, protectedLabel)],
              ["Exposure", list(assessment.exposures, exposureLabel)],
              ["Known threats", list(assessment.threats, threatLabel)],
              ["Coming up", assessment.upcoming || "—"],
              ["Budget", plan.budget ? budgetLabel(plan.budget) : "Not asked"],
            ]}
          />
        </Card>
        <Card title="Limits this plan respects">
          <ConstraintList constraints={plan.constraints} />
        </Card>
      </div>
      <div className="space-y-6">
        {plan.findings.map((f) => (
          <FindingSection key={f.concern} finding={f} />
        ))}
      </div>
    </>
  );
}
