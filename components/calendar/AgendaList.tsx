import Link from "next/link";
import type { ClubEvent } from "@/lib/types";
import { EVENT_TYPES, dayParts, eventStartKey, formatEventTime, formatMonth } from "@/lib/events";
import { cn } from "@/lib/cn";
import { TypeDot, eventHref } from "@/components/calendar/EventChip";

interface AgendaListProps {
  events: ClubEvent[];
  muted?: boolean;
  /** Show a month heading whenever the month changes. */
  groupByMonth?: boolean;
}

/** Date-block rows for a list of events — used for "coming up" and the past-meetings archive. */
export default function AgendaList({ events, muted = false, groupByMonth = true }: AgendaListProps) {
  const monthOf = (event: ClubEvent) => eventStartKey(event).slice(0, 7);
  return (
    <ol className="divide-y divide-rule">
      {events.map((event, i) => {
        const month = monthOf(event);
        const showMonth = groupByMonth && (i === 0 || month !== monthOf(events[i - 1]));
        const { weekday, day } = dayParts(event);
        return (
          <li key={event.id}>
            {showMonth && (
              <p className={cn("font-mono text-xs text-ink-muted pb-2", i === 0 ? "pt-2" : "pt-6")}>
                {formatMonth(month)}
              </p>
            )}
            <Link href={eventHref(event)} className="group flex items-start gap-4 rounded-xl px-2 py-4 hover:bg-blue-soft/60">
              <div className="w-12 shrink-0 text-center">
                <p className="font-mono text-xs text-ink-muted">{weekday}</p>
                <p className={cn("text-3xl font-semibold leading-none mt-1 tabular-nums", muted ? "text-ink-muted" : "text-ink")}>
                  {day}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono flex items-center gap-2 text-xs text-ink-muted mb-1">
                  <TypeDot event={event} />
                  {EVENT_TYPES[event.type].label}
                </p>
                <p className={cn("text-sm font-bold group-hover:text-accent", muted ? "text-ink-muted" : "text-ink")}>
                  {event.title}
                </p>
                <p className="text-sm text-ink-muted mt-0.5">
                  {formatEventTime(event)}
                  {event.location && <> &middot; {event.location}</>}
                  {event.presenter && <> &middot; {event.presenter}</>}
                </p>
              </div>
              {event.slidesUrl && (
                <span className="text-xs text-ink-muted shrink-0 pt-5">Slides</span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
