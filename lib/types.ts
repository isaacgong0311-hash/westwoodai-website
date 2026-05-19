// All shared TypeScript interfaces.
// When you swap to Supabase, replace the JSON imports in each page with
// a fetch from your DB — these types stay the same.

export interface Member {
  id: string;
  name: string;
  role: string; // officer title or "Member"
  avatar: string; // emoji or path to image
  grade: number;
  attendance: number; // meetings attended
  projects: number;
  competitions: number;
  points: number;
  badges: string[];
}

export interface Project {
  id: string;
  title: string;
  emoji: string;
  author: string;
  authorId: string;
  description: string;
  category: "LLMs" | "CV" | "ML" | "RL";
  tags: string[];
  status: "active" | "completed" | "demo";
  link?: string;
  date: string;
}

export interface Meeting {
  id: string;
  date: string | null; // null = TBD
  topic: string;
  presenter: string;
  type: "lesson" | "speaker" | "workshop" | "competition" | "social";
  slidesUrl?: string;
  notes?: string;
  isUpcoming?: boolean;
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

export interface ActivityEvent {
  id: string;
  type:
    | "project_added"
    | "competition_joined"
    | "meeting_recap"
    | "prompt_submitted"
    | "news_posted"
    | "member_joined";
  actor: string;
  message: string;
  timestamp: string;
  emoji: string;
}

export interface SiteConfig {
  nextMeeting: {
    date: string | null; // ISO date string, or null if TBD
    time: string;
    room: string;
    teacher: string;
    topic: string | null;
    note: string | null; // shown when date is null
  };
  stats: {
    members: number;
    projects: number;
    competitions: number;
    yearsRunning: number;
  };
}
