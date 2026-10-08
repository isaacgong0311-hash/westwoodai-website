import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import PointsBreakdown from "@/components/leaderboard/PointsBreakdown";
import PageHeader from "@/components/ui/PageHeader";
import Panel from "@/components/ui/Panel";
import configData from "@/data/config.json";
import { members as fallbackMembers } from "@/lib/content";
import { getLeaderboard } from "@/lib/leaderboard";
import type { SiteConfig } from "@/lib/types";

const config = configData as SiteConfig;

export const metadata = {
  title: "Leaderboard — Westwood AI Club",
};

// Standings come from the check-in sheet; regenerate every 15 minutes.
export const revalidate = 900;

export default async function LeaderboardPage() {
  const live = await getLeaderboard();
  const members = live ?? fallbackMembers;

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="2026–27 season"
          title="Leaderboard"
          description="Members earn points for showing up, building things, and placing in competitions. The board resets at the start of every school year."
        />

        {!live && (
          <Panel raised className="px-5 py-4 mb-8">
            <p className="text-sm leading-relaxed text-ink">
              Live scoring is not connected yet. The names below are the officer roster, shown with zero points as a preview of the board.
            </p>
          </Panel>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <LeaderboardTable members={members} />
          </div>
          <div>
            <PointsBreakdown />
            {live && (
              <p className="text-sm leading-relaxed text-ink-muted mt-6 pt-6 border-t border-rule">
                Attendance counts when you check in at a meeting with the code officers announce
                {config.checkinUrl && (
                  <>
                    {" "}
                    (
                    <a
                      href={config.checkinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-ink"
                    >
                      check-in form ↗
                    </a>
                    )
                  </>
                )}
                . Standings update about every 15 minutes.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
