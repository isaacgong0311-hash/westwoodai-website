"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/projects", label: "Projects" },
  { href: "/prompt", label: "Prompt" },
  { href: "/competitions", label: "Compete" },
  { href: "/meetings", label: "Meetings" },
  { href: "/news", label: "News" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e1e2e] bg-[#0a0a0f]/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-mono text-[11px] text-[#55556a]">WWHS</span>
          <span className="font-sans text-sm text-[#e8e8f0]">AI Club</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative font-mono text-[12px] transition-colors py-1 ${
                isActive(href)
                  ? "text-[#e8e8f0]"
                  : "text-[#8888aa] hover:text-[#e8e8f0]"
              }`}
            >
              {label}
              {isActive(href) && (
                <span className="absolute -bottom-[14px] left-0 right-0 h-px bg-[#e8e8f0]" />
              )}
            </Link>
          ))}
        </nav>

        <a
          href="https://discord.gg/7QctqCABR"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex font-mono text-[12px] text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
        >
          Discord ↗
        </a>

        <button
          className="md:hidden p-2 text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-current transition-transform origin-center ${open ? "rotate-45 translate-y-[5px]" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-transform origin-center ${open ? "-rotate-45 -translate-y-[5px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#1e1e2e]">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-mono text-sm px-3 py-2 rounded transition-colors ${
                  isActive(href)
                    ? "bg-[#16161f] text-[#e8e8f0]"
                    : "text-[#8888aa] hover:text-[#e8e8f0]"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://discord.gg/7QctqCABR"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm px-3 py-2 text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
            >
              Discord ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
