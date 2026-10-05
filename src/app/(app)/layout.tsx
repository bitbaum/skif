import Link from "next/link";
import { signOut } from "@/auth";
import { isLokiWatcher, requireViewer } from "@/server/viewer";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireViewer();
  const links = [
    { href: "/preferences", label: "Preferences" },
    { href: "/bookings", label: "Bookings" },
    { href: "/assessments", label: "Safety assessment" },
    { href: "/protector", label: viewer.protector ? "My jobs" : "Become a Protector" },
    // A full load into /ops leaves the Loki widget behind (ops/layout.tsx).
    ...(viewer.isOps ? [{ href: "/ops", label: "Operations", fullLoad: isLokiWatcher(viewer.sub) }] : []),
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 text-sm">
          <Link href="/" className="mr-2 font-semibold">
            Skif
          </Link>
          {links.map((l) =>
            l.fullLoad ? (
              <a key={l.href} href={l.href} className="text-muted hover:text-ink">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className="text-muted hover:text-ink">
                {l.label}
              </Link>
            ),
          )}
          <form
            className="ml-auto"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <span className="mr-3 text-muted">{viewer.name}</span>
            <button type="submit" className="text-muted underline hover:text-ink">
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
