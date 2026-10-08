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
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Westwood AI Club"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-ink">Westwood AI Club</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm pb-0.5 ${
                  active
                    ? "text-accent border-b border-accent"
                    : "text-ink hover:text-accent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <a
          href="https://discord.gg/7QctqCABR"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex text-sm text-ink-muted hover:text-ink"
        >
          Discord ↗
        </a>

        <details className="md:hidden group">
          <summary className="list-none cursor-pointer p-2 text-sm text-ink flex items-center gap-2 [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="flex w-4 flex-col gap-1">
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
            </span>
            Menu
          </summary>
          <nav aria-label="Mobile navigation" className="absolute left-0 right-0 top-full border-b border-rule bg-paper px-4 py-3 flex flex-col gap-1 shadow-sm">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm px-3 py-2 ${
                  isActive(href) ? "text-accent" : "text-ink"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://discord.gg/7QctqCABR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-2 text-ink-muted"
            >
              Discord ↗
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
