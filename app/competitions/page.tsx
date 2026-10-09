import type { Metadata } from "next";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Tag from "@/components/ui/Tag";
import { competitions, memberName } from "@/lib/content";
import type { Competition } from "@/lib/types";
import { daysUntil, formatShortDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Competitions — Westwood AI Club",
};

// "N days left" is computed at render time; regenerate hourly so it doesn't freeze at build time.
export const revalidate = 3600;

const STATUS: Record<Competition["status"], { label: string; order: number }> = {
  open: { label: "Open", order: 0 },
  forming: { label: "Forming teams", order: 1 },
  upcoming: { label: "Upcoming", order: 2 },
  closed: { label: "Closed", order: 3 },
};

function DeadlineNote({ competition }: { competition: Competition }) {
  const days = daysUntil(competition.deadline);
  if (competition.status === "closed" || days < 0) {
    return <span className="text-ink-muted">Closed {formatShortDate(competition.deadline)}</span>;
  }
  return (
    <span className={days <= 7 ? "text-accent" : "text-ink"}>
      Due {formatShortDate(competition.deadline)} &middot;{" "}
      {days === 0 ? "today" : days === 1 ? "tomorrow" : `${days} days left`}
    </span>
  );
}

export default function CompetitionsPage() {
  const sorted = [...competitions].sort(
    (a, b) => STATUS[a.status].order - STATUS[b.status].order || a.deadline.localeCompare(b.deadline),
  );

  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="What we're entering"
          title="Competitions"
          description="Hackathons, datathons, and challenges we're entering as a club. Deadlines are on the calendar too."
        />

        {competitions.length === 0 ? (
          <EmptyState
            title="Nothing scheduled yet"
            description="No club competitions have been announced here. Know of a challenge the club should enter? Send it to the officers."
            cta={{
              label: "Email us",
              href: "mailto:wwhs.aiexploration@gmail.com",
            }}
          />
        ) : (
          <div className="space-y-4">
            {sorted.map((c) => (
              <article key={c.id} className={`rounded-3xl border border-rule bg-white p-6 shadow-[0_14px_34px_rgba(17,26,51,.05)] ${c.status === "closed" ? "opacity-70" : ""}`}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Tag tone={c.status === "open" ? "accent" : "muted"}>{STATUS[c.status].label}</Tag>
                  <Tag>{c.difficulty[0].toUpperCase() + c.difficulty.slice(1)}</Tag>
                  <Tag>{c.type === "internal" ? "Club-run" : "External"}</Tag>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-ink leading-tight">{c.name}</h2>
                <p className="text-sm text-ink-muted mt-0.5 mb-3">
                  {c.organizer}
                  {c.prize && <> &middot; Prize: {c.prize}</>}
                </p>
                <p className="text-sm leading-relaxed text-ink mb-4">{c.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
                  <DeadlineNote competition={c} />
                  <div className="flex items-center gap-5">
                    <Link href={`/calendar/comp-${c.id}`} className="text-ink-muted hover:text-ink">
                      On the calendar
                    </Link>
                    {c.link && (
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-ink">
                        Details ↗
                      </a>
                    )}
                  </div>
                </div>
                {c.participants && c.participants.length > 0 && (
                  <p className="text-xs text-ink-muted mt-3">
                    Entering: {c.participants.map(memberName).join(", ")}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
