"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(182,155,255,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(110,231,255,0.06)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
            <span className="font-mono text-xs text-[#8888aa]">
              WESTWOOD HIGH SCHOOL · AUSTIN, TX
            </span>
          </div>

          <h1
            className="font-serif text-5xl sm:text-7xl leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Where Westwood&apos;s{" "}
            <em className="text-[#b69bff] not-italic italic">builders</em>
            <br className="hidden sm:block" /> learn to think with{" "}
            <em className="text-[#6ee7ff] not-italic italic">machines.</em>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#8888aa] max-w-2xl leading-relaxed mb-8">
            We build real AI projects, compete in hackathons and datathons, and
            run weekly lessons on everything from transformers to reinforcement
            learning. No prerequisites — just curiosity.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://discord.gg/7QctqCABR"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm px-5 py-2.5 rounded-lg bg-[#b69bff] text-[#0a0a0f] hover:bg-[#c9b0ff] transition-colors font-medium"
            >
              Join Discord
            </a>
            <Link
              href="/projects"
              className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#2e2e45] text-[#e8e8f0] hover:border-[#b69bff]/40 hover:bg-[#b69bff]/5 transition-colors"
            >
              See Projects →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
