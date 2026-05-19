import Badge from "@/components/ui/Badge";
import competitionsData from "@/data/competitions.json";
import type { Competition } from "@/lib/types";
import { formatShortDate, daysUntil, difficultyColor } from "@/lib/utils";

const competitions = competitionsData as Competition[];

export const metadata = {
  title: "Competitions — Westwood AI Club",
};

function statusLabel(status: Competition["status"]) {
  if (status === "open") return "Open";
  if (status === "forming") return "Forming Team";
  if (status === "upcoming") return "Upcoming";
  return "Closed";
}

export default function CompetitionsPage() {
  const active = competitions.filter(
    (c) => c.status === "open" || c.status === "forming" || c.status === "upcoming"
  );
  const past = competitions.filter((c) => c.status === "closed");

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Internal & External
          </p>
          <h1
            className="font-serif italic text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Competitions
          </h1>
          <p className="font-sans text-[#8888aa] mt-2 text-sm max-w-xl">
            We compete together — reach out on Discord or email an officer to
            join a team.
          </p>
        </div>

        {/* Active/upcoming */}
        <section className="mb-10">
          <h2 className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
            Active & Upcoming
          </h2>
          <div className="flex flex-col gap-4">
            {active.map((comp) => {
              const days = daysUntil(comp.deadline);
              return (
                <div
                  key={comp.id}
                  className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 card-glow"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <Badge variant={comp.status as "open" | "forming" | "upcoming"}>
                          {statusLabel(comp.status)}
                        </Badge>
                        <span
                          className={`inline-flex items-center font-mono text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider ${difficultyColor(comp.difficulty)}`}
                        >
                          {comp.difficulty}
                        </span>
                        <Badge variant={comp.type === "internal" ? "lesson" : "speaker"}>
                          {comp.type}
                        </Badge>
                      </div>
                      <h3
                        className="font-serif italic text-lg text-[#e8e8f0] mb-1"
                        style={{ fontFamily: "var(--font-instrument-serif)" }}
                      >
                        {comp.name}
                      </h3>
                      <p className="font-mono text-xs text-[#55556a] mb-2">
                        by {comp.organizer}
                      </p>
                      <p className="font-sans text-sm text-[#8888aa] leading-relaxed">
                        {comp.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {comp.prize && (
                        <p className="font-mono text-xs text-[#00ff88] mb-1">
                          {comp.prize}
                        </p>
                      )}
                      <p className="font-mono text-[10px] text-[#55556a]">
                        Deadline: {formatShortDate(comp.deadline)}
                      </p>
                      <p className="font-mono text-[10px] text-[#55556a]">
                        {days > 0 ? `${days} days left` : "Deadline passed"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1e1e2e] flex-wrap gap-3">
                    <p className="font-mono text-[10px] text-[#55556a]">
                      {comp.participants && comp.participants.length > 0
                        ? `${comp.participants.length} member${comp.participants.length > 1 ? "s" : ""} registered`
                        : "No members registered yet"}
                    </p>
                    <a
                      href={comp.link ?? "mailto:wwhs.aiexploration@gmail.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-4 py-1.5 rounded-lg border border-[#b69bff]/30 text-[#b69bff] hover:bg-[#b69bff]/10 transition-colors"
                    >
                      {comp.link ? "Learn More ↗" : "Email to Join"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Past */}
        {past.length > 0 && (
          <section>
            <h2 className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
              Past Competitions
            </h2>
            <div className="flex flex-col gap-3">
              {past.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 opacity-60"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant="closed">Closed</Badge>
                        <Badge variant={comp.type === "internal" ? "lesson" : "speaker"}>
                          {comp.type}
                        </Badge>
                      </div>
                      <h3
                        className="font-serif italic text-base text-[#e8e8f0]"
                        style={{ fontFamily: "var(--font-instrument-serif)" }}
                      >
                        {comp.name}
                      </h3>
                      <p className="font-mono text-xs text-[#55556a]">
                        by {comp.organizer}
                      </p>
                    </div>
                    <div className="text-right">
                      {comp.prize && (
                        <p className="font-mono text-xs text-[#55556a]">
                          {comp.prize}
                        </p>
                      )}
                      <p className="font-mono text-[10px] text-[#55556a]">
                        {formatShortDate(comp.deadline)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
