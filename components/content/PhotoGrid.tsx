import Image from "next/image";
import type { Photo } from "@/lib/types";

interface PhotoGridProps {
  photos: Photo[];
  /** Tailwind grid-cols classes; defaults to 2 columns, 3 on wide screens. */
  columns?: string;
  sizes?: string;
}

export default function PhotoGrid({
  photos,
  columns = "grid-cols-2 lg:grid-cols-3",
  sizes = "(min-width: 1024px) 33vw, 50vw",
}: PhotoGridProps) {
  return (
    <ul className={`grid ${columns} gap-3`}>
      {photos.map((p) => (
        <li key={p.src}>
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            sizes={sizes}
            className="w-full h-full aspect-[4/3] object-cover bg-paper-raised"
          />
        </li>
      ))}
    </ul>
  );
}
