import { AppNav, type AppNavLink } from "@/components/app-nav";
import { PublicFooter } from "@/components/site/public-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SHELL } from "@/components/site/shell";
import { MY_SKIF } from "@/config/site";
import { isLokiWatcher, requireViewer } from "@/server/viewer";

/** Signed in, Skif looks and moves exactly as it does signed out: the same
 * header (with the fleet account menu) and footer, plus one row of the
 * person's own sections under it. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireViewer();
  const links: AppNavLink[] = [
    ...MY_SKIF.sections,
    { href: MY_SKIF.protector.href, label: viewer.protector ? MY_SKIF.protector.jobs : MY_SKIF.protector.label },
    ...(viewer.isOps ? [{ href: MY_SKIF.ops.href, label: MY_SKIF.ops.label, fullLoad: isLokiWatcher(viewer.sub) }] : []),
  ];

  return (
    <>
      <SiteHeader account={{ name: viewer.name }} />
      <div className="border-b border-subtle bg-surface-page">
        <AppNav links={links} className={SHELL} />
      </div>
      <main className={`${SHELL} py-8`}>{children}</main>
      <PublicFooter />
    </>
  );
}
