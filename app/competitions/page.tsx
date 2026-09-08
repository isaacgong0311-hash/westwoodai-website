import competitionsData from "@/data/competitions.json";
import type { Competition } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const competitions = competitionsData as Competition[];

export const metadata = {
  title: "Competitions — Westwood AI Club",
};

export default function CompetitionsPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="What we're entering"
          title="Competitions"
          description="Hackathons, datathons, and challenges we're entering as a club."
        />

        {competitions.length === 0 ? (
          <EmptyState
            title="Nothing scheduled yet"
            description="We'll add competitions after the kickoff meeting. Know of one we should enter? Let us know."
            cta={{
              label: "Email us",
              href: "mailto:wwhs.aiexploration@gmail.com",
            }}
          />
        ) : (
          <div>{/* list renders here once competitions.json has entries */}</div>
        )}
      </div>
    </div>
  );
}
