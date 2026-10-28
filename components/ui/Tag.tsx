import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  tone?: "muted" | "accent";
}

/** Small label for status, difficulty, "hot", etc. */
export default function Tag({ children, tone = "muted" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded px-2 py-0.5 text-xs font-medium",
        tone === "accent" ? "bg-blue-soft text-accent" : "border border-rule bg-white text-ink-muted",
      )}
    >
      {children}
    </span>
  );
}
