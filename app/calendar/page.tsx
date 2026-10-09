import type { Metadata } from "next";
import AgendaList from "@/components/calendar/AgendaList";
import MonthGrid from "@/components/calendar/MonthGrid";
import SubscribeLinks from "@/components/calendar/SubscribeLinks";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import configData from "@/data/config.json";
import { getAllEvents, getSubscribeLinks } from "@/lib/calendar";
import { isPast } from "@/lib/events";
import type { SiteConfig } from "@/lib/types";
import { dateKey } from "@/lib/utils";

const config = configData as SiteConfig;

export const metadata: Metadata = {
  title: "Calendar — Westwood AI Club",
  description: "Westwood AI Club meetings, guest speakers, and deadlines when announced.",
};

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { month: monthParam } = await searchParams;
  const today = dateKey(new Date());
  const month = typeof monthParam === "string" && MONTH.test(monthParam) ? monthParam : today.slice(0, 7);

  const events = await getAllEvents();
  const now = new Date();
  const upcoming = events.filter((e) => !isPast(e, now));
  const past = events.filter((e) => e.type !== "deadline" && isPast(e, now)).reverse();
  const subscribe = getSubscribeLinks();

  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow={`${config.nextMeeting.time} · Room ${config.nextMeeting.room}`}
          title="Calendar"
            description="Find confirmed meetings, guest speakers, workshops, and competition deadlines here."
        />

        {subscribe && <SubscribeLinks links={subscribe} />}

        {events.length === 0 ? (
          <EmptyState
            title="No dates listed yet"
            description={config.nextMeeting.note ?? "Officers haven't posted this season's events yet — check back soon."}
            cta={{ label: "Join the mailing list", href: "https://forms.gle/m1a5LrzEBHhacpbg6", external: true }}
          />
        ) : (
          <>
            {/* The grid needs ~700px to be legible; phones get the agenda below instead. */}
            <div className="hidden md:block mb-16">
              <MonthGrid month={month} today={today} events={events} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section>
                <SectionHeader title="Coming up" count={`${upcoming.length} scheduled`} />
                {upcoming.length === 0 ? (
                  <p className="text-sm text-ink-muted py-4">Nothing else on the calendar yet this season.</p>
                ) : (
                  <AgendaList events={upcoming} />
                )}
              </section>
              <section>
                <SectionHeader title="Past meetings" count={`${past.length} this season`} />
                {past.length === 0 ? (
                  <p className="text-sm text-ink-muted py-4">
                    Once the season starts, every meeting shows up here with its slides.
                  </p>
                ) : (
                  <AgendaList events={past} muted />
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
