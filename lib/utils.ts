// Date-only strings ("2026-09-28") parse as UTC midnight, so they're formatted
// in UTC too — otherwise a build server west of UTC would print the day before.
function parse(dateStr: string): { date: Date; timeZone?: string } {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  return { date: new Date(dateStr), timeZone: dateOnly ? "UTC" : undefined };
}

export function formatDate(dateStr: string): string {
  const { date, timeZone } = parse(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  });
}

export function formatShortDate(dateStr: string): string {
  const { date, timeZone } = parse(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  });
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - now.getTime()) / 86400000);
}
