import { NoFeedbackWidget } from "@/components/no-feedback-widget";

/** Other people's bookings, incidents and complaints: no Loki widget here. */
export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoFeedbackWidget />
      {children}
    </>
  );
}
