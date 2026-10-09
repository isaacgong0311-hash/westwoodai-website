import Hero from "@/components/home/Hero";
import MeetingInfo from "@/components/home/MeetingInfo";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import GuestSpeakers from "@/components/home/GuestSpeakers";
import StartHere from "@/components/home/StartHere";
import SectionHeader from "@/components/ui/SectionHeader";
import AgendaList from "@/components/calendar/AgendaList";
import { getUpcomingEvents } from "@/lib/calendar";
import configData from "@/data/config.json";
import membersData from "@/data/members.json";
import type { SiteConfig, Member } from "@/lib/types";

const config = configData as SiteConfig;
const members = membersData as Member[];

// The homepage is statically prerendered, but the next meeting comes from
// Google Calendar and NextMeetingCard's "in N days" badge is computed from
// `new Date()` at render time — regenerate every 15 minutes (matching the
// calendar fetch cache in lib/calendar.ts) so both stay current.
export const revalidate = 900;

// Club history — pulled from Google Sites officer page
const HISTORY = [
  { year: "2026–27", president: "Reett Aulakh & Aanya Pathak" },
  { year: "2025–26", president: "Victor Lehr" },
  { year: "2024–25", president: "Indivara Kolluru" },
  { year: "2023–24", president: "Raghav Aggarwal" },
  { year: "2022–23", president: "Evan Lai" },
  { year: "2021–22", president: "Shoumik Roychowdhury" },
  { year: "2020–21", president: "Aarya Agarwal" },
  { year: "2019–20", president: "Aarya Agarwal" },
];

export default async function HomePage() {
  const upcoming = await getUpcomingEvents();
  // The card is for the next time the club meets; deadlines go in the list below it.
  const cardEvent = upcoming.find((e) => e.type !== "deadline") ?? null;
  const rest = upcoming.filter((e) => e !== cardEvent).slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="relative z-10 -mt-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <MeetingInfo />
        </div>
      </section>

      <StartHere />

      <section className="bg-[#edf2ff] px-4 py-20 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-14">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-accent">Show up & get involved</p>
            <h2 className="mb-6 max-w-md text-4xl font-black leading-[.98] tracking-[-.055em] text-ink sm:text-5xl">See you <span className="font-serif font-normal italic text-accent-warm">after school.</span></h2>
            <NextMeetingCard event={cardEvent} defaults={config.nextMeeting} checkinUrl={config.checkinUrl} />
            {rest.length > 0 && (
              <div className="mt-8 rounded-3xl bg-white p-5">
                <p className="text-xs font-black uppercase tracking-wider text-accent mb-1">Also coming up</p>
                <AgendaList events={rest} groupByMonth={false} />
              </div>
            )}
          </div>

          <div>
            <SectionHeader title="Meet your officers." count="2026–27 team" />
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-ink-muted">Students keep this club moving. Say hello at a meeting, ask a question, or bring an idea to the team.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-2xl border border-rule bg-white p-4 shadow-[0_8px_20px_rgba(17,26,51,.04)]"
                >
                  <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-xs font-black text-accent">{m.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-ink">{m.name}</span>
                    <span className="block text-xs text-ink-muted">{m.role}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GuestSpeakers />

      <section className="bg-paper px-4 py-20 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-accent">Built by students, year after year</p>
          <SectionHeader title="Club history" count={`${HISTORY.length} years running`} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HISTORY.map((h, i) => (
              <div
                key={h.year}
                className={`min-h-28 rounded-2xl border p-5 ${i === 0 ? "border-accent bg-blue-soft" : "border-rule bg-white"}`}
              >
                <span className={`text-xs font-black uppercase tracking-wider ${i === 0 ? "text-accent" : "text-ink-muted"}`}>
                  {h.year}
                </span>
                <p className="mt-4 text-sm font-bold leading-snug text-ink">{h.president}</p>
                {i === 0 && <span className="mt-2 inline-block text-xs font-semibold text-accent">Current team</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
