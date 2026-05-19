"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/warriorai/" },
  { label: "Discord", href: "https://discord.gg/7QctqCABR" },
  { label: "GitHub", href: "https://github.com/westwoodai" },
  { label: "Linktree", href: "https://linktr.ee/westwoodhsaiclub" },
  { label: "Email", href: "mailto:wwhs.aiexploration@gmail.com" },
];

const navLinks = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/projects", label: "Projects" },
  { href: "/prompt", label: "Prompt" },
  { href: "/competitions", label: "Compete" },
  { href: "/meetings", label: "Meetings" },
  { href: "/news", label: "News" },
];

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Chicago",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 border-t border-[#1e1e2e] bg-[#0a0a0f] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-2 mb-3">
              <span
                className="font-serif italic text-xl text-[#e8e8f0]"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                Westwood AI Club
              </span>
            </div>
            <p className="font-mono text-xs text-[#8888aa] leading-relaxed max-w-xs">
              Austin, TX · Westwood High School
              <br />
              Room E1307 · Mr. Kluge
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
              <span
                className="font-mono text-xs text-[#8888aa]"
                suppressHydrationWarning
              >
                Austin time: {time || "--:--:--"}
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
              Pages
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-xs text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#8888aa] hover:text-[#b69bff] transition-colors flex items-center gap-1"
                >
                  {label}
                  <span className="text-[#55556a]">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1e1e2e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-[#55556a]">
            © 2026 Westwood AI Club · Built by{" "}
            <a
              href="https://github.com/westwoodai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8888aa] hover:text-[#b69bff] transition-colors"
            >
              Isaac Gong
            </a>
          </p>
          <p className="font-mono text-[10px] text-[#55556a]">
            Westwood High School · Austin Independent School District
          </p>
        </div>
      </div>
    </footer>
  );
}
