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
        "inline-block text-xs px-1.5 py-0.5 border whitespace-nowrap",
        tone === "accent" ? "text-accent border-accent" : "text-ink-muted border-ink-muted/40",
      )}
    >
      {children}
    </span>
  );
}
