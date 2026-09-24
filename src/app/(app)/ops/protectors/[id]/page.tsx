import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/action-form";
import { languagesText, presenceText } from "@/components/booking";
import { Badge, Card, DefinitionList, Empty, formatWhen, PageHeader } from "@/components/ui";
import { capabilityLabel, findCapability, levelLabel, verificationLabel } from "@/config/capabilities";
import { serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { isoDay, standing } from "@/domain/capabilities";
import { idInput } from "@/domain/inputs";
import { PROTECTOR_MOVES, PROTECTOR_STATUS_LABELS } from "@/domain/protector-status";
import { getProtector, listCapabilities, type ProtectorCapability } from "@/server/protectors";
import { requireOps } from "@/server/viewer";
import { assessCapabilityAction, protectorStatusAction } from "../../actions";

export const metadata: Metadata = { title: "Protector · Operations" };

function CapabilityRow({ c, today }: { c: ProtectorCapability; today: string }) {
  const s = standing({ key: c.capability, level: c.level, verification: c.verification, expiresOn: c.expiresOn }, today);
  return (
    <li className="flex flex-wrap items-start gap-4 py-3">
      <div className="min-w-0 flex-1 space-y-1 text-sm">
        <p className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{capabilityLabel(c.capability)}</span>
          <span className="text-muted">{levelLabel(c.level)}</span>
          <Badge tone={c.verification === "VERIFIED" ? "accent" : c.verification === "REJECTED" ? "danger" : "neutral"}>
            {verificationLabel(c.verification)}
          </Badge>
          {s.kind === "UNUSABLE" && s.reason === "expired" && <Badge tone="danger">Expired</Badge>}
        </p>
        {c.evidence && <p className="text-muted">Evidence: {c.evidence}</p>}
        {findCapability(c.capability)?.certified && (
          <p className="text-muted">
            Certificate: {c.certification || "none given"}
            {c.expiresOn && ` · valid until ${c.expiresOn}`}
          </p>
        )}
        {c.assessedAt && <p className="text-xs text-muted">Assessed {formatWhen(c.assessedAt)}</p>}
      </div>
      {c.verification !== "VERIFIED" && (
        <ActionForm
          action={assessCapabilityAction}
          submitLabel="Verify"
          hidden={{ capabilityId: c.id, verification: "VERIFIED" }}
          className=""
        />
      )}
      {c.verification !== "REJECTED" && (
        <ActionForm
          action={assessCapabilityAction}
          submitLabel="Reject"
          variant="danger"
          hidden={{ capabilityId: c.id, verification: "REJECTED" }}
          className=""
        />
      )}
    </li>
  );
}

export default async function OpsProtectorPage({ params }: { params: Promise<{ id: string }> }) {
  await requireOps();
  const id = idInput.safeParse((await params).id);
  if (!id.success) notFound();
  const db = getDb();
  const protector = await getProtector(db, id.data);
  if (!protector) notFound();
  const capabilities = await listCapabilities(db, protector.id);
  const today = isoDay(new Date());

  return (
    <>
      <PageHeader title={protector.displayName} lead={`Applied ${formatWhen(protector.createdAt)}`}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={protector.status === "APPROVED" ? "accent" : "warn"}>
            {PROTECTOR_STATUS_LABELS[protector.status]}
          </Badge>
          {PROTECTOR_MOVES[protector.status].map((m) => (
            <ActionForm
              key={m.to}
              action={protectorStatusAction}
              submitLabel={m.label}
              variant={m.tone}
              hidden={{ protectorId: protector.id, status: m.to }}
              className=""
            />
          ))}
        </div>
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card title="Profile">
          <p className="mb-4 whitespace-pre-wrap text-sm">{protector.bio}</p>
          <DefinitionList
            items={[
              ["Experience", `${protector.experienceYears} years`],
              ["Services", protector.services.map(serviceLabel).join(", ")],
              ["Languages", languagesText(protector.languages)],
              ["Styles", protector.presenceStyles.map(presenceText).join(", ")],
            ]}
          />
        </Card>
        <Card title="Capabilities">
          {capabilities.length === 0 ? (
            <Empty>None declared.</Empty>
          ) : (
            <ul className="divide-y divide-line">
              {capabilities.map((c) => (
                <CapabilityRow key={c.id} c={c} today={today} />
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
