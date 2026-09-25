import Link from "next/link";
import type { ClubEvent, SiteConfig } from "@/lib/types";
import { EVENT_TYPES, eventStartKey, formatEventTime, formatEventWhen } from "@/lib/events";
import { daysUntil, formatDate } from "@/lib/utils";
import Panel from "@/components/ui/Panel";
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
    <Panel raised className="p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-wider text-ink-muted">Up next</p>
        {days !== null && days >= 0 && (
          <span className="text-xs text-accent">
            {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days} days`}
          </span>
        )}
      </div>

      {event ? (
        <div className="space-y-2">
          {event.type !== "meeting" && (
            <p className="text-xs uppercase tracking-wider text-accent">{EVENT_TYPES[event.type].label}</p>
          )}
          <Link href={eventHref(event)} className="block text-base text-ink leading-snug hover:text-accent">
            {event.title}
          </Link>
          {event.allDay ? (
            <p className="text-sm text-ink-muted">{formatEventWhen(event)}</p>
          ) : (
            <p className="text-sm text-ink-muted">
              {formatDate(event.start)}
              <br />
              {formatEventTime(event)}
            </p>
          )}
          <p className="text-sm text-ink-muted">
            {event.location ?? `Room ${defaults.room} · ${defaults.teacher}`}
          </p>
          {event.presenter && <p className="text-sm text-ink-muted">{event.presenter}</p>}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-base text-ink leading-snug">Schedule TBD</p>
          {defaults.note && (
            <p className="text-sm leading-relaxed text-ink-muted">{defaults.note}</p>
          )}
          <div className="pt-2 border-t border-rule">
            <p className="text-sm text-ink-muted">
              {defaults.time} &middot; Room {defaults.room}
            </p>
            <p className="text-sm text-ink-muted mt-0.5">{defaults.teacher}&rsquo;s room</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
        {days === 0 && checkinUrl && (
          <a
            href={checkinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-ink text-paper hover:bg-accent px-3 py-1.5"
          >
            Check in ↗
          </a>
        )}
        <Link href="/calendar" className="text-sm text-accent hover:text-ink">
          Full calendar &rarr;
        </Link>
      </div>
    </Panel>
  );
}
