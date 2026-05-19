import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import PointsBreakdown from "@/components/leaderboard/PointsBreakdown";
import membersData from "@/data/members.json";
import type { Member } from "@/lib/types";

const members = membersData as Member[];

export const metadata = {
  title: "Leaderboard — Westwood AI Club",
};

export default function LeaderboardPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            2026–27 Season
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Leaderboard
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Points earned through attendance, projects, and competitions. Click
            a column to sort.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LeaderboardTable members={members} />
          </div>
          <div>
            <PointsBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
