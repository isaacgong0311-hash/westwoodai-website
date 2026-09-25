"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/calendar") return pathname.startsWith("/calendar");
    if (href === "/leaderboard") return pathname.startsWith("/leaderboard");
    return false;
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

        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-current transition-transform origin-center duration-200 ${open ? "rotate-45 translate-y-[5px]" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-transform origin-center duration-200 ${open ? "-rotate-45 -translate-y-[5px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-rule">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
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
        </div>
      )}
    </header>
  );
}
