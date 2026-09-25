// The live leaderboard: attendance from a Google Form check-in, plus points
// officers award by hand, both in one private Google Sheet (setup in README
// "Leaderboard"). Read with a service account so the sheet — which may hold
// student emails — never has to be public.
//
// Any failure (not configured, bad key, missing tab) logs and returns null;
// the page then falls back to data/members.json.
import { getAllEvents } from "@/lib/calendar";
import { eventDayKeys } from "@/lib/events";
import { getServiceAccountToken } from "@/lib/google-auth";
import { POINTS, POINTS_BREAKDOWN, type PointKey } from "@/lib/points";
import type { Member } from "@/lib/types";
import { dateKey } from "@/lib/utils";

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
const TABS = ["Roster", "Checkins", "Awards"] as const;

type Cell = string | number | boolean;
type Row = Record<string, Cell>;

/** Header row → objects keyed by lowercased, trimmed header text. */
function toRows(values: Cell[][] = []): Row[] {
  const [header = [], ...body] = values;
  const keys = header.map((h) => String(h).trim().toLowerCase());
  return body
    .filter((cells) => cells.some((c) => String(c).trim() !== ""))
    .map((cells) => Object.fromEntries(keys.map((k, i) => [k, cells[i] ?? ""])));
}

const text = (value: Cell | undefined) => String(value ?? "").trim();
const norm = (value: Cell | undefined) => text(value).toLowerCase();

/** First column whose header contains `needle` — Forms names columns after the question text. */
function field(row: Row, needle: string): Cell | undefined {
  const key = Object.keys(row).find((k) => k.includes(needle));
  return key === undefined ? undefined : row[key];
}

/**
 * The club-time day a check-in happened. Read with SERIAL_NUMBER rendering,
 * timestamps arrive as spreadsheet serials — days since 1899-12-30 in the
 * sheet's own timezone (set to America/Chicago), so the integer part already
 * is the local date.
 */
function checkinDay(value: Cell | undefined): string | null {
  if (typeof value === "number") {
    return new Date((Math.floor(value) - 25569) * 86400000).toISOString().slice(0, 10);
  }
  const parsed = new Date(text(value));
  return Number.isNaN(parsed.getTime()) ? null : dateKey(parsed);
}

const categoryKeys = new Map<string, PointKey>(
  POINTS_BREAKDOWN.flatMap(({ key, category }) => [
    [key.toLowerCase(), key],
    [category.toLowerCase(), key],
  ]),
);

/** "Jordan Lee" → "Jordan L." — members are minors, so only officers and opt-ins get full names. */
function displayName(name: string, role: string, showFull: boolean): string {
  if (showFull || role.toLowerCase() !== "member") return name;
  const [first, ...rest] = name.split(/\s+/);
  const last = rest.at(-1);
  return last ? `${first} ${last[0]}.` : first;
}

interface SheetData {
  roster: Row[];
  checkins: Row[];
  awards: Row[];
}

/**
 * Pure scoring, separate from fetching. A check-in counts once per member
 * per day, and only on a day the calendar has a club gathering — so a code
 * leaked after a meeting can't be reused on an off day. If the calendar has
 * no gatherings at all (not set up yet), every check-in counts.
 */
export function scoreLeaderboard({ roster, checkins, awards }: SheetData, gatheringDays: Set<string>): Member[] {
  const members = roster
    .filter((r) => text(r.id) && text(r.name))
    .map((r) => ({
      id: text(r.id),
      fullName: text(r.name),
      email: norm(r.email),
      role: text(r.role) || "Member",
      showFull: norm(field(r, "full name")) === "true" || norm(field(r, "full name")) === "yes",
      days: new Set<string>(),
      projects: 0,
      competitions: 0,
      awardPoints: 0,
    }));
  const byId = new Map(members.map((m) => [m.id.toLowerCase(), m]));
  const byEmail = new Map(members.filter((m) => m.email).map((m) => [m.email, m]));
  const byName = new Map(members.map((m) => [m.fullName.toLowerCase(), m]));

  let unmatched = 0;
  for (const row of checkins) {
    const member = byEmail.get(norm(field(row, "email"))) ?? byName.get(norm(field(row, "name")));
    const day = checkinDay(field(row, "timestamp"));
    if (!member || !day) {
      unmatched++;
      continue;
    }
    if (gatheringDays.size === 0 || gatheringDays.has(day)) member.days.add(day);
  }
  if (unmatched) console.warn(`[leaderboard] ${unmatched} check-in(s) didn't match a roster name/email`);

  for (const row of awards) {
    const member = byId.get(norm(field(row, "member")));
    const key = categoryKeys.get(norm(row.category));
    if (!member || !key) {
      console.warn(`[leaderboard] Skipping award row: member "${text(field(row, "member"))}", category "${text(row.category)}"`);
      continue;
    }
    member.awardPoints += POINTS[key];
    if (key === "project") member.projects++;
    if (key === "competitionEntry") member.competitions++;
  }

  return members.map((m) => ({
    id: m.id,
    name: displayName(m.fullName, m.role, m.showFull),
    role: m.role,
    attendance: m.days.size,
    projects: m.projects,
    competitions: m.competitions,
    points: m.days.size * POINTS.attendance + m.awardPoints,
  }));
}

async function fetchSheet(sheetId: string, token: string): Promise<SheetData> {
  const params = new URLSearchParams({
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER",
  });
  for (const tab of TABS) params.append("ranges", `${tab}!A:Z`);

  const res = await fetch(`${SHEETS_API}/${encodeURIComponent(sheetId)}/values:batchGet?${params}`, {
    headers: { authorization: `Bearer ${token}` },
    next: { revalidate: 900, tags: ["leaderboard"] },
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new Error(`Sheets API returned ${res.status}: ${body?.error?.message ?? "no details"}`);
  }
  const { valueRanges = [] } = (await res.json()) as { valueRanges?: { values?: Cell[][] }[] };
  const [roster, checkins, awards] = TABS.map((_, i) => toRows(valueRanges[i]?.values));
  return { roster, checkins, awards };
}

/** Live standings from the sheet, or null when it isn't configured or can't be read. */
export async function getLeaderboard(): Promise<Member[] | null> {
  const sheetId = process.env.LEADERBOARD_SHEET_ID;
  if (!sheetId) return null;
  try {
    const token = await getServiceAccountToken(SCOPE);
    if (!token) return null;
    const [sheet, events] = await Promise.all([fetchSheet(sheetId, token), getAllEvents()]);
    const gatheringDays = new Set(events.filter((e) => e.type !== "deadline").flatMap(eventDayKeys));
    return scoreLeaderboard(sheet, gatheringDays);
  } catch (err) {
    console.error("[leaderboard] Falling back to data/members.json:", err instanceof Error ? err.message : err);
    return null;
  }
}
