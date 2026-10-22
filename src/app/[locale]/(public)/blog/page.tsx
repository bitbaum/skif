import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/site/page-hero";
import { LABEL, SHELL } from "@/components/site/shell";
import { siteText } from "@/config/site";
import { LOCALE_TAGS } from "@/i18n/locales";
import { pageLocale, type LocaleParams } from "@/i18n/page";
import { BLOG_POSTS, postDate } from "@/site/blog";
import { shareMetadata } from "@/site/share";

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return shareMetadata("/blog", await pageLocale(params));
}

export default async function BlogPage({ params }: { params: LocaleParams }) {
  const locale = await pageLocale(params);
  const { BLOG } = siteText(locale);
  return (
    <>
      <PageHero eyebrow={BLOG.eyebrow} statement={BLOG.statement} lead={[BLOG.lead]} />
      <div className={`${SHELL} pt-4`}>
        <ul className="border-t border-subtle">
          {BLOG_POSTS.map((p) => (
            <li key={p.slug} className="border-b border-subtle">
              <Link
                href={`/blog/${p.slug}`}
                className="group flex min-h-11 flex-col gap-2 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className={LABEL}>
                  <time dateTime={p.date}>{postDate(p.date, LOCALE_TAGS[locale])}</time> · {BLOG.minutes(p.minutes)}
                </span>
                <span className="font-heading text-2xl font-semibold tracking-display text-fg-primary group-hover:text-accent">
                  {p.title}
                  <span aria-hidden>{" "}→</span>
                </span>
                <span className="max-w-prose text-base leading-relaxed text-fg-secondary">{p.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
