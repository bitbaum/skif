import type { Metadata } from "next";
import "@bitbaum/design-tokens/tokens.css";
import "@bitbaum/accountkit/styles.css";
import "@/app/globals.css";
import { PUBLIC_ORIGIN } from "@/config/site";

/** What every page shares in its <head>; each root layout exports it. */
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(PUBLIC_ORIGIN),
  title: { default: "Skif", template: "%s · Skif" },
  description:
    "Holistic safety for people and the places they live, Zürich first — without trading away privacy or freedom.",
  // Pages without a card of their own (src/site/share.ts) share the home one.
  openGraph: { siteName: "Skif", type: "website", images: [{ url: "/og/home", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og/home"] },
};

/** The shared tokens flip on a `.dark` class; Skif follows the OS setting.
 * Inline and first-party, run before paint so a dark page never flashes light. */
const FOLLOW_OS_THEME = `(function(){var m=matchMedia("(prefers-color-scheme: dark)");function s(){document.documentElement.classList.toggle("dark",m.matches)}s();m.addEventListener("change",s)})()`;

/**
 * The page document. Skif has three root layouts — the public site under its
 * language (app/[locale]), the signed-in pages ((app)) and auth — and they
 * share this, so the <html> they render differs only in its language.
 *
 * No third-party scripts here: it wraps pages holding preferences, bookings
 * and incidents. Public pages add the feedback widget themselves.
 */
export function Document({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      {/* An App Router root layout's own <head>; the rule is for the pages router. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: FOLLOW_OS_THEME }} />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
