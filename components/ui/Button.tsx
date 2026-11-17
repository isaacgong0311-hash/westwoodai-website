import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

const base = "inline-flex items-center min-h-11 text-sm px-5 py-2.5 transition-colors";
const variants = {
  primary: "bg-ink text-paper hover:bg-accent",
  secondary: "text-ink-muted hover:text-ink underline decoration-rule underline-offset-4 hover:decoration-ink",
};

/**
 * The primary/secondary CTA. Replaces four hand-rolled, slightly-different
 * copies (Hero's two buttons, the 404 page's two buttons) that had drifted
 * to different hover-scale magic numbers.
 */
export default function Button({ href, children, variant = "primary", external = false, className = "" }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span aria-hidden="true">&nbsp;↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
