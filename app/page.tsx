import Link from "next/link";
import Hero from "@/components/home/Hero";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import GuestSpeakers from "@/components/home/GuestSpeakers";
import StartHere from "@/components/home/StartHere";
import SectionHeader from "@/components/ui/SectionHeader";
import AgendaList from "@/components/calendar/AgendaList";
import FileLink from "@/components/ui/FileLink";
import { getUpcomingEvents } from "@/lib/calendar";
import configData from "@/data/config.json";
import type { SiteConfig } from "@/lib/types";
import { clubHistory, lessonYears, members } from "@/lib/content";

const config = configData as SiteConfig;

// The homepage is statically prerendered, but the next meeting comes from
// Google Calendar and NextMeetingCard's "in N days" badge is computed from
// `new Date()` at render time — regenerate every 15 minutes (matching the
// calendar fetch cache in lib/calendar.ts) so both stay current.
export const revalidate = 900;

const HISTORY = clubHistory();
const thisYear = lessonYears[0];
const latestLessons = [...thisYear.lessons].reverse().slice(0, 4);

export default async function HomePage() {
  const upcoming = await getUpcomingEvents();
  // The card is for the next time the club meets; deadlines go in the list below it.
  const cardEvent = upcoming.find((e) => e.type !== "deadline") ?? null;
  const rest = upcoming.filter((e) => e !== cardEvent).slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <NextMeetingCard event={cardEvent} defaults={config.nextMeeting} checkinUrl={config.checkinUrl} />
          {rest.length > 0 && (
            <div className="mt-6">
              <p className="mb-1 font-mono text-xs text-ink-muted">Also coming up</p>
              <AgendaList events={rest} groupByMonth={false} />
            </div>
          )}
        </div>
        <div>
          <SectionHeader title={`This year's meetings`} count={thisYear.year} />
          <ol className="border-t border-rule">
            {latestLessons.map((l) => (
              <li key={l.url} className="flex items-baseline gap-4 border-b border-rule py-4">
                <span className="w-8 shrink-0 font-mono text-xs text-ink-muted">{l.number ? `#${l.number}` : ""}</span>
                <FileLink href={l.url} format={l.format}>{l.title}</FileLink>
              </li>
            ))}
          </ol>
          <Link href="/lessons" className="mt-4 inline-block text-sm text-accent hover:underline">
            All {lessonYears.reduce((n, y) => n + y.lessons.length, 0)} lessons since 2019
          </Link>
        </div>
      </section>

      <div className="border-y border-rule bg-white">
        <StartHere />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <GuestSpeakers />
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-8 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Officers" count={`${thisYear.year} team`} />
          <dl className="border-t border-rule">
            {members.map((m) => (
              <div key={m.id} className="flex items-baseline justify-between gap-4 border-b border-rule py-3 text-sm">
                <dt className="text-ink-muted">{m.role}</dt>
                <dd className="font-medium text-ink">{m.name}</dd>
              </div>
            ))}
          </dl>
          <Link href="/about" className="mt-4 inline-block text-sm text-accent hover:underline">Past officers and how to reach us</Link>
        </div>
        <div>
          <SectionHeader title="Presidents by year" count={`${HISTORY.length} years`} />
          <dl className="border-t border-rule">
            {HISTORY.map((h) => (
              <div key={h.year} className="flex items-baseline justify-between gap-4 border-b border-rule py-3 text-sm">
                <dt className="font-mono text-xs text-ink-muted">{h.year}</dt>
                <dd className="text-right text-ink">{h.presidents}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
