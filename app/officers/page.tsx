import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import { officers } from "@/lib/content";
import type { OfficerYear } from "@/lib/types";

export const metadata = {
  title: "Officers & Sponsor — Westwood AI Club",
  description: "This year's Westwood AI Club officer team, our sponsor, and every officer team since 2019.",
};

function OfficerList({ team }: { team: OfficerYear }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      {team.officers.map((o) => (
        <div key={o.role + o.name} className="flex items-baseline justify-between gap-4 py-3 border-b border-rule">
          <dt className="text-sm text-ink-muted">{o.role}</dt>
          <dd className="text-sm text-ink text-right">{o.name}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function OfficersPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          eyebrow="Who runs the club"
          title="Officers & sponsor"
          description="Students run every part of the club: lessons, competitions, outreach, and this website."
        />

        <section aria-labelledby="sponsor-heading" className="mb-14">
          <SectionHeader title="Club sponsor" id="sponsor-heading" />
          <p className="text-base text-ink py-3">
            {officers.sponsor} &middot; <span className="text-ink-muted">Room E1307</span>
          </p>
        </section>

        <section aria-labelledby="current-heading" className="mb-14">
          <SectionHeader title={`${officers.current.year} officers`} id="current-heading" count={`${officers.current.officers.length} people`} />
          <OfficerList team={officers.current} />
        </section>

        <section aria-labelledby="past-heading">
          <SectionHeader title="Previous officers" id="past-heading" count={`since ${officers.past[officers.past.length - 1].year}`} />
          {officers.past.map((team) => (
            <div key={team.year} className="mt-8">
              <h3 className="text-sm uppercase tracking-wider text-ink-muted mb-1">{team.year}</h3>
              <OfficerList team={team} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
