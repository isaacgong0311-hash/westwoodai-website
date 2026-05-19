import competitionsData from "@/data/competitions.json";
import type { Competition } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";

const competitions = competitionsData as Competition[];

export const metadata = {
  title: "Competitions — Westwood AI Club",
};

export default function CompetitionsPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            What we&apos;re entering
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Competitions
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Hackathons, datathons, and our own challenges. Want in on a team?
            Ping Aarav on Discord.
          </p>
        </div>

        {competitions.length === 0 ? (
          <EmptyState
            title="Nothing on the slate yet"
            description="We'll line up the year's comps after the kickoff meeting. Spotted one we should hit? Let us know."
            cta={{
              label: "Email us",
              href: "mailto:wwhs.aiexploration@gmail.com",
            }}
          />
        ) : (
          <div>{/* list renders here */}</div>
        )}
      </div>
    </div>
  );
}
