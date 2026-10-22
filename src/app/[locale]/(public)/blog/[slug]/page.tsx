import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "bip-kit/react";
import "bip-kit/styles.css";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/site/page-hero";
import { SHELL } from "@/components/site/shell";
import { PHOTOS } from "@/config/photos";
import { siteText } from "@/config/site";
import { LOCALE_TAGS } from "@/i18n/locales";
import { pageLocale } from "@/i18n/page";
import { BLOG_POSTS, postBySlug, postDate } from "@/site/blog";
import { shareMetadata } from "@/site/share";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return shareMetadata(`/blog/${(await params).slug}`, await pageLocale(params));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const locale = await pageLocale(params);
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  const { BLOG } = siteText(locale);
  return (
    <>
      <PageHero
        eyebrow={`${BLOG.eyebrow} · ${postDate(post.date, LOCALE_TAGS[locale])} · ${BLOG.minutes(post.minutes)}`}
        statement={post.title}
        lead={[post.summary]}
        photo={post.photo ? PHOTOS[post.photo] : undefined}
      />
      <div className={`${SHELL} ${post.photo ? "pt-14" : "pt-4"}`}>
        <ArticleBody blocks={post.blocks} />
        <p className="mt-16 border-t border-subtle pt-6">
          <Link href="/blog" className="inline-flex min-h-11 items-center text-sm font-medium text-fg-primary hover:text-accent">
            ← {BLOG.all}
          </Link>
        </p>
      </div>
    </>
  );
}
