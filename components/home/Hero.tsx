"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const WORDS = [
  "build AI tools",
  "enter hackathons",
  "learn machine learning",
  "ship cool projects",
  "experiment with LLMs",
  "discuss what matters",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting">("typing");

  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setPhase("waiting"), 1800);
      }
    } else if (phase === "waiting") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setPhase("typing");
        setWordIndex((i) => (i + 1) % WORDS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex]);

  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Grid lines with radial fade */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_30%,transparent_100%)]" />
        {/* Glow orbs */}
        <div className="absolute -top-10 left-1/4 w-[600px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(102,140,220,0.14)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-32 right-1/4 w-[500px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(182,155,255,0.09)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(110,231,255,0.05)_0%,transparent_70%)] blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-[#2e2e45] bg-[#111118]/80 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
          <span className="font-mono text-[11px] text-[#8888aa]">
            Westwood High · Austin, TX · Est. 2022 · Room E1307
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block mb-5"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(182,155,255,0.35)_0%,transparent_70%)] blur-xl scale-150" />
          <Image
            src="/logo.png"
            alt="Westwood AI Club logo"
            width={72}
            height={72}
            priority
            className="relative rounded-full ring-1 ring-[#2e2e45] ring-offset-2 ring-offset-[#0a0a0f]"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-7xl leading-[1.05] tracking-tight text-[#e8e8f0] mb-5 max-w-3xl"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Westwood{" "}
          <span className="bg-gradient-to-r from-[#7ea3d8] via-[#b69bff] to-[#c47855] bg-clip-text text-transparent italic">
            AI Club
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center gap-2 mb-6 h-9"
        >
          <span className="font-mono text-lg sm:text-xl text-[#55556a]">we</span>
          <span className="font-mono text-lg sm:text-xl text-[#b69bff]">
            {displayed}
            <span className="ml-0.5 inline-block w-0.5 h-5 bg-[#b69bff] align-middle cursor-blink" />
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-base sm:text-lg text-[#8888aa] max-w-xl leading-relaxed mb-8"
        >
          We meet every other week in Mr. Kluge&apos;s room, build stuff, enter
          comps, and trade what we&apos;ve been learning.{" "}
          <span className="text-[#e8e8f0] font-medium">Show up — that&apos;s it.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="https://discord.gg/7QctqCABR"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg bg-[#e8e8f0] text-[#0a0a0f] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all font-medium shadow-[0_0_24px_rgba(232,232,240,0.1)]"
          >
            Hop in the Discord
          </a>
          <a
            href="https://forms.gle/m1a5LrzEBHhacpbg6"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#b69bff]/30 text-[#b69bff] bg-[#b69bff]/5 hover:bg-[#b69bff]/10 hover:border-[#b69bff]/60 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(182,155,255,0.08)]"
          >
            Join the club →
          </a>
          <a
            href="https://www.instagram.com/warriorai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#2e2e45] text-[#8888aa] hover:border-[#6ee7ff]/40 hover:text-[#6ee7ff] transition-all"
          >
            @warriorai
          </a>
        </motion.div>
      </div>
    </section>
  );
}
