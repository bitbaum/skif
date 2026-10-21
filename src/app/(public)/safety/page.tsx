import { redirect } from "next/navigation";

/** The ten fields live in the Library now; old links land there. */
export default function SafetyIndex() {
  redirect("/library");
}
