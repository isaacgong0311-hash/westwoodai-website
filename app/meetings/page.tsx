import meetingsData from "@/data/meetings.json";
import type { Meeting } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
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
  social: "Social",
};

export default function MeetingsPage() {
  const upcoming = meetings.find((m) => m.isUpcoming);
  const past = meetings.filter((m) => !m.isUpcoming);

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Every other week · 4:30 PM · Room E1307
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Meetings
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Mondays and Wednesdays, switching off every week. Mr. Kluge&apos;s
            room. Snacks sometimes.
          </p>
        </div>

        {upcoming && (
          <div className="mb-8">
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-3">
              Next Up
            </p>
            <div className="border border-[#1e1e2e] rounded-xl p-5">
              <p className="font-mono text-[11px] text-[#b69bff] uppercase tracking-wider mb-2">
                {typeLabels[upcoming.type]}
              </p>
              <h3 className="font-sans text-lg text-[#e8e8f0] mb-1">
                {upcoming.topic}
              </h3>
              <p className="font-mono text-xs text-[#8888aa]">
                {upcoming.presenter}
              </p>
              <p className="font-mono text-xs text-[#55556a] mt-1">
                {upcoming.date ? formatDate(upcoming.date) : "Date TBD"}
              </p>
              {upcoming.notes && (
                <p className="font-sans text-sm text-[#8888aa] mt-3 leading-relaxed">
                  {upcoming.notes}
                </p>
              )}
            </div>
          </div>
        )}

        <div>
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-3">
            Archive
          </p>
          {past.length === 0 ? (
            <EmptyState
              title="Nothing logged yet"
              description="Once the year kicks off, every meeting shows up here with the topic, who ran it, and the slides. We don't backfill old years."
            />
          ) : (
            <div className="border border-[#1e1e2e] rounded-xl divide-y divide-[#1e1e2e]">
              {past.map((m) => (
                <div
                  key={m.id}
                  className="px-5 py-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-[#b69bff] uppercase tracking-wider mb-1">
                      {typeLabels[m.type]}
                    </p>
                    <p className="font-sans text-sm text-[#e8e8f0]">
                      {m.topic}
                    </p>
                    <p className="font-mono text-[11px] text-[#55556a] mt-0.5">
                      {m.presenter}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-[11px] text-[#55556a]">
                      {m.date ? formatDate(m.date) : "TBD"}
                    </p>
                    {m.slidesUrl && (
                      <a
                        href={m.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
                      >
                        Slides ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
