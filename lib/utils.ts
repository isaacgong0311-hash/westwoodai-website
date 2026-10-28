// The club meets in Austin, but Vercel renders in UTC — every date shown on
// the site has to be formatted in club time or evening events slide onto
// the next day.
export const CLUB_TZ = "America/Chicago";

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Parses an ISO datetime or a bare "YYYY-MM-DD". Bare dates parse as UTC
 * midnight, which is the previous evening in Austin — pin them to noon UTC
 * instead so they land on the same calendar day in any US timezone.
 */
export function toDate(value: string): Date {
  return DATE_ONLY.test(value) ? new Date(`${value}T12:00:00Z`) : new Date(value);
}

/** "YYYY-MM-DD" of the given instant, in club time. */
export function dateKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CLUB_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatDate(dateStr: string): string {
  return toDate(dateStr).toLocaleDateString("en-US", {
    timeZone: CLUB_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  return toDate(dateStr).toLocaleDateString("en-US", {
    timeZone: CLUB_TZ,
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(dateStr: string): string {
  return toDate(dateStr).toLocaleTimeString("en-US", {
    timeZone: CLUB_TZ,
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Whole calendar days from today (club time) to the given date. */
export function daysUntil(dateStr: string): number {
  const target = DATE_ONLY.test(dateStr) ? dateStr : dateKey(new Date(dateStr));
  const today = dateKey(new Date());
  // Both keys parse as UTC midnight, so the difference is an exact day count.
  return Math.round((Date.parse(target) - Date.parse(today)) / 86400000);
}
