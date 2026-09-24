import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { authConfig } from "@/config/auth";
import { getDb } from "@/db/client";
import { getProtectorBySub, type Protector } from "./protectors";

export type Viewer = {
  sub: string;
  name: string;
  isOps: boolean;
  protector: Protector | null;
};

/** The signed-in person, or null. Roles are derived, never stored on a user:
 * Operations from SKIF_OPS_SUBS, Protector from a protectors row. */
export async function getViewer(): Promise<Viewer | null> {
  const session = await auth();
  const sub = session?.user?.id;
  if (!sub) return null;
  return {
    sub,
    name: session.user?.name ?? "",
    isOps: authConfig.opsSubs.has(sub),
    protector: await getProtectorBySub(getDb(), sub),
  };
}

export async function requireViewer(): Promise<Viewer> {
  const viewer = await getViewer();
  if (!viewer) redirect("/signin");
  return viewer;
}

export async function requireOps(): Promise<Viewer> {
  const viewer = await requireViewer();
  if (!viewer.isOps) redirect("/");
  return viewer;
}

export async function requireApprovedProtector(): Promise<Viewer & { protector: Protector }> {
  const viewer = await requireViewer();
  const { protector } = viewer;
  if (protector?.status !== "APPROVED") redirect("/protector");
  return { ...viewer, protector };
}
