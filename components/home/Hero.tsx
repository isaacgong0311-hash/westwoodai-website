"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Real things this club has done — not generic AI vibes
const SPECIFICS = [
  "brought the CTO of MIT Sloan to Room E1307",
  "presented AI to kids at Spicewood STEAM Day",
  "had a VP of AI walk through cybersecurity",
  "shipped projects to hackathons across Texas",
  "been running since 2019 — six years strong",
  "taught Python to students with zero CS background",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting">("typing");

  useEffect(() => {
    const word = SPECIFICS[idx];
    let t: NodeJS.Timeout;
    if (phase === "typing") {
      if (displayed.length < word.length) {
        t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 40);
      } else {
        t = setTimeout(() => setPhase("waiting"), 2400);
      }
    } else if (phase === "waiting") {
      t = setTimeout(() => setPhase("deleting"), 300);
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20);
      } else {
        setPhase("typing");
        setIdx((i) => (i + 1) % SPECIFICS.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, phase, idx]);

  return (
    <section className="relative pt-16 pb-14 px-4 sm:px-6 overflow-hidden">
      {/* Subtle background — much less glow soup */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_20%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_left,rgba(102,140,220,0.07)_0%,transparent_60%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Badge row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-7 flex-wrap"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#2e2e45] bg-[#111118] font-mono text-[10px] text-[#8888aa] uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
            Westwood HS · Austin, TX
          </span>
          <span className="font-mono text-[10px] text-[#3a3a55]">·</span>
          <span className="font-mono text-[10px] text-[#55556a]">Est. 2019 · Room E1307 · Mr. Kluge</span>
        </motion.div>

        {/* Logo + Title */}
        <div className="flex items-center gap-5 mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="relative flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Westwood AI Club"
              width={64}
              height={64}
              priority
              className="rounded-full ring-1 ring-[#2e2e45]"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-tight text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Westwood{" "}
            <span className="italic" style={{ color: "#7ea3d8" }}>
              AI Club
            </span>
          </motion.h1>
        </div>

        {/* Typewriter — anchored in real facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="flex items-start gap-2 mb-5 min-h-[2.5rem]"
        >
          <span className="font-mono text-base text-[#55556a] mt-0.5 flex-shrink-0">we've</span>
          <span className="font-mono text-base text-[#c8c8e0] leading-tight">
            {displayed}
            <span className="cursor-blink inline-block w-0.5 h-4 bg-[#7ea3d8] align-middle ml-0.5" />
          </span>
        </motion.div>

        {/* Copy — honest, direct, student-voice */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-base text-[#8888aa] max-w-lg leading-relaxed mb-7"
        >
          No experience required. No fees. We meet every other week in Mr.&nbsp;Kluge&apos;s room,
          run through lessons and projects, bring in speakers with real jobs in AI, and enter competitions when we feel like it.{" "}
          <span className="text-[#c8c8e0]">Just show up.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="https://forms.gle/m1a5LrzEBHhacpbg6"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg bg-[#e8e8f0] text-[#0a0a0f] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all font-medium"
          >
            Fill out the interest form
          </a>
          <a
            href="https://discord.gg/7QctqCABR"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#2e2e45] text-[#8888aa] hover:border-[#7ea3d8]/40 hover:text-[#c8c8e0] transition-all"
          >
            Discord ↗
          </a>
          <a
            href="https://www.instagram.com/warriorai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#2e2e45] text-[#8888aa] hover:border-[#8888aa]/40 hover:text-[#c8c8e0] transition-all"
          >
            @warriorai ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
