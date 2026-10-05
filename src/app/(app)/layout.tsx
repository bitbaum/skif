import Link from "next/link";
import { Account } from "@/components/account";
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
          <div className="ml-auto">
            <Account name={viewer.name} />
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
