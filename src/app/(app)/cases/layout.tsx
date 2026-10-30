import { NoFeedbackWidget } from "@/components/no-feedback-widget";

/** A person's account of a scam — the most sensitive pages in Skif. A Loki
 * report carries the page's text away, so the widget never loads here, not
 * even for the owner (src/config/feedback.ts). */
export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NoFeedbackWidget />
      {children}
    </>
  );
}
