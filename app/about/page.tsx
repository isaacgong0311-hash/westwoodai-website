import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import configData from "@/data/config.json";
import { lessonYears, members, pastTeams, sponsor, talks } from "@/lib/content";
import type { SiteConfig } from "@/lib/types";

const config = configData as SiteConfig;

export const metadata: Metadata = {
  title: "About",
  description: "What the Westwood AI Club does, who runs it, and how to stay in the loop.",
};

const CHANNELS = [
  { label: "Interest form", detail: "Puts you on the mailing list for meeting dates, speakers, and competitions.", href: "https://forms.gle/m1a5LrzEBHhacpbg6" },
  { label: "Discord", detail: "Meeting reminders, and where members talk between meetings.", href: "https://discord.gg/7QctqCABR" },
  { label: "Instagram, @warriorai", detail: "Reminders and meeting recaps.", href: "https://www.instagram.com/warriorai/" },
  { label: "GitHub, westwoodai", detail: "Code from demos and coding activities.", href: "https://github.com/westwoodai" },
  { label: "Email", detail: "wwhs.aiexploration@gmail.com, for questions or ideas.", href: "mailto:wwhs.aiexploration@gmail.com" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <PageHeader
        eyebrow="About"
        title="About the club"
        description="The Westwood AI Club teaches machine learning to anyone at Westwood who's curious about it. Most meetings are a short lesson followed by a demo or a notebook to work through. Some are guest talks, and some are spent on competitions and student projects."
        stats={[
          { value: String(pastTeams.length + 1), label: "years running" },
          { value: String(lessonYears.reduce((n, y) => n + y.lessons.length, 0)), label: "lessons posted" },
          { value: String(talks.length), label: "guest speakers" },
        ]}
      />

      <section aria-labelledby="meetings" className="mb-16 grid gap-10 md:grid-cols-2">
        <div>
          <SectionHeader id="meetings" title="Meetings" />
          <p className="text-sm leading-relaxed text-ink-muted">
            Every week after school at {config.nextMeeting.time}, alternating between Mondays and Wednesdays, in{" "}
            {config.nextMeeting.teacher}&apos;s room ({config.nextMeeting.room}). Dates are on the calendar and go out to the mailing list.
            You can join at any point in the year.
          </p>
          <p className="mt-4 text-sm text-ink-muted">Sponsor: <span className="text-ink">{sponsor}</span></p>
        </div>
        <div>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-ink">Stay in the loop</h2>
          <ul className="border-t border-rule">
            {CHANNELS.map((c) => (
              <li key={c.label} className="border-b border-rule py-3">
                <a href={c.href} {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })} className="text-sm font-medium text-accent hover:underline">
                  {c.label}
                </a>
                <p className="text-sm text-ink-muted">{c.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="officers" className="mb-16">
        <SectionHeader id="officers" title="Officers" count={`${lessonYears[0].year}`} />
        <dl className="grid gap-x-10 border-t border-rule sm:grid-cols-2">
          {members.map((m) => (
            <div key={m.id} className="flex items-baseline justify-between gap-4 border-b border-rule py-3 text-sm">
              <dt className="text-ink-muted">{m.role}</dt>
              <dd className="font-medium text-ink">{m.name}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="past-officers">
        <SectionHeader id="past-officers" title="Past officers" count={`back to ${pastTeams[pastTeams.length - 1].year}`} />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {pastTeams.map((team) => (
            <section key={team.year} aria-label={`${team.year} officers`}>
              <h3 className="border-b-2 border-ink pb-2 font-mono text-xs text-ink">{team.year}</h3>
              <dl>
                {team.officers.map((o) => (
                  <div key={o.role} className="flex items-baseline justify-between gap-3 border-b border-rule py-2 text-sm">
                    <dt className="text-ink-muted">{o.role}</dt>
                    <dd className="text-right text-ink">{o.name}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
