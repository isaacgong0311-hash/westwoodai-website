// All shared TypeScript interfaces.
// When you swap to Supabase, replace the JSON imports in each page with
// a fetch from your DB — these types stay the same.

export interface Member {
  id: string;
  name: string;
  role: string;
  attendance: number;
  projects: number;
  competitions: number;
  points: number;
}

export interface Project {
  id: string;
  title: string;
  author: string;
  authorId: string;
  description: string;
  category: "LLMs" | "CV" | "ML" | "RL" | "Other";
  tags: string[];
  status: "active" | "completed" | "demo";
  link?: string;
  date: string;
}

export type EventType =
  | "meeting"
  | "speaker"
  | "workshop"
  | "competition"
  | "social"
  | "deadline";

/**
 * One event from the club's Google Calendar (see lib/calendar.ts), normalized.
 * `start`/`end` are ISO datetimes for timed events, or bare "YYYY-MM-DD"
 * strings for all-day events — in which case `end` is exclusive, the way
 * Google stores it (a one-day event on Oct 5 has end "2026-10-06").
 */
export interface ClubEvent {
  id: string;
  title: string;
  type: EventType;
  start: string;
  end: string;
  allDay: boolean;
  location?: string;
  presenter?: string;
  slidesUrl?: string;
  description?: string;
  htmlLink?: string;
  /** An on-site page with more detail (e.g. /competitions for a deadline). */
  related?: { label: string; href: string };
}

export interface Competition {
  id: string;
  name: string;
  organizer: string;
  type: "internal" | "external";
  deadline: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prize?: string;
  status: "open" | "forming" | "closed" | "upcoming";
  description: string;
  link?: string;
  participants?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  date: string;
  summary: string;
  officerTake: string;
  officer: string;
  hot: boolean;
  category: string;
}

export interface PromptChallenge {
  id: string;
  title: string;
  description: string;
  context: string;
  postedBy: string;
  postedDate: string;
  deadline: string;
  difficulty: "easy" | "medium" | "hard";
  entries: PromptEntry[];
}

export interface PromptEntry {
  id: string;
  author: string;
  authorId: string;
  content: string;
  votes: number;
  submittedAt: string;
}

export interface SiteConfig {
  // Fallbacks for when the calendar has nothing scheduled (or an event has
  // no location). Actual dates live in Google Calendar, not here.
  nextMeeting: {
    time: string;
    room: string;
    teacher: string;
    note: string | null;
  };
  /** The meeting check-in Google Form (see README "Leaderboard"); null hides check-in links. */
  checkinUrl: string | null;
}
