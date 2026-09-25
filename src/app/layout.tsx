import type { Metadata } from "next";
import "@bitbaum/design-tokens/tokens.css";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: { default: "Skif", template: "%s · Skif" },
  description:
    "Holistic safety for people and the places they live, Zürich first — without trading away privacy or freedom.",
};

/** The shared tokens flip on a `.dark` class; Skif follows the OS setting.
 * Inline and first-party, run before paint so a dark page never flashes light. */
const FOLLOW_OS_THEME = `(function(){var m=matchMedia("(prefers-color-scheme: dark)");function s(){document.documentElement.classList.toggle("dark",m.matches)}s();m.addEventListener("change",s)})()`;

// No third-party scripts here: this layout wraps every page, including ones
// holding preferences, bookings and incidents. Public pages add the feedback
// widget themselves (src/components/feedback-widget.tsx).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FOLLOW_OS_THEME }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
