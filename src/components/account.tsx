"use client";

import Link from "next/link";
import { AccountMenu } from "@bitbaum/accountkit";
import { signOutAction } from "@/app/(app)/account-actions";

/** Who is signed in and how to sign out: the fleet's one account menu
 * (@bitbaum/accountkit). Identity only; the app's sections are AppNav. */
export function Account({ name }: { name: string }) {
  return <AccountMenu user={{ name }} onSignOut={signOutAction} renderLink={(p) => <Link {...p} />} />;
}
