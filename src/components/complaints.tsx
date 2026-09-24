import { COMPLAINT_TEXT_MAX } from "@/config/complaints";
import type { ComplaintAction } from "@/domain/complaints";
import { ActionForm, type FormAction } from "./action-form";
import { Field, TextArea } from "./fields";

const ACTION_COPY: Record<ComplaintAction, { label: string; field: string; hint?: string; variant: "primary" | "secondary" | "danger" }> = {
  ASK_PROTECTOR: {
    label: "Ask the Protector",
    field: "Summary the Protector will see",
    hint: "In your words, not the customer's. Don't identify them beyond what the job already did.",
    variant: "secondary",
  },
  RESPOND: { label: "Send response", field: "Your response", variant: "primary" },
  UPHOLD: {
    label: "Uphold",
    field: "Decision note",
    hint: "If the Protector hasn't been asked yet, this is also what they are told, so they can appeal.",
    variant: "danger",
  },
  DISMISS: { label: "Not upheld", field: "Decision note (Operations only)", variant: "secondary" },
  APPEAL: { label: "Appeal", field: "Why should the decision change?", variant: "secondary" },
};

/** One form per action the viewer may take on a complaint. */
export function ComplaintActions({
  complaintId,
  actions,
  action,
}: {
  complaintId: string;
  actions: readonly ComplaintAction[];
  action: FormAction;
}) {
  return (
    <div className="space-y-4">
      {actions.map((a) => {
        const copy = ACTION_COPY[a];
        return (
          <ActionForm
            key={a}
            action={action}
            submitLabel={copy.label}
            variant={copy.variant}
            hidden={{ complaintId, action: a }}
            className="space-y-2 rounded-lg border border-line p-3"
          >
            <Field label={copy.field} hint={copy.hint}>
              <TextArea name="text" rows={2} maxLength={COMPLAINT_TEXT_MAX} />
            </Field>
          </ActionForm>
        );
      })}
    </div>
  );
}
