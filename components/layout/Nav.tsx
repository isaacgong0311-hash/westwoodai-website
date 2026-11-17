"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import ExternalLink from "@/components/ui/ExternalLink";

const links = [
  { href: "/", label: "Home" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/leaderboard") return pathname.startsWith("/leaderboard");
    return false;
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm"
      onKeyDown={(e) => {
        // WCAG 2.1.1 / ARIA APG: Escape dismisses the open menu and returns focus to its trigger.
        if (e.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 min-h-11">
          <Image
            src="/logo.png"
            alt=""
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-ink">Westwood AI Club</span>
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`text-sm py-2 border-b ${
                  active
                    ? "text-accent border-accent"
                    : "text-ink border-transparent hover:text-accent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <ExternalLink
          href="https://discord.gg/7QctqCABR"
          className="hidden md:inline-flex items-center min-h-11 text-sm text-ink-muted hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink"
        >
          Join our Discord
        </ExternalLink>

        <button
          ref={menuButton}
          type="button"
          className="md:hidden p-3 -mr-3 text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="w-5 flex flex-col gap-1.5" aria-hidden="true">
            <span
              className={`block h-0.5 bg-current transition-transform origin-center duration-200 ${open ? "rotate-45 translate-y-[8px]" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-transform origin-center duration-200 ${open ? "-rotate-45 -translate-y-[8px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-rule">
          <nav aria-label="Mobile" className="px-4 py-3 flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={`text-base px-3 py-3 min-h-11 ${
                  isActive(href) ? "text-accent" : "text-ink"
                }`}
              >
                {label}
              </Link>
            ))}
            <ExternalLink
              href="https://discord.gg/7QctqCABR"
              className="text-base px-3 py-3 min-h-11 text-ink-muted"
            >
              Join our Discord
            </ExternalLink>
          </nav>
        </div>
      )}
    </header>
  );
}
