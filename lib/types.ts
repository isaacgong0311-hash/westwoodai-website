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
  nextMeeting: {
    date: string | null;
    time: string;
    room: string;
    teacher: string;
    topic: string | null;
    note: string | null;
  };
  founded: number;
}

export interface Officer {
  role: string;
  name: string;
}

export interface OfficerYear {
  year: string;
  officers: Officer[];
}

export interface OfficersData {
  sponsor: string;
  current: OfficerYear;
  past: OfficerYear[];
}

export interface SlideDeck {
  /** Meeting number within the school year; omitted for years that didn't number meetings. */
  number?: number;
  title: string;
  url: string;
  /** ISO date (YYYY-MM-DD), only when it's actually known. */
  date?: string;
}

export interface CodeLink {
  title: string;
  url: string;
}

export interface SlideYear {
  year: string;
  meetings: SlideDeck[];
  code?: CodeLink[];
}

export interface SlidesData {
  current: SlideYear;
  archive: SlideYear[];
}

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface PhotosData {
  club: Photo[];
  events: Record<string, Photo[]>;
}

export interface ClubEvent {
  id: string;
  date: string;
  kind: "speaker" | "outreach";
  title: string;
  speaker?: string;
  affiliation?: string;
  description?: string;
  slides?: { label: string; url: string }[];
  /** Key into photos.json `events`. */
  photos?: string;
}

export interface FaqItem {
  q: string;
  a: string;
  link?: { label: string; href: string; external?: boolean };
}
