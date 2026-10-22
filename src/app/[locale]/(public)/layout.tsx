import { FeedbackWidget } from "@/components/feedback-widget";
import { PublicFooter } from "@/components/site/public-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TranslationNotice } from "@/components/site/translation-notice";
import { pageLocale, type LocaleParams } from "@/i18n/page";

/** Every public page: one masthead, one footer. The fleet's feedback widget
 * runs here only, never on pages holding preferences, bookings or incidents. */
export default async function PublicLayout({ children, params }: { children: React.ReactNode; params: LocaleParams }) {
  const locale = await pageLocale(params);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <TranslationNotice />
        {children}
      </main>
      <PublicFooter locale={locale} />
      <FeedbackWidget />
    </>
  );
}
