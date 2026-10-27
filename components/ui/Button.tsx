import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

const base = "inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-medium transition-colors";
const variants = {
  primary: "bg-ink text-white hover:bg-accent",
  secondary: "border border-rule bg-white text-ink hover:border-ink",
};

/** The primary/secondary call-to-action link, styled as a button. */
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
