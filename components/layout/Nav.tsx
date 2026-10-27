"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { SiteLink } from "@/lib/content";

export default function Nav({ links }: { links: SiteLink[] }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[76px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Westwood AI Club"
            width={40}
            height={40}
            className="rounded-full bg-night p-0.5"
          />
          <span className="text-sm font-black leading-tight tracking-tight text-ink">WESTWOOD <span className="block text-xs font-bold tracking-[.16em] text-accent">AI CLUB</span></span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1 rounded-full border border-rule bg-white/70 p-1.5 shadow-sm">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-blue-soft text-accent"
                    : "text-ink-muted hover:bg-paper hover:text-ink"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <a
          href="https://forms.gle/m1a5LrzEBHhacpbg6"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex min-h-10 items-center rounded-full bg-accent px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-night"
        >
          Join the club ↗
        </a>

        <details className="lg:hidden group">
          <summary className="list-none cursor-pointer rounded-full border border-rule bg-white px-4 py-2.5 text-sm font-bold text-ink flex items-center gap-2 [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
            </span>
            Menu
          </summary>
          <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-full border-b border-rule bg-paper px-4 py-4 flex flex-col gap-1 shadow-xl">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
                className={`rounded-xl text-sm font-semibold px-3 py-3 ${
                  isActive(href) ? "bg-blue-soft text-accent" : "text-ink"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://forms.gle/m1a5LrzEBHhacpbg6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
              className="rounded-xl bg-accent px-3 py-3 text-sm font-bold text-white"
            >
              Join the club ↗
            </a>
            <a href="https://discord.gg/7QctqCABR" target="_blank" rel="noopener noreferrer" onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")} className="rounded-xl px-3 py-3 text-sm font-semibold text-ink-muted">Discord ↗</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
