"use client";

import { motion } from "framer-motion";

const items = [
  { label: "When", value: "Every other week", icon: "◷" },
  { label: "Days", value: "Mon / Wed", sub: "alternating", icon: "⟳" },
  { label: "Time", value: "4:30 PM", icon: "◉" },
  { label: "Where", value: "E1307", sub: "Mr. Kluge's room", icon: "⌖" },
];

export default function MeetingInfo() {
  return (
    <div className="border border-[#1e1e2e] rounded-xl overflow-hidden bg-[#0a0a0f]">
      <div className="px-5 py-3 border-b border-[#1e1e2e] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
        <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
          Meeting Schedule
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#1e1e2e]">
        {items.map(({ label, value, sub, icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group px-5 py-5 hover:bg-[#0d0d14] transition-colors duration-200"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[#2e2e45] text-xs group-hover:text-[#b69bff] transition-colors duration-200">
                {icon}
              </span>
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                {label}
              </p>
            </div>
            <p className="font-sans text-sm text-[#e8e8f0] leading-snug">{value}</p>
            {sub && (
              <p className="font-mono text-[10px] text-[#55556a] mt-0.5">{sub}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
