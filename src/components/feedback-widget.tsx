import Script from "next/script";
import { FEEDBACK_WIDGET } from "@/config/feedback";

/** Public pages only — see src/config/feedback.ts. lazyOnload: a feedback
 * launcher is never urgent, and a third-party origin costs its own handshake. */
export function FeedbackWidget() {
  return <Script src={FEEDBACK_WIDGET.src} data-fc-project={FEEDBACK_WIDGET.project} strategy="lazyOnload" />;
}
