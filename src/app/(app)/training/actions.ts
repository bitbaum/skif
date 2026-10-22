"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { isCourseKey, setInterest } from "@/server/academy";
import { requireViewer } from "@/server/viewer";

/** Ask, or stop asking, to hear when a course starts. */
export async function courseInterestAction(form: FormData): Promise<void> {
  const viewer = await requireViewer();
  const course = form.get("course");
  if (!isCourseKey(course)) redirect("/training");
  const wanted = form.get("wanted") === "1";
  await setInterest(getDb(), viewer.sub, course, wanted);
  redirect(`/training?${wanted ? "added" : "removed"}=${course}`);
}
