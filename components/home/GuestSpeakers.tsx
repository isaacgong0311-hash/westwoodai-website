"use client";

import { motion } from "framer-motion";

const SPEAKERS = [
  {
    name: "Bryan Mishkin",
    title: "CTO",
    org: "MIT Sloan Management",
    topic: "AI as a Partner",
    year: "2026",
  },
  {
    name: "Dr. Dean Teffer",
    title: "VP of AI",
    org: "Arctic Wolf",
    topic: "AI in Cybersecurity",
    year: "2026",
  },
  {
    name: "Keith Moore",
    title: "CEO",
    org: "AutoScheduler.AI",
    topic: "Life, Supply Chain & AI",
    year: "2025",
  },
  {
    name: "Myra D'Souza",
    title: "Co-founder & CEO",
    org: "Autyn",
    topic: "AI in Mortgage Processing",
    year: "2025",
  },
  {
    name: "Dr. C. J. Paul",
    title: "Global CTO Office",
    org: "Kyndryl / IBM",
    topic: "Real-time AI at Scale",
    year: "2025",
  },
  {
    name: "Anshul Moondra",
    title: "ML Engineer",
    org: "Independent",
    topic: "ML in Baseball Analytics",
    year: "2025",
  },
  {
    name: "Sarah Griffin",
    title: "SWE",
    org: "Dell",
    topic: "The Future of AI",
    year: "2023",
  },
];

export default function GuestSpeakers() {
  return (
    <section className="px-4 sm:px-6 pb-14">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-3 mb-5"
        >
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
            Guest Speakers
          </p>
          <div className="flex-1 h-px bg-[#1e1e2e]" />
          <span className="font-mono text-[10px] text-[#3a3a55]">
            {SPEAKERS.length} speakers since 2022
          </span>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-max sm:w-auto">
            {SPEAKERS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="w-56 sm:w-auto flex-shrink-0 border border-[#1e1e2e] rounded-xl p-4 bg-[#0a0a0f] hover:bg-[#0d0d14] hover:border-[#2e2e45] transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full border border-[#2e2e45] bg-[#111118] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] text-[#55556a]">
                      {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#3a3a55]">{s.year}</span>
                </div>
                <p className="font-sans text-sm text-[#e8e8f0] leading-snug mb-1 group-hover:text-white transition-colors">
                  {s.name}
                </p>
                <p className="font-mono text-[10px] text-[#7ea3d8] mb-2">
                  {s.title} · {s.org}
                </p>
                <p className="font-sans text-xs text-[#55556a] leading-snug italic">
                  &ldquo;{s.topic}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="mt-3 font-mono text-[10px] text-[#3a3a55]">
          Scroll → on mobile
        </p>
      </div>
    </section>
  );
}
