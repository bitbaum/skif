import { NoFeedbackWidget } from "@/components/no-feedback-widget";

/** A person's ways in: passwords, passkeys, a second factor's secret. A Loki
 * report carries the page's text away, so the widget never loads here, not
 * even for the owner (src/config/feedback.ts). */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoFeedbackWidget />
      {children}
    </>
  );
}
