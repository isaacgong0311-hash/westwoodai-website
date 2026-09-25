// Reads the club's public Google Calendar (plus competition deadlines from
// data/competitions.json, so they show up without double entry). Officers edit events in Google
// Calendar; the site picks changes up within 15 minutes. See README
// "Adding events" for the description conventions parsed below.
//
// Server-only: the API key is read from a non-NEXT_PUBLIC env var, so it's
// never bundled for the browser. Any failure (missing env, Google down,
// bad key) logs and returns no events — pages fall back to empty states
// instead of failing the build.
import { competitions } from "@/lib/content";
import type { ClubEvent } from "@/lib/types";
import { isEventType, isPast } from "@/lib/events";
import { dateKey } from "@/lib/utils";

const API = "https://www.googleapis.com/calendar/v3/calendars";
const REVALIDATE_SECONDS = 900;

interface GoogleEvent {
  id: string;
  status?: string;
  visibility?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
}

/**
 * The fetch window: July 1 of the current school year through Aug 31 of the
 * next. Fixed per season (not "now ± N days") so the request URL — and so
 * the cache entry — stays the same between renders.
 */
function seasonWindow(now = new Date()): { timeMin: string; timeMax: string } {
  const [y, m] = dateKey(now).split("-").map(Number);
  const startYear = m >= 7 ? y : y - 1;
  return {
    timeMin: `${startYear}-07-01T00:00:00Z`,
    timeMax: `${startYear + 1}-09-01T00:00:00Z`,
  };
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

/** Google's web editor saves descriptions as light HTML; flatten to plain text. */
function htmlToText(html: string): string {
  return html
    .replace(/<a\s[^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>/gi, "$1")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (e) => ENTITIES[e]);
}

const FIELD = /^\s*(type|presenter|slides)\s*:\s*(.+?)\s*$/i;

/**
 * Pulls `type:` / `presenter:` / `slides:` lines off the top of a
 * description; everything after them is the public description.
 */
export function parseDescription(raw: string): { fields: Record<string, string>; body: string } {
  const lines = htmlToText(raw).split("\n");
  const fields: Record<string, string> = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const match = lines[i].match(FIELD);
    if (match) fields[match[1].toLowerCase()] = match[2];
    else if (lines[i].trim() !== "") break;
  }
  return { fields, body: lines.slice(i).join("\n").trim() };
}

function safeUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function toClubEvent(e: GoogleEvent): ClubEvent {
  const { fields, body } = parseDescription(e.description ?? "");
  const type = fields.type?.toLowerCase() ?? "meeting";
  return {
    id: e.id,
    title: e.summary?.trim() || "Untitled event",
    type: isEventType(type) ? type : "meeting",
    start: (e.start.dateTime ?? e.start.date)!,
    end: (e.end.dateTime ?? e.end.date)!,
    allDay: !e.start.dateTime,
    location: e.location?.trim() || undefined,
    presenter: fields.presenter,
    slidesUrl: safeUrl(fields.slides),
    description: body || undefined,
    htmlLink: e.htmlLink,
  };
}

/** Competition deadlines as all-day "deadline" events. IDs are prefixed so they can't collide with Google's. */
function competitionDeadlines(): ClubEvent[] {
  return competitions.map((c) => {
    const next = new Date(Date.parse(c.deadline) + 86400000).toISOString().slice(0, 10);
    return {
      id: `comp-${c.id}`,
      title: `${c.name} deadline`,
      type: "deadline",
      start: c.deadline,
      end: next,
      allDay: true,
      description: [c.description, c.link && `Details: ${c.link}`].filter(Boolean).join("\n\n"),
      related: { label: "All competitions", href: "/competitions" },
    };
  });
}

/** Sort key: all-day events sort from the start of their day (05:00 UTC ≈ midnight in Austin). */
function sortKey(e: ClubEvent): number {
  return e.allDay ? Date.parse(`${e.start}T05:00:00Z`) : Date.parse(e.start);
}

/** Every event this season (calendar + competition deadlines), oldest first. */
export async function getAllEvents(): Promise<ClubEvent[]> {
  const events = [...(await fetchCalendarEvents()), ...competitionDeadlines()];
  return events.sort((a, b) => sortKey(a) - sortKey(b));
}

async function fetchCalendarEvents(): Promise<ClubEvent[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const key = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!calendarId || !key) return [];

  const params = new URLSearchParams({
    key,
    ...seasonWindow(),
    singleEvents: "true", // expands recurring series into individual meetings
    orderBy: "startTime",
    maxResults: "2500",
  });

  try {
    const res = await fetch(`${API}/${encodeURIComponent(calendarId)}/events?${params}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["calendar"] },
    });
    if (!res.ok) {
      // Don't log the URL — it carries the API key.
      const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      console.error(`[calendar] Google Calendar API returned ${res.status}: ${body?.error?.message ?? "no details"}`);
      return [];
    }
    const data = (await res.json()) as { items?: GoogleEvent[] };
    return (data.items ?? [])
      .filter((e) => e.status !== "cancelled" && e.visibility !== "private" && e.start && e.end)
      .map(toClubEvent);
  } catch (err) {
    console.error("[calendar] Failed to fetch events:", err);
    return [];
  }
}

export async function getUpcomingEvents(): Promise<ClubEvent[]> {
  const now = new Date();
  return (await getAllEvents()).filter((e) => !isPast(e, now));
}

export async function getEvent(id: string): Promise<ClubEvent | null> {
  return (await getAllEvents()).find((e) => e.id === id) ?? null;
}

/** Subscribe links for the whole calendar, or null if it isn't configured. */
export function getSubscribeLinks(): { google: string; ical: string } | null {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) return null;
  const id = encodeURIComponent(calendarId);
  return {
    google: `https://calendar.google.com/calendar/render?cid=${id}`,
    ical: `webcal://calendar.google.com/calendar/ical/${id}/public/basic.ics`,
  };
}
