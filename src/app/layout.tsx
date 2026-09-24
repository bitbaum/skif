import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skif",
  description: "Started from Loki · Skif",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}<Script src={"https://loki.orangecat.ch/widget.js"} data-fc-project={"fcw_53c446f089ca3ec49f01217557ee0a52"} strategy="afterInteractive" /></body>
    </html>
  );
}
