import Link from "next/link";
import Hero from "@/components/home/Hero";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import GuestSpeakers from "@/components/home/GuestSpeakers";
import StartHere from "@/components/home/StartHere";
import MeetingFlow from "@/components/home/MeetingFlow";
import OfficerCards from "@/components/home/OfficerCards";
import SectionHeader from "@/components/ui/SectionHeader";
import AgendaList from "@/components/calendar/AgendaList";
import FileLink from "@/components/ui/FileLink";
import { getUpcomingEvents } from "@/lib/calendar";
import configData from "@/data/config.json";
import type { SiteConfig } from "@/lib/types";
import JsonLd from "@/components/ui/JsonLd";
import PhotoGrid from "@/components/ui/PhotoGrid";
import { lessonYears, members, photos } from "@/lib/content";
import { SITE_URL, LINKS } from "@/lib/site";

const config = configData as SiteConfig;

// The homepage is statically prerendered, but the next meeting comes from
// Google Calendar and NextMeetingCard's "in N days" badge is computed from
// `new Date()` at render time — regenerate every 15 minutes (matching the
// calendar fetch cache in lib/calendar.ts) so both stay current.
export const revalidate = 900;

const thisYear = lessonYears[0];
const latestLessons = [...thisYear.lessons].reverse().slice(0, 4);

export default async function HomePage() {
  const upcoming = await getUpcomingEvents();
  // The card is for the next time the club meets; deadlines go in the list below it.
  const cardEvent = upcoming.find((e) => e.type !== "deadline") ?? null;
  const rest = upcoming.filter((e) => e !== cardEvent).slice(0, 3);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Westwood AI Club",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
          email: "wwhs.aiexploration@gmail.com",
          description: "A student-run club at Westwood High School in Austin, Texas, that teaches machine learning to students of any experience level.",
          foundingDate: "2019",
          parentOrganization: { "@type": "HighSchool", name: "Westwood High School", address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" } },
          sameAs: [LINKS.instagram, LINKS.github],
        }}
      />
      <Hero />

      <MeetingFlow />

      <section className="mx-auto grid max-w-6xl gap-12 border-t border-rule px-4 py-16 sm:px-6 lg:grid-cols-[.8fr_1.2fr]">
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
          <Link href="/lessons" className="mt-4 inline-block text-sm link">
            All {lessonYears.reduce((n, y) => n + y.lessons.length, 0)} lessons since 2019
          </Link>
        </div>
      </section>

      <div className="border-y border-rule bg-white">
        <StartHere />
      </div>

      <section aria-labelledby="photos-title" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <SectionHeader id="photos-title" title="Around the club" count="meetings, talks, and events" />
        <PhotoGrid
          photos={photos.club.filter((p) => !p.alt.includes("pose together")).slice(0, 6)}
          className="lg:grid-cols-3"
          sizes="(min-width: 1024px) 360px, 50vw"
        />
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <GuestSpeakers />
      </div>

      <section aria-labelledby="officers-title" className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader id="officers-title" title="Meet the officers" count={`${thisYear.year} team`} />
        <p className="-mt-3 mb-6 max-w-2xl text-ink-muted">
          Students run everything: the lessons, the competitions, the guest speakers, and this website. Say hi at a meeting.
        </p>
        <OfficerCards officers={members} />
        <Link href="/about" className="mt-5 inline-block text-sm link">Past officers and how to reach us</Link>
      </section>
    </div>
  );
}
