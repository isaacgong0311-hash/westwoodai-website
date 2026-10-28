// Typed access to the officer-edited JSON in /data, plus which pages have
// anything to show. Nav, footer, and sitemap all read `siteLinks()` so an
// empty section never gets linked (the page itself stays live, so old links
// don't 404 — it just shows its empty state).
import competitionsData from "@/data/competitions.json";
import faqData from "@/data/faq.json";
import lessonsData from "@/data/lessons.json";
import membersData from "@/data/members.json";
import newsData from "@/data/news.json";
import officersData from "@/data/officers.json";
import projectsData from "@/data/projects.json";
import promptData from "@/data/prompt.json";
import specialEventsData from "@/data/special-events.json";
import type {
  Competition,
  FaqItem,
  LessonYear,
  PathStep,
  Member,
  NewsItem,
  OfficerTeam,
  OutreachEvent,
  Project,
  PromptChallenge,
  Talk,
} from "@/lib/types";

export const members = membersData as Member[];
export const projects = projectsData as Project[];
export const competitions = competitionsData as Competition[];
export const news = newsData as NewsItem[];
export const promptChallenge = (promptData.current as PromptChallenge | null) ?? null;
export const lessonYears = lessonsData.years as LessonYear[];
export const resourcesDoc = lessonsData.resourcesDoc;
export const learningPath = lessonsData.path as PathStep[];
export const talks = specialEventsData.talks as Talk[];
export const outreach = specialEventsData.outreach as OutreachEvent[];
export const faq = faqData as FaqItem[];
export const sponsor = officersData.sponsor;
export const pastTeams = officersData.pastTeams as OfficerTeam[];

/** One row per school year with who led it — the current year comes from members.json. */
export function clubHistory(): { year: string; presidents: string }[] {
  const presidents = (officers: { role: string; name: string }[]) =>
    officers.filter((o) => /president/i.test(o.role) && !/vice/i.test(o.role)).map((o) => o.name).join(" & ");
  return [
    { year: lessonYears[0].year, presidents: presidents(members) },
    ...pastTeams.map((t) => ({ year: t.year, presidents: presidents(t.officers) })),
  ];
}

export interface SiteLink {
  href: string;
  label: string;
  /** Shown in the header nav; everything is in the footer. */
  primary: boolean;
}

export function siteLinks(): SiteLink[] {
  const links: (SiteLink & { show: boolean })[] = [
    { href: "/", label: "Home", primary: true, show: true },
    { href: "/calendar", label: "Calendar", primary: true, show: true },
    { href: "/lessons", label: "Lessons", primary: true, show: true },
    { href: "/playground", label: "Playground", primary: true, show: true },
    { href: "/events", label: "Events", primary: true, show: true },
    { href: "/projects", label: "Projects", primary: true, show: projects.length > 0 },
    { href: "/competitions", label: "Competitions", primary: true, show: competitions.length > 0 },
    { href: "/leaderboard", label: "Leaderboard", primary: true, show: true },
    { href: "/about", label: "About", primary: true, show: true },
    { href: "/faq", label: "FAQ", primary: false, show: true },
    { href: "/news", label: "News", primary: false, show: news.length > 0 },
    { href: "/prompt", label: "Prompt of the Week", primary: false, show: promptChallenge !== null },
  ];
  return links.filter((l) => l.show).map(({ href, label, primary }) => ({ href, label, primary }));
}

export function memberName(id: string): string {
  return members.find((m) => m.id === id)?.name ?? id;
}
