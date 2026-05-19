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
            Internal & External
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Competitions
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Hackathons, datathons, and internal challenges the club is entering.
            Reach out to Aarav (VP of Competition) on Discord to join a team.
          </p>
        </div>

        {competitions.length === 0 ? (
          <EmptyState
            title="No competitions listed"
            description="The competition slate for the year goes up after the kickoff meeting. If you've spotted one we should enter, send it to the VP of Competition."
            cta={{
              label: "Email an officer",
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
