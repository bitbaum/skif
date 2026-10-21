"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PHOTOS } from "@/config/photos";
import { CREATE_ACCOUNT, MENU, SIGN_IN, STAGE } from "@/config/site";
import { ACTION, LABEL, SHELL } from "./shell";
import { SkifMark } from "./skif-mark";

type Section = (typeof MENU)[number];

/**
 * The public header, to the fleet navigation contract (bitbaum/fleet
 * SHARED.md): every section is a button with aria-expanded that opens a
 * full-width panel — its pages with one line each and a featured page — on
 * click (hover menus flicker and fail on touch); Escape, a click outside or
 * navigating closes it; the current section carries aria-current. Below lg the
 * whole map is one full-screen menu. Every link comes from MENU.
 *
 * Why not a package: the fleet decided against shared navigation markup
 * (SHARED.md "Navigation chrome") after sitekit's nav shipped the same defects
 * to every consumer; the contract and its audit are what is shared.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Section["key"] | null>(null);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const signedIn = useSignedIn();

  // Navigating closes whatever was open (derived during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setPhoneOpen(false);
  }

  useEffect(() => {
    if (!open && !phoneOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setPhoneOpen(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (open && header.current && !header.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, phoneOpen]);

  // A menu covering the page must not leave the page scrolling underneath it.
  useEffect(() => {
    document.body.style.overflow = phoneOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phoneOpen]);

  const first = pathname.split("/")[1] ?? "";
  const current = MENU.find((m) => (m.covers as readonly string[]).includes(first))?.key;

  return (
    <>
      <header ref={header} className="sticky top-0 z-40 border-b border-subtle bg-surface-page/90 backdrop-blur">
        <div className={`${SHELL} flex h-16 items-center gap-6`}>
          <Link
            href="/"
            aria-label="Skif, home"
            className="inline-flex min-h-11 items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <SkifMark className="size-8 text-gold" />
            <span className="font-heading text-lg font-semibold tracking-display text-fg-primary">Skif</span>
            <span className={`${LABEL} hidden rounded-full border border-subtle px-2 py-0.5 sm:inline`}>{STAGE}</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {MENU.map((m) => {
                const isOpen = open === m.key;
                return (
                  <li key={m.key}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`panel-${m.key}`}
                      aria-current={current === m.key ? "page" : undefined}
                      onClick={() => setOpen(isOpen ? null : m.key)}
                      className={`inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                        isOpen || current === m.key
                          ? "bg-surface-raised text-fg-primary"
                          : "text-fg-secondary hover:text-fg-primary"
                      }`}
                    >
                      {m.label}
                      <ChevronDown
                        aria-hidden
                        className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <AccountLinks signedIn={signedIn} />
          </div>

          <button
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center rounded-full text-fg-primary focus-visible:outline-2 focus-visible:outline-accent lg:hidden"
            aria-label={phoneOpen ? "Close menu" : "Open menu"}
            aria-expanded={phoneOpen}
            aria-controls="phone-menu"
            onClick={() => setPhoneOpen((o) => !o)}
          >
            {phoneOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </div>

        {MENU.map((m) => (open === m.key ? <Panel key={m.key} section={m} /> : null))}
      </header>
      {/* Outside <header>: its backdrop-filter makes it the containing block
        for fixed children, which squeezed a full-screen menu into 64px. */}
      {phoneOpen && (
        <div id="phone-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-surface-page lg:hidden">
          <nav aria-label="Main" className={`${SHELL} space-y-8 py-6`}>
            <div className="grid grid-cols-2 gap-2 ">
              <AccountLinks signedIn={signedIn} stretch />
            </div>

            {MENU.map((m) => (
              <section key={m.key} aria-labelledby={`phone-${m.key}`}>
                <Link
                  id={`phone-${m.key}`}
                  href={m.href}
                  aria-current={current === m.key ? "page" : undefined}
                  className="flex min-h-11 items-center font-heading text-2xl font-semibold tracking-display text-fg-primary"
                >
                  {m.label}
                </Link>
                <ul className="mt-1 border-t border-subtle">
                  {m.links.map((l) => (
                    <li key={l.href + l.label} className="border-b border-subtle">
                      <Link href={l.href} className="flex min-h-11 flex-col justify-center py-2">
                        <span className="text-fg-primary">{l.label}</span>
                        <span className="text-sm text-fg-tertiary">{l.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

function Panel({ section }: { section: Section }) {
  const photo = PHOTOS[section.featured.photo];
  return (
    <div
      id={`panel-${section.key}`}
      className="absolute inset-x-0 top-full hidden border-b border-subtle bg-surface-page shadow-sm lg:block"
    >
      <div className={`${SHELL} grid grid-cols-12 gap-8 py-8`}>
        <div className="col-span-3">
          <Link
            href={section.href}
            className="inline-flex min-h-11 items-center font-heading text-2xl font-semibold tracking-display text-fg-primary hover:text-accent"
          >
            {section.label} →
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{section.blurb}</p>
        </div>
        <ul className="col-span-5 grid content-start gap-1">
          {section.links.map((l) => (
            <li key={l.href + l.label}>
              <Link
                href={l.href}
                className="flex min-h-11 flex-col justify-center rounded-lg px-3 py-2 hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span className="font-medium text-fg-primary">{l.label}</span>
                <span className="text-sm text-fg-tertiary">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={section.featured.href}
          className="group relative col-span-4 flex min-h-48 items-end overflow-hidden rounded-card bg-black p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="33vw"
            className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/10" />
          <span className="relative font-heading text-lg font-semibold text-white">{section.featured.label} →</span>
        </Link>
      </div>
    </div>
  );
}

/** Signed out: Sign in and Create account. Signed in: one way back in. The
 * public pages are static, so the session is asked for once in the browser. */
function AccountLinks({ signedIn, stretch = false }: { signedIn: boolean; stretch?: boolean }) {
  const w = stretch ? "w-full" : "";
  if (signedIn) {
    return (
      <Link href="/assessments" className={`${ACTION.primary} ${w} ${stretch ? "col-span-2" : ""}`}>
        My Skif
      </Link>
    );
  }
  return (
    <>
      <Link href={SIGN_IN.href} className={`${ACTION.secondary} ${w}`}>
        {SIGN_IN.label}
      </Link>
      <Link href={CREATE_ACCOUNT.href} className={`${ACTION.primary} ${w}`}>
        {CREATE_ACCOUNT.label}
      </Link>
    </>
  );
}

function useSignedIn(): boolean {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    let live = true;
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((s: { user?: { id?: string } } | null) => live && setSignedIn(Boolean(s?.user?.id)))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  return signedIn;
}
