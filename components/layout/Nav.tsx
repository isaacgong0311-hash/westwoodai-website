"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e1e2e] bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xs text-[#8888aa] group-hover:text-[#b69bff] transition-colors">
            WWHS
          </span>
          <span
            className="font-serif italic text-[#e8e8f0] text-lg leading-none"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            AI Club
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-1.5 font-mono text-xs transition-colors rounded-md ${
                  active
                    ? "text-[#e8e8f0]"
                    : "text-[#8888aa] hover:text-[#e8e8f0]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#16161f] border border-[#2e2e45] rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Discord CTA */}
        <a
          href="https://discord.gg/7QctqCABR"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-md bg-[#b69bff]/10 border border-[#b69bff]/20 text-[#b69bff] hover:bg-[#b69bff]/20 transition-colors"
        >
          <span>Join Discord</span>
          <span>↗</span>
        </a>

        {/* Mobile menu button */}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[#1e1e2e]"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {links.map(({ href, label }) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`font-mono text-sm px-3 py-2 rounded-md transition-colors ${
                      active
                        ? "bg-[#16161f] text-[#e8e8f0] border border-[#2e2e45]"
                        : "text-[#8888aa] hover:text-[#e8e8f0]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <a
                href="https://discord.gg/7QctqCABR"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 font-mono text-sm px-3 py-2 rounded-md bg-[#b69bff]/10 border border-[#b69bff]/20 text-[#b69bff] text-center"
              >
                Join Discord ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
