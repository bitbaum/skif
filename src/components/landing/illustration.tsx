import Image from "next/image";
import type { Art } from "@/config/landing";

/** A landing illustration. SVGs are served as they are (next/image leaves
 * .svg unoptimized), so this only fixes the box and the alt text. */
export function Illustration({ art, priority, sizes, className = "" }: { art: Art; priority?: boolean; sizes: string; className?: string }) {
  return (
    <Image
      src={art.src}
      alt={art.alt}
      width={art.width}
      height={art.height}
      priority={priority}
      sizes={sizes}
      className={`h-auto w-full ${className}`}
    />
  );
}
