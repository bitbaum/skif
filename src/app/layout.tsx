import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Skif", template: "%s · Skif" },
  description:
    "Holistic safety for people and the places they live, Zürich first — without trading away privacy or freedom.",
};

// No third-party scripts here: this layout wraps every page, including ones
// holding preferences, bookings and incidents. Public pages add the feedback
// widget themselves (src/components/feedback-widget.tsx).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
