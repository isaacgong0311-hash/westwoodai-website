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

export interface Meeting {
  id: string;
  date: string | null;
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
