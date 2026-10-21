import { FeedbackWidget } from "@/components/feedback-widget";
import { PublicFooter } from "@/components/site/public-footer";
import { SiteHeader } from "@/components/site/site-header";

/** Every public page: one masthead, one footer. The fleet's feedback widget
 * runs here only, never on pages holding preferences, bookings or incidents. */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <PublicFooter />
      <FeedbackWidget />
    </>
  );
}
