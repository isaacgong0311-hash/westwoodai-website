import Badge from "@/components/ui/Badge";
import meetingsData from "@/data/meetings.json";
import type { Meeting } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const meetings = meetingsData as Meeting[];

export const metadata = {
  title: "Meetings — Westwood AI Club",
};

const typeLabels: Record<string, string> = {
  lesson: "Lesson",
  speaker: "Guest Speaker",
  workshop: "Workshop",
  competition: "Comp Prep",
  social: "Social / Event",
};

export default function MeetingsPage() {
  const upcoming = meetings.find((m) => m.isUpcoming);
  const past = meetings.filter((m) => !m.isUpcoming);

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Every other week · 4:30 PM · Room E1307
          </p>
          <h1
            className="font-serif italic text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Meetings
          </h1>
          <p className="font-sans text-[#8888aa] mt-2 text-sm max-w-xl">
            Alternating Mondays and Wednesdays. Mr. Kluge&apos;s room.
          </p>
        </div>

        {/* Upcoming */}
        {upcoming && (
          <div className="mb-10">
            <h2 className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
              Next Up
            </h2>
            <div className="bg-[#111118] border border-[#b69bff]/20 rounded-xl p-6 relative overflow-hidden card-glow">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_50%,rgba(182,155,255,0.06)_0%,transparent_70%)] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
                  <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                    Coming Up
                  </span>
                </div>
                <Badge variant={upcoming.type as "lesson" | "speaker" | "workshop" | "competition" | "social"} className="mb-3">
                  {typeLabels[upcoming.type]}
                </Badge>
                <h3
                  className="font-serif italic text-2xl text-[#e8e8f0] mb-2"
                  style={{ fontFamily: "var(--font-instrument-serif)" }}
                >
                  {upcoming.topic}
                </h3>
                <p className="font-mono text-sm text-[#8888aa] mb-1">
                  {upcoming.presenter}
                </p>
                <p className="font-mono text-xs text-[#55556a]">
                  {upcoming.date ? formatDate(upcoming.date) : "Date TBD — watch @warriorai on Instagram"}
                </p>
                {upcoming.notes && (
                  <p className="font-sans text-sm text-[#8888aa] mt-3 leading-relaxed">
                    {upcoming.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Archive */}
        <div>
          <h2 className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
            Archive
          </h2>
          <div className="flex flex-col gap-3">
            {past.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 card-glow"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge variant={meeting.type as "lesson" | "speaker" | "workshop" | "competition" | "social"}>
                        {typeLabels[meeting.type]}
                      </Badge>
                    </div>
                    <h3
                      className="font-serif italic text-base sm:text-lg text-[#e8e8f0] mb-1"
                      style={{ fontFamily: "var(--font-instrument-serif)" }}
                    >
                      {meeting.topic}
                    </h3>
                    <p className="font-mono text-xs text-[#8888aa]">
                      {meeting.presenter}
                    </p>
                    {meeting.notes && (
                      <p className="font-sans text-xs text-[#55556a] mt-2 leading-relaxed">
                        {meeting.notes}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right flex flex-col items-end gap-2">
                    <p className="font-mono text-xs text-[#55556a]">
                      {meeting.date ? formatDate(meeting.date) : "TBD"}
                    </p>
                    {meeting.slidesUrl && (
                      <a
                        href={meeting.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs px-3 py-1 rounded-lg border border-[#6ee7ff]/30 text-[#6ee7ff] hover:bg-[#6ee7ff]/10 transition-colors"
                      >
                        Slides ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
