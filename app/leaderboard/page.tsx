import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import PointsBreakdown from "@/components/leaderboard/PointsBreakdown";
import PageHeader from "@/components/ui/PageHeader";
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
        <PageHeader
          eyebrow="2026–27 season"
          title="Leaderboard"
          description="Members earn points for showing up, building things, and placing in competitions. The board resets at the start of every school year."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
