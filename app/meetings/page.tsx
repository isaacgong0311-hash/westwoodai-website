import meetingsData from "@/data/meetings.json";
import type { Meeting } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Panel from "@/components/ui/Panel";
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
        <PageHeader
          eyebrow="Every other week · 4:30 PM · Room E1307"
          title="Meetings"
          description="Meetings alternate Mondays and Wednesdays in Mr. Kluge's room."
        />

        {upcoming && (
          <div className="mb-10">
            <h2 className="text-xs uppercase tracking-wider text-ink-muted mb-3">Next up</h2>
            <Panel raised className="p-5">
              <p className="text-xs uppercase tracking-wider text-accent mb-2">
                {typeLabels[upcoming.type]}
              </p>
              <h3 className="text-lg text-ink mb-1">{upcoming.topic}</h3>
              <p className="text-sm text-ink-muted">{upcoming.presenter}</p>
              <p className="text-sm text-ink-muted mt-1">
                {upcoming.date ? formatDate(upcoming.date) : "Date TBD"}
              </p>
              {upcoming.notes && (
                <p className="text-sm leading-relaxed text-ink mt-3">{upcoming.notes}</p>
              )}
            </Panel>
          </div>
        )}

        <div>
          <h2 className="text-xs uppercase tracking-wider text-ink-muted mb-3">Archive</h2>
          {past.length === 0 ? (
            <EmptyState
              title="Nothing logged yet"
              description="Once the year starts, every meeting will be listed here with the topic, presenter, and slides."
            />
          ) : (
            <div className="divide-y divide-rule">
              {past.map((m) => (
                <div key={m.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-accent mb-1">
                      {typeLabels[m.type]}
                    </p>
                    <p className="text-sm text-ink">{m.topic}</p>
                    <p className="text-sm text-ink-muted mt-0.5">{m.presenter}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-ink-muted">
                      {m.date ? formatDate(m.date) : "TBD"}
                    </p>
                    {m.slidesUrl && (
                      <a
                        href={m.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-muted hover:text-ink"
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
