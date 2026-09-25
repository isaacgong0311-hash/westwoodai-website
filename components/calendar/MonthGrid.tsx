import Link from "next/link";
import type { ClubEvent } from "@/lib/types";
import { eventsByDay, formatMonth, isPast, monthWeeks, shiftMonth } from "@/lib/events";
import { cn } from "@/lib/cn";
import EventChip from "@/components/calendar/EventChip";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface MonthGridProps {
  month: string; // "2026-10"
  today: string; // "2026-10-05"
  events: ClubEvent[];
}

/**
 * Server-rendered month view. Prev/next are plain links to `?month=`, so it
 * works with JavaScript disabled.
 */
export default function MonthGrid({ month, today, events }: MonthGridProps) {
  const byDay = eventsByDay(events);
  const prev = shiftMonth(month, -1);
  const next = shiftMonth(month, 1);
  const now = new Date();

  return (
    <section aria-labelledby="month-heading">
      <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-4">
        <Link
          href={`/calendar?month=${prev}`}
          scroll={false}
          className="text-sm text-ink-muted hover:text-ink"
        >
          &larr;&nbsp;{formatMonth(prev, { year: false })}
        </Link>
        <h2 id="month-heading" className="font-serif text-2xl font-normal text-ink">
          {formatMonth(month)}
        </h2>
        <Link
          href={`/calendar?month=${next}`}
          scroll={false}
          className="text-sm text-ink-muted hover:text-ink"
        >
          {formatMonth(next, { year: false })}&nbsp;&rarr;
        </Link>
      </div>

      <div className="grid grid-cols-7 text-xs uppercase tracking-wider text-ink-muted mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="px-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-t border-l border-rule">
        {monthWeeks(month).flat().map((day, i) => {
          const dayEvents = day ? byDay.get(day) ?? [] : [];
          const isToday = day === today;
          return (
            <div
              key={day ?? `pad-${i}`}
              className={cn(
                "min-h-28 border-r border-b border-rule p-1.5 flex flex-col gap-1",
                day ? "bg-paper" : "bg-paper-raised",
              )}
            >
              {day && (
                <span
                  className={cn(
                    "text-xs tabular-nums px-1 self-start",
                    isToday ? "bg-accent text-paper" : day < today ? "text-ink-muted" : "text-ink",
                  )}
                >
                  {isToday && <span className="sr-only">Today, </span>}
                  {Number(day.slice(8))}
                </span>
              )}
              {dayEvents.map((event) => (
                <EventChip key={event.id} event={event} muted={isPast(event, now)} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
