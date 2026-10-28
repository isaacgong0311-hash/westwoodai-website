import Link from "next/link";
import type { ClubEvent } from "@/lib/types";
import { EVENT_TYPES } from "@/lib/events";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/cn";

export function eventHref(event: ClubEvent): string {
  return `/calendar/${encodeURIComponent(event.id)}`;
}

export function TypeDot({ event, className }: { event: ClubEvent; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-1.5 rounded-full shrink-0", EVENT_TYPES[event.type].dot, className)}
    />
  );
}

/** One event inside a month-grid day cell. */
export default function EventChip({ event, muted }: { event: ClubEvent; muted?: boolean }) {
  return (
    <Link
      href={eventHref(event)}
      title={`${EVENT_TYPES[event.type].label}: ${event.title}`}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs leading-tight bg-blue-soft border border-rule",
        "transition-[border-color,transform] duration-150 hover:border-accent hover:-translate-y-px",
        muted ? "text-ink-muted" : "text-ink",
      )}
    >
      <TypeDot event={event} />
      <span className="truncate">
        {!event.allDay && (
          <span className="text-ink-muted tabular-nums">{formatTime(event.start).replace(":00", "")} </span>
        )}
        {event.title}
      </span>
    </Link>
  );
}
