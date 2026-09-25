// Pure helpers for ClubEvent — labels, formatting, grid bucketing, and
// "add to calendar" links. No fetching here (that's lib/calendar.ts), so
// these are safe to import from client components too.
import type { ClubEvent, EventType } from "@/lib/types";
import { CLUB_TZ, dateKey, formatDate, formatShortDate, formatTime, toDate } from "@/lib/utils";

export const EVENT_TYPES: Record<EventType, { label: string; dot: string }> = {
  meeting: { label: "Meeting", dot: "bg-event-meeting" },
  speaker: { label: "Guest Speaker", dot: "bg-event-speaker" },
  workshop: { label: "Workshop", dot: "bg-event-workshop" },
  competition: { label: "Comp Prep", dot: "bg-event-competition" },
  social: { label: "Social", dot: "bg-event-social" },
  deadline: { label: "Deadline", dot: "bg-event-deadline" },
};

export function isEventType(value: string): value is EventType {
  return value in EVENT_TYPES;
}

const DAY_MS = 86400000;

/** Day keys ("YYYY-MM-DD", club time) an event covers — more than one for multi-day all-day events. */
export function eventDayKeys(event: ClubEvent): string[] {
  if (!event.allDay) return [dateKey(new Date(event.start))];
  const keys: string[] = [];
  // Bare dates parse as UTC midnight; `end` is exclusive.
  for (let t = Date.parse(event.start); t < Date.parse(event.end); t += DAY_MS) {
    keys.push(new Date(t).toISOString().slice(0, 10));
  }
  return keys.length ? keys : [event.start];
}

/** The club-time day key an event starts on. */
export function eventStartKey(event: ClubEvent): string {
  return event.allDay ? event.start : dateKey(new Date(event.start));
}

export function isPast(event: ClubEvent, now = new Date()): boolean {
  if (event.allDay) return event.end <= dateKey(now);
  return Date.parse(event.end) <= now.getTime();
}

/** Last day of an all-day event (its `end` is exclusive). */
function lastDay(event: ClubEvent): string {
  return new Date(Date.parse(event.end) - DAY_MS).toISOString().slice(0, 10);
}

export function formatEventTime(event: ClubEvent): string {
  if (event.allDay) {
    const last = lastDay(event);
    return last > event.start ? `All day, through ${formatShortDate(last).replace(/, \d{4}$/, "")}` : "All day";
  }
  return `${formatTime(event.start)} – ${formatTime(event.end)}`;
}

/** "Monday, October 5, 2026 · 4:30 PM – 5:30 PM", or a date range for multi-day events. */
export function formatEventWhen(event: ClubEvent): string {
  if (event.allDay) {
    const last = lastDay(event);
    if (last > event.start) return `${formatShortDate(event.start)} – ${formatShortDate(last)}`;
    return `${formatDate(event.start)} · All day`;
  }
  const startDay = dateKey(new Date(event.start));
  const endDay = dateKey(new Date(event.end));
  if (startDay !== endDay) {
    return `${formatShortDate(event.start)}, ${formatTime(event.start)} – ${formatShortDate(event.end)}, ${formatTime(event.end)}`;
  }
  return `${formatDate(event.start)} · ${formatEventTime(event)}`;
}

/** Short weekday + day number for agenda date blocks. */
export function dayParts(event: ClubEvent): { weekday: string; day: string; month: string } {
  const d = toDate(event.start);
  const part = (opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-US", { timeZone: CLUB_TZ, ...opts });
  return { weekday: part({ weekday: "short" }), day: part({ day: "numeric" }), month: part({ month: "short" }) };
}

function googleStamp(event: ClubEvent, value: string): string {
  // All-day: YYYYMMDD. Timed: UTC YYYYMMDDTHHMMSSZ.
  if (event.allDay) return value.replaceAll("-", "");
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Prefilled "add this one event to my Google Calendar" link. */
export function googleAddLink(event: ClubEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${googleStamp(event, event.start)}/${googleStamp(event, event.end)}`,
    ctz: CLUB_TZ,
  });
  if (event.location) params.set("location", event.location);
  const details = [event.presenter && `Presenter: ${event.presenter}`, event.description]
    .filter(Boolean)
    .join("\n\n");
  if (details) params.set("details", details);
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
}

export function formatMonth(month: string, opts: { year?: boolean } = { year: true }): string {
  return new Date(`${month}-15T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    ...(opts.year ? { year: "numeric" } : {}),
  });
}

/** Six-or-fewer rows of seven day keys (Sunday first) covering the month; null = padding cell. */
export function monthWeeks(month: string): (string | null)[][] {
  const [y, m] = month.split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: (string | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(`${month}-${String(d).padStart(2, "0")}`);
  }
  while (cells.length % 7) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** Groups events by the day keys they cover. */
export function eventsByDay(events: ClubEvent[]): Map<string, ClubEvent[]> {
  const map = new Map<string, ClubEvent[]>();
  for (const event of events) {
    for (const key of eventDayKeys(event)) {
      const list = map.get(key);
      if (list) list.push(event);
      else map.set(key, [event]);
    }
  }
  return map;
}
