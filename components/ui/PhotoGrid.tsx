import Image from "next/image";
import type { Photo } from "@/lib/types";
import { cn } from "@/lib/cn";

interface PhotoGridProps {
  photos: Photo[];
  className?: string;
  /** Passed to next/image so phones don't download desktop-sized files. */
  sizes?: string;
}

/** A plain grid of cropped photos; each keeps its own alt text. */
export default function PhotoGrid({ photos, className, sizes = "(min-width: 1024px) 25vw, 50vw" }: PhotoGridProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2 sm:gap-3", className)}>
      {photos.map((p) => (
        <li key={p.src} className="overflow-hidden rounded-md border border-rule bg-blue-soft">
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes={sizes}
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
