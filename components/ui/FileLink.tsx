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
 * An outbound link to a Drive/Slides/Colab file. The format is part of the
 * link text, so screen readers hear "Decision Trees, Slides" rather than a
 * bare title, and nobody is surprised when a PowerPoint downloads.
 */
export default function FileLink({ href, format, children, className = "" }: FileLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group inline-flex items-baseline gap-2 text-ink", className)}
    >
      <span className="font-medium underline decoration-rule decoration-1 underline-offset-[5px] group-hover:text-accent group-hover:decoration-accent">
        {children}
      </span>
      <span className="sr-only">, </span>
      <span className="shrink-0 font-mono text-[11px] text-ink-muted">{FORMAT_LABEL[format]}</span>
    </a>
  );
}
