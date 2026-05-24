"use client";

import Link from "next/link";
import Image from "next/image";
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

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e1e2e] bg-[#0a0a0f]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(182,155,255,0.3)_0%,transparent_70%)] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
            <Image
              src="/logo.png"
              alt="Westwood AI Club"
              width={28}
              height={28}
              className="relative rounded-full"
            />
          </div>
          <span className="font-mono text-sm text-[#e8e8f0] group-hover:text-white transition-colors">
            AI Club
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative font-mono text-[12px] transition-colors px-3 py-1.5 rounded-md ${
                  active
                    ? "text-[#e8e8f0] bg-[#16161f]"
                    : "text-[#8888aa] hover:text-[#e8e8f0] hover:bg-[#111118]"
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-[#16161f] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Discord CTA */}
        <a
          href="https://discord.gg/7QctqCABR"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 font-mono text-[12px] px-3 py-1.5 rounded-lg border border-[#2e2e45] text-[#8888aa] hover:text-[#b69bff] hover:border-[#b69bff]/30 hover:bg-[#b69bff]/5 transition-all"
        >
          Discord ↗
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-[#1e1e2e] overflow-hidden"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-sm px-3 py-2 rounded-lg transition-colors ${
                    isActive(href)
                      ? "bg-[#16161f] text-[#e8e8f0]"
                      : "text-[#8888aa] hover:text-[#e8e8f0] hover:bg-[#111118]"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://discord.gg/7QctqCABR"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm px-3 py-2 text-[#8888aa] hover:text-[#b69bff] transition-colors"
              >
                Discord ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
