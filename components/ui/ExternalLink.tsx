import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * A link that opens in a new tab. Tells screen-reader users that it does
 * (WCAG 3.2.5 / G201) and hides the decorative arrow glyph from them so it
 * isn't read aloud as "north east arrow".
 */
export default function ExternalLink({ href, children, className = "" }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
