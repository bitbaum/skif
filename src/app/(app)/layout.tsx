import Link from "next/link";
import { signOut } from "@/auth";
import { AppNav, type AppNavLink } from "@/components/app-nav";
import { isLokiWatcher, requireViewer } from "@/server/viewer";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireViewer();
  const links: AppNavLink[] = [
    { href: "/preferences", label: "Preferences" },
    { href: "/bookings", label: "Bookings" },
    { href: "/assessments", label: "Safety assessment" },
    { href: "/protector", label: viewer.protector ? "My jobs" : "Become a Protector" },
    ...(viewer.isOps ? [{ href: "/ops", label: "Operations", fullLoad: isLokiWatcher(viewer.sub) }] : []),
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <nav aria-label="Skif" className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 px-6 py-1">
          <Link href="/" className="inline-flex min-h-11 items-center font-semibold">
            Skif
          </Link>
          <AppNav links={links} className="order-last w-full md:order-none md:w-auto md:flex-1" />
          <form
            className="ml-auto flex items-center gap-3 text-sm"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <span className="max-w-32 truncate text-muted">{viewer.name}</span>
            <button type="submit" className="inline-flex min-h-11 items-center text-muted underline hover:text-ink">
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
