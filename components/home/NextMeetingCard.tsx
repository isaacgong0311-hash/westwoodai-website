import type { SiteConfig } from "@/lib/types";
import { formatDate, daysUntil } from "@/lib/utils";

interface NextMeetingCardProps {
  config: SiteConfig["nextMeeting"];
}

export default function NextMeetingCard({ config }: NextMeetingCardProps) {
  const hasMeeting = config.date !== null;
  const days = hasMeeting ? daysUntil(config.date!) : null;

  return (
    <div className="border border-[#1e1e2e] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
          Up next
        </span>
        {hasMeeting && days !== null && days >= 0 && (
          <span className="font-mono text-[10px] text-[#b69bff]">
            {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days} days`}
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
            No date set yet
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
    </div>
  );
}
