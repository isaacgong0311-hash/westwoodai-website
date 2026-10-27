import type { FileFormat } from "@/lib/types";
import { cn } from "@/lib/cn";

export const FORMAT_LABEL: Record<FileFormat, string> = {
  slides: "Slides",
  pptx: "PowerPoint",
  pdf: "PDF",
  notebook: "Colab",
  data: "Dataset",
};

interface FileLinkProps {
  href: string;
  format: FileFormat;
  children: React.ReactNode;
  className?: string;
}

/**
 * An outbound link to a Drive/Slides/Colab file. The format chip is part of
 * the link text, so screen readers hear "Decision Trees, Slides" rather than
 * a bare title, and nobody is surprised when a PowerPoint downloads.
 */
export default function FileLink({ href, format, children, className = "" }: FileLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group inline-flex items-baseline gap-2 font-semibold text-ink hover:text-accent", className)}
    >
      <span className="underline decoration-rule underline-offset-4 group-hover:decoration-accent">{children}</span>
      <span className="sr-only">, </span>
      <span className="shrink-0 rounded-full bg-blue-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent">
        {FORMAT_LABEL[format]}
      </span>
      <span aria-hidden="true" className="text-ink-muted group-hover:text-accent">↗</span>
    </a>
  );
}
