import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm } from "@/components/action-form";
import { StatusBadge } from "@/components/booking";
import { CheckboxGroup, Field, TextArea, TextInput } from "@/components/fields";
import { Badge, Card, Empty, formatWhen, PageHeader } from "@/components/ui";
import { LANGUAGES, PRESENCE_STYLES } from "@/config/constraints";
import { PROTECTOR_LIMITS, PROTECTOR_SKILLS } from "@/config/protectors";
import { SERVICES, serviceLabel } from "@/config/services";
import { getDb } from "@/db/client";
import { listProtectorJobs } from "@/server/bookings";
import type { Protector } from "@/server/protectors";
import { requireViewer } from "@/server/viewer";
import { applyAction } from "./actions";

export const metadata: Metadata = { title: "Protector" };

const STATUS_NOTE: Record<Protector["status"], string> = {
  APPLIED: "Your application is with Operations. You'll see jobs here once you're approved.",
  APPROVED: "You're approved. Jobs Operations assigns to you appear below.",
  SUSPENDED: "Your profile is paused. Contact Operations.",
};

function ApplicationForm({ protector }: { protector: Protector | null }) {
  return (
    <ActionForm action={applyAction} submitLabel={protector ? "Save profile" : "Apply"}>
      <Field label="Name shown to customers">
        <TextInput
          name="displayName"
          maxLength={PROTECTOR_LIMITS.displayNameMax}
          defaultValue={protector?.displayName}
          required
        />
      </Field>
      <Field label="About you" hint="How you keep situations calm. Customers read this.">
        <TextArea name="bio" maxLength={PROTECTOR_LIMITS.bioMax} defaultValue={protector?.bio} required />
      </Field>
      <CheckboxGroup legend="Services you offer" name="services" options={SERVICES} selected={protector?.services ?? []} />
      <CheckboxGroup legend="Languages" name="languages" options={LANGUAGES} selected={protector?.languages ?? []} />
      <CheckboxGroup
        legend="Training and experience"
        name="skills"
        options={PROTECTOR_SKILLS}
        selected={protector?.skills ?? []}
      />
      <CheckboxGroup
        legend="Styles you work in"
        name="presenceStyles"
        options={PRESENCE_STYLES}
        selected={protector?.presenceStyles ?? []}
      />
    </ActionForm>
  );
}

export default async function ProtectorPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const viewer = await requireViewer();
  const { protector } = viewer;
  const { saved } = await searchParams;
  const jobs = protector?.status === "APPROVED" ? await listProtectorJobs(getDb(), protector.id) : [];

  return (
    <>
      <PageHeader
        title={protector ? "Your Protector profile" : "Become a Protector"}
        lead="Skif Protectors are chosen for judgment and calm, not intimidation."
      >
        {protector && <Badge tone={protector.status === "APPROVED" ? "accent" : "warn"}>{protector.status}</Badge>}
      </PageHeader>
      {saved && <p className="mb-4 rounded-lg bg-accent-soft p-3 text-sm text-accent">Saved.</p>}
      {protector && <p className="mb-6 text-muted">{STATUS_NOTE[protector.status]}</p>}
      {protector?.status === "APPROVED" && (
        <Card title="Your jobs" className="mb-6">
          {jobs.length === 0 ? (
            <Empty>No jobs assigned yet.</Empty>
          ) : (
            <ul className="divide-y divide-line">
              {jobs.map((j) => (
                <li key={j.id}>
                  <Link href={`/protector/jobs/${j.id}`} className="flex flex-wrap items-center gap-3 py-3 hover:bg-bg">
                    <span className="font-medium">{serviceLabel(j.service)}</span>
                    <span className="text-sm text-muted">
                      {formatWhen(j.startsAt)} · {j.area}
                    </span>
                    <span className="ml-auto">
                      <StatusBadge status={j.status} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
      <Card title={protector ? "Profile" : "Application"}>
        <ApplicationForm protector={protector} />
      </Card>
    </>
  );
}
