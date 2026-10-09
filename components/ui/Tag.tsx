import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  tone?: "muted" | "accent";
}

/** Small bordered label for status, difficulty, "hot", etc. Text is always ink-muted or accent, never rule. */
export default function Tag({ children, tone = "muted" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full text-xs font-semibold px-3 py-1 whitespace-nowrap",
        tone === "accent" ? "text-accent bg-blue-soft" : "text-ink-muted bg-paper border border-rule",
      )}
    >
      {children}
    </span>
  );
}
