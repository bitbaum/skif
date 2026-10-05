"use server";

import { signOut } from "@/auth";

/** Sign out from the account menu, back to the landing page. */
export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
