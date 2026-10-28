import Link from "next/link";
import type { ClubEvent, SiteConfig } from "@/lib/types";
import { EVENT_TYPES, eventStartKey, formatEventTime, formatEventWhen } from "@/lib/events";
import { daysUntil, formatDate } from "@/lib/utils";
import { eventHref } from "@/components/calendar/EventChip";

interface NextMeetingCardProps {
  event: ClubEvent | null;
  /** Room/teacher/note fallbacks from data/config.json. */
  defaults: SiteConfig["nextMeeting"];
  checkinUrl: SiteConfig["checkinUrl"];
}

export default function NextMeetingCard({ event, defaults, checkinUrl }: NextMeetingCardProps) {
  const days = event ? daysUntil(eventStartKey(event)) : null;

  return (
    <div className="rounded-lg border border-rule bg-white p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <p className="font-mono text-xs text-ink-muted">Next meeting</p>
        {days !== null && days >= 0 && (
          <span className="font-mono text-xs text-accent">{days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`}</span>
        )}
      </div>

      {event ? (
        <div className="space-y-1.5">
          {event.type !== "meeting" && <p className="text-xs font-medium text-accent">{EVENT_TYPES[event.type].label}</p>}
          <Link href={eventHref(event)} className="block text-xl font-semibold leading-snug tracking-tight text-ink hover:text-accent">
            {event.title}
          </Link>
          <p className="text-sm text-ink-muted">
            {event.allDay ? formatEventWhen(event) : <>{formatDate(event.start)}, {formatEventTime(event)}</>}
          </p>
          <p className="text-sm text-ink-muted">{event.location ?? `Room ${defaults.room}, ${defaults.teacher}`}</p>
          {event.presenter && <p className="text-sm text-ink-muted">{event.presenter}</p>}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xl font-semibold tracking-tight text-ink">Not on the calendar yet</p>
          {defaults.note && <p className="text-sm leading-relaxed text-ink-muted">{defaults.note}</p>}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4 text-sm">
        {days === 0 && checkinUrl && (
          <a href={checkinUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-ink px-3 py-1.5 font-medium text-white hover:bg-accent">
            Check in
          </a>
        )}
        {!event && (
          <a href="https://forms.gle/m1a5LrzEBHhacpbg6" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Get meeting emails
          </a>
        )}
        <Link href="/calendar" className="text-accent hover:underline">
          Full calendar
        </Link>
      </div>
    </div>
  );
}
