import { redirect } from "next/navigation";
import { pageLocale, type LocaleParams } from "@/i18n/page";

/** The ten fields live in the Library now; old links land there. */
export default async function SafetyIndex({ params }: { params: LocaleParams }) {
  await pageLocale(params);
  redirect("/library");
}
