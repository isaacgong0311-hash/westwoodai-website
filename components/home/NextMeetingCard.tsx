"use client";

import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/types";
import { formatDate, daysUntil } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface NextMeetingCardProps {
  config: SiteConfig["nextMeeting"];
}

export default function NextMeetingCard({ config }: NextMeetingCardProps) {
  const hasMeeting = config.date !== null;
  const days = hasMeeting ? daysUntil(config.date!) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 flex flex-col gap-4 card-glow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
          <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
            Next Meeting
          </span>
        </div>
        {hasMeeting && days !== null && (
          <Badge variant="upcoming">
            {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days}d`}
          </Badge>
        )}
      </div>

      {hasMeeting ? (
        <>
          <div>
            <p
              className="font-serif italic text-xl text-[#e8e8f0] mb-1"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              {config.topic ?? "Topic TBD"}
            </p>
            <p className="font-mono text-xs text-[#8888aa]">
              {formatDate(config.date!)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0a0a0f] rounded-lg px-3 py-2">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-wide mb-1">
                Time
              </p>
              <p className="font-mono text-sm text-[#e8e8f0]">{config.time}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-lg px-3 py-2">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-wide mb-1">
                Room
              </p>
              <p className="font-mono text-sm text-[#e8e8f0]">{config.room}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-[#55556a]">
            {config.teacher}&apos;s room
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <p
            className="font-serif italic text-xl text-[#8888aa]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Schedule TBD
          </p>
          <p className="font-mono text-xs text-[#55556a] leading-relaxed">
            {config.note}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0a0a0f] rounded-lg px-3 py-2">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-wide mb-1">
                Time
              </p>
              <p className="font-mono text-sm text-[#e8e8f0]">{config.time}</p>
            </div>
            <div className="bg-[#0a0a0f] rounded-lg px-3 py-2">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-wide mb-1">
                Room
              </p>
              <p className="font-mono text-sm text-[#e8e8f0]">{config.room}</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/warriorai/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#b69bff] hover:text-[#c9b0ff] transition-colors"
          >
            Follow @warriorai for updates ↗
          </a>
        </div>
      )}
    </motion.div>
  );
}
