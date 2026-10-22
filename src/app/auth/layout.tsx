import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Document, ROOT_METADATA } from "@/components/shell/document";

export const metadata: Metadata = ROOT_METADATA;

/** Auth's own pages, in the language the reader last chose. */
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Document lang={await getLocale()}>{children}</Document>;
}
