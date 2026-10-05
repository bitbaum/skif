import { auth } from "@/auth";
import { isLokiWatcher } from "@/server/viewer";
import { FeedbackWidget } from "./feedback-widget";

/** The Loki widget inside the signed-in app, for SKIF_LOKI_WATCH_SUBS only;
 * for anyone else nothing is rendered (src/config/feedback.ts). Mounted by the
 * layouts of the person's own pages, never under /ops. */
export async function LokiWatch() {
  const sub = (await auth())?.user?.id;
  return sub && isLokiWatcher(sub) ? <FeedbackWidget /> : null;
}

/** A layout that adds LokiWatch to every page beneath it. */
export function WithLokiWatch({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LokiWatch />
    </>
  );
}
