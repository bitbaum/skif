import { auth } from "@/auth";
import { aiStatus, modelCaller } from "@/server/ai";
import { formAssistHandler } from "@/server/form-assist";
import { checkRateLimit } from "@/server/rate-limit";

/**
 * The one endpoint behind every AI-assisted form (see src/config/ai-forms.ts
 * for which forms, and why so few). The client names a form, never fields,
 * so it cannot widen what a model may read or write. Requires a signed-in
 * person and is rate-limited per person; the model only proposes values the
 * person reviews before submitting anything.
 */
export const POST = formAssistHandler({
  signedIn: async () => (await auth())?.user?.id ?? null,
  configured: () => aiStatus() === "configured",
  limit: (sub) => checkRateLimit("FORM_ASSIST", sub),
  complete: modelCaller(),
});
