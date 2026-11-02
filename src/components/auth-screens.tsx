"use client";

import Link from "next/link";
import { createAuthClient } from "better-auth/react";
import { authClientPlugins } from "@bitbaum/accountkit/auth/client";
import { AccountPanel, SignInForm, SignUpForm, type AuthClasses, type AuthLabels } from "@bitbaum/accountkit/auth/react";
import type { SignInMethods } from "@bitbaum/accountkit/auth";
import { ACTION } from "@/components/site/shell";

/** The browser half of accounts. Talks only to this origin (/api/auth). */
const authClient = createAuthClient({ plugins: authClientPlugins() });

/**
 * The fleet's account screens (@bitbaum/accountkit/auth/react) in Skif's
 * look: Skif's two button shapes, its field, its card. The logic and the
 * forms' words are the package's, the same in every product.
 */
const CLASSES: Partial<AuthClasses> = {
  stack: "flex flex-col gap-4",
  field: "flex flex-col gap-1",
  label: "text-sm font-medium text-fg-primary",
  hint: "text-sm leading-relaxed text-fg-secondary",
  input:
    "block min-h-11 w-full rounded-lg border border-strong bg-surface-page px-3 text-fg-primary focus-visible:outline-2 focus-visible:outline-accent",
  button: `${ACTION.primary} w-full`,
  buttonQuiet: `${ACTION.secondary} w-full`,
  notice: "rounded-card border border-subtle p-3 text-sm leading-relaxed text-fg-secondary",
  error: "text-sm text-danger",
  divider:
    "flex items-center gap-3 text-xs text-fg-tertiary before:h-px before:flex-1 before:bg-subtle after:h-px after:flex-1 after:bg-subtle",
  section: "flex flex-col gap-4 border-t border-subtle pt-8",
  sectionTitle: "font-heading text-lg font-semibold text-fg-primary",
  link: "break-all text-accent underline underline-offset-4",
  check: "flex min-h-11 items-center gap-3 text-sm text-fg-secondary",
};

const TEXT_LINK = "inline-flex min-h-11 items-center font-medium text-accent underline-offset-4 hover:underline";

export function SkifSignIn(props: {
  labels: AuthLabels;
  methods: SignInMethods;
  next: string;
  signInPath: string;
  signUpPath: string;
  initialError: boolean;
}) {
  return (
    <SignInForm
      client={authClient}
      classes={CLASSES}
      labels={props.labels}
      methods={props.methods}
      next={props.next}
      signInPath={props.signInPath}
      initialError={props.initialError}
      signUpLink={
        <Link prefetch={false} href={props.signUpPath} className={TEXT_LINK}>
          {props.labels.createAccount}
        </Link>
      }
    />
  );
}

export function SkifSignUp(props: {
  labels: AuthLabels;
  methods: SignInMethods;
  next: string;
  signUpPath: string;
  signInPath: string;
}) {
  return (
    <SignUpForm
      client={authClient}
      classes={CLASSES}
      labels={props.labels}
      methods={props.methods}
      next={props.next}
      signUpPath={props.signUpPath}
      signInPath={props.signInPath}
      signInLink={
        <Link prefetch={false} href={props.signInPath} className={TEXT_LINK}>
          {props.labels.signIn}
        </Link>
      }
    />
  );
}

export function SkifAccount(props: {
  labels: AuthLabels;
  methods: SignInMethods;
  user: { name: string; email: string | null; emailVerified: boolean; role: string; twoFactorEnabled: boolean };
  linked: string[];
  accountPath: string;
  homePath: string;
}) {
  return <AccountPanel client={authClient} classes={CLASSES} {...props} />;
}
