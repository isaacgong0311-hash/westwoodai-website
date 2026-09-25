// Typed access to the officer-edited JSON in /data, plus which pages have
// anything to show. Nav, footer, and sitemap all read `siteLinks()` so an
// empty section never gets linked (the page itself stays live, so old links
// don't 404 — it just shows its empty state).
import competitionsData from "@/data/competitions.json";
import membersData from "@/data/members.json";
import newsData from "@/data/news.json";
import projectsData from "@/data/projects.json";
import promptData from "@/data/prompt.json";
import type { Competition, Member, NewsItem, Project, PromptChallenge } from "@/lib/types";

export const members = membersData as Member[];
export const projects = projectsData as Project[];
export const competitions = competitionsData as Competition[];
export const news = newsData as NewsItem[];
export const promptChallenge = (promptData.current as PromptChallenge | null) ?? null;

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
    { href: "/#speakers", label: "Speakers", primary: true, show: true },
    { href: "/projects", label: "Projects", primary: true, show: projects.length > 0 },
    { href: "/competitions", label: "Competitions", primary: true, show: competitions.length > 0 },
    { href: "/leaderboard", label: "Leaderboard", primary: true, show: true },
    { href: "/news", label: "News", primary: false, show: news.length > 0 },
    { href: "/prompt", label: "Prompt of the Week", primary: false, show: promptChallenge !== null },
  ];
  return links.filter((l) => l.show).map(({ href, label, primary }) => ({ href, label, primary }));
}

export function memberName(id: string): string {
  return members.find((m) => m.id === id)?.name ?? id;
}
