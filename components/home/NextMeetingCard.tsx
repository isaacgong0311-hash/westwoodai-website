"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/types";
import { formatDate, daysUntil } from "@/lib/utils";

interface NextMeetingCardProps {
  config: SiteConfig["nextMeeting"];
}

export default function NextMeetingCard({ config }: NextMeetingCardProps) {
  const hasMeeting = config.date !== null;
  const days = hasMeeting ? daysUntil(config.date!) : null;
  const isSoon = days !== null && days <= 3 && days >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative border rounded-xl p-5 overflow-hidden transition-all duration-300 ${
        isSoon
          ? "border-[#b69bff]/40 bg-[#b69bff]/5 shadow-[0_0_30px_rgba(182,155,255,0.08)]"
          : "border-[#1e1e2e] bg-[#0a0a0f]"
      }`}
    >
      {/* Subtle top accent */}
      {isSoon && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b69bff]/50 to-transparent" />
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
          Up next
        </span>
        {hasMeeting && days !== null && days >= 0 && (
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
              isSoon
                ? "text-[#b69bff] border-[#b69bff]/30 bg-[#b69bff]/10"
                : "text-[#8888aa] border-[#2e2e45]"
            }`}
          >
            {days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `in ${days} days`}
          </span>
        )}
      </div>

      {hasMeeting ? (
        <div className="space-y-3">
          <p className="font-sans text-base text-[#e8e8f0] leading-snug">
            {config.topic ?? "Topic TBD"}
          </p>
          <p className="font-mono text-xs text-[#8888aa]">
            {formatDate(config.date!)} · {config.time}
          </p>
          <p className="font-mono text-xs text-[#55556a]">
            Room {config.room} · {config.teacher}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="font-sans text-base text-[#8888aa] leading-snug">
            Schedule TBD
          </p>
          {config.note && (
            <p className="font-sans text-sm text-[#8888aa] leading-relaxed">
              {config.note}
            </p>
          )}
          <div className="pt-2 border-t border-[#1e1e2e] flex flex-col gap-1">
            <p className="font-mono text-xs text-[#8888aa]">
              {config.time} · Room {config.room}
            </p>
            <p className="font-mono text-xs text-[#55556a]">
              {config.teacher}&apos;s room
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
