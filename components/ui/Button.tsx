import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

const base = "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-[transform,background-color,border-color,color,box-shadow] duration-200 hover:-translate-y-0.5";
const variants = {
  primary: "bg-accent text-white shadow-[0_7px_0_#173d83] hover:bg-ink hover:shadow-[0_7px_0_#0a1021]",
  secondary: "border border-ink/25 bg-white text-ink hover:border-accent hover:text-accent hover:shadow-lg",
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
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
