"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/types";

interface StatsBarProps {
  stats: SiteConfig["stats"];
}

const statLabels = [
  { key: "members" as const, label: "Members", suffix: "" },
  { key: "projects" as const, label: "Projects Built", suffix: "" },
  { key: "competitions" as const, label: "Competitions", suffix: "" },
  { key: "yearsRunning" as const, label: "Years Running", suffix: "" },
];

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="relative z-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1e1e2e] rounded-xl overflow-hidden border border-[#1e1e2e]">
          {statLabels.map(({ key, label }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="bg-[#111118] px-6 py-5 flex flex-col gap-1"
            >
              <span
                className="font-serif text-3xl sm:text-4xl text-[#e8e8f0]"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                {stats[key]}
                {key === "yearsRunning" ? "+" : "+"}
              </span>
              <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
