"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-14 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(102,140,220,0.10)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(190,110,70,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-6"
        >
          <Image
            src="/logo.png"
            alt="Westwood AI Club logo"
            width={80}
            height={80}
            priority
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] text-[#55556a] uppercase tracking-widest">
              Westwood High · Austin, TX
            </p>
            <p className="font-mono text-[11px] text-[#8888aa]">
              Est. 2022 · Room E1307
            </p>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-7xl leading-[1.05] tracking-tight text-[#e8e8f0] mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Westwood{" "}
          <span className="bg-gradient-to-r from-[#7ea3d8] to-[#c47855] bg-clip-text text-transparent italic">
            AI Club
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-base sm:text-lg text-[#8888aa] max-w-2xl leading-relaxed mb-8"
        >
          We&apos;re a bunch of students who like messing around with AI. We
          meet every other week in Mr. Kluge&apos;s room, build stuff, enter
          comps, and trade what we&apos;ve been learning. Show up — that&apos;s
          it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="https://discord.gg/7QctqCABR"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg bg-[#e8e8f0] text-[#0a0a0f] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all font-medium"
          >
            Hop in the Discord
          </a>
          <a
            href="https://www.instagram.com/warriorai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-5 py-2.5 rounded-lg border border-[#2e2e45] text-[#e8e8f0] hover:border-[#7ea3d8]/50 hover:bg-[#111118] transition-all"
          >
            @warriorai
          </a>
        </motion.div>
      </div>
    </section>
  );
}
