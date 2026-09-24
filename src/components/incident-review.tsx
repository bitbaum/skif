import { REVIEW_NOTE_MAX } from "@/config/reports";
import { REVIEW_LABELS, reviewMoves } from "@/domain/incidents";
import type { Report } from "@/server/bookings";
import { ActionForm, type FormAction } from "./action-form";
import { Field, TextInput } from "./fields";

/** Operations' controls for one incident: move it on, with an optional note. */
export function IncidentReview({ incident, action }: { incident: Report; action: FormAction }) {
  if (!incident.review) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {reviewMoves(incident.review).map((to) => (
        <ActionForm
          key={to}
          action={action}
          submitLabel={to === "RESOLVED" ? "Mark resolved" : `Mark ${REVIEW_LABELS[to].toLowerCase()}`}
          variant="secondary"
          hidden={{ reportId: incident.id, review: to }}
          className="flex flex-wrap items-end gap-2"
        >
          {to === "RESOLVED" && (
            <Field label="Resolution note (Ops only)">
              <TextInput name="note" maxLength={REVIEW_NOTE_MAX} />
            </Field>
          )}
        </ActionForm>
      ))}
    </div>
  );
}
