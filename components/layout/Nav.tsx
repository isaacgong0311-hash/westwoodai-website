"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { SiteLink } from "@/lib/content";
import { cn } from "@/lib/cn";

const JOIN_URL = "https://forms.gle/m1a5LrzEBHhacpbg6";

export default function Nav({ links }: { links: SiteLink[] }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    return pathname.startsWith(href);
  }

  const closeMenu = (event: React.MouseEvent<HTMLAnchorElement>) => event.currentTarget.closest("details")?.removeAttribute("open");

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/logo.png" alt="" width={32} height={32} className="rounded-full bg-night" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">Westwood AI Club</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors",
                  active ? "font-medium text-ink underline decoration-accent decoration-2 underline-offset-[22px]" : "text-ink-muted hover:text-ink",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="hidden h-9 items-center rounded-md bg-ink px-3.5 text-sm font-medium text-white transition-colors hover:bg-accent lg:inline-flex">
          Join the club
        </a>

        <details className="group lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-rule bg-white px-3 py-2 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
            </span>
            Menu
          </summary>
          <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-full flex flex-col border-b border-rule bg-paper px-4 py-3 shadow-sm">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn("border-b border-rule py-3 text-[15px] last:border-b-0", isActive(href) ? "font-medium text-accent" : "text-ink")}
              >
                {label}
              </Link>
            ))}
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="mt-3 rounded-md bg-ink px-3 py-3 text-center text-sm font-medium text-white">
              Join the club
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
