import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Photo } from "@/config/photos";

/** A large link with a photograph behind it: the two halves of the site, the
 * Protectors and the Academy. Text sits on a dark gradient, so it reads in
 * both themes whatever the picture. */
export function PhotoCard({
  photo,
  eyebrow,
  title,
  body,
  href,
  label,
}: {
  photo: Photo;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-card bg-black p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-8"
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="-z-10 object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ objectPosition: photo.focus ?? "center" }}
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/5" />
      <span className="font-mono text-xs uppercase tracking-caps text-white/75">{eyebrow}</span>
      <span className="mt-3 font-heading text-3xl font-semibold tracking-display text-white">{title}</span>
      <span className="mt-3 max-w-md leading-relaxed text-white/85">{body}</span>
      <span className="mt-6 inline-flex min-h-11 items-center self-start rounded-full bg-white px-6 text-sm font-medium text-black">
        {label} →
      </span>
    </Link>
  );
}
