import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import Link from "next/link";
import configData from "@/data/config.json";
import meetingsData from "@/data/meetings.json";
import projectsData from "@/data/projects.json";
import type { SiteConfig, Meeting, Project } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

const config = configData as SiteConfig;
const meetings = meetingsData as Meeting[];
const projects = projectsData as Project[];

const typeLabels: Record<string, string> = {
  lesson: "Lesson",
  speaker: "Guest Speaker",
  workshop: "Workshop",
  competition: "Comp Prep",
  social: "Social / Event",
};

export default function HomePage() {
  const recentMeetings = meetings.filter((m) => !m.isUpcoming).slice(0, 4);
  const featuredProjects = projects.filter((p) => p.status === "active").slice(0, 3);

  return (
    <div>
      <Hero />
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <StatsBar stats={config.stats} />
        </div>
      </div>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <NextMeetingCard config={config.nextMeeting} />

            {/* Quick links */}
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 card-glow">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
                Explore
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { href: "/leaderboard", label: "Leaderboard", sub: "See who's leading" },
                  { href: "/prompt", label: "Prompt Challenge", sub: "This week's challenge" },
                  { href: "/competitions", label: "Competitions", sub: "Open now" },
                  { href: "/news", label: "News Digest", sub: "Officer takes" },
                ].map(({ href, label, sub }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-[#1e1e2e] hover:border-[#b69bff]/30 hover:bg-[#b69bff]/5 transition-all group"
                  >
                    <div>
                      <p className="font-mono text-xs text-[#e8e8f0]">{label}</p>
                      <p className="font-mono text-[10px] text-[#55556a]">{sub}</p>
                    </div>
                    <span className="text-[#55556a] group-hover:text-[#b69bff] transition-colors text-sm">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 card-glow">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
                Connect
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "@warriorai", sub: "Instagram", href: "https://www.instagram.com/warriorai/" },
                  { label: "Discord Server", sub: "Chat + announcements", href: "https://discord.gg/7QctqCABR" },
                  { label: "westwoodai", sub: "GitHub Org", href: "https://github.com/westwoodai" },
                  { label: "Linktree", sub: "All links", href: "https://linktr.ee/westwoodhsaiclub" },
                ].map(({ label, sub, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-[#1e1e2e] hover:border-[#6ee7ff]/30 hover:bg-[#6ee7ff]/5 transition-all group"
                  >
                    <div>
                      <p className="font-mono text-xs text-[#e8e8f0]">{label}</p>
                      <p className="font-mono text-[10px] text-[#55556a]">{sub}</p>
                    </div>
                    <span className="text-[#55556a] group-hover:text-[#6ee7ff] transition-colors text-sm">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Recent meetings */}
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl overflow-hidden card-glow">
              <div className="px-5 py-4 border-b border-[#1e1e2e] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                  Recent Meetings
                </span>
                <Link
                  href="/meetings"
                  className="font-mono text-[10px] text-[#8888aa] hover:text-[#b69bff] transition-colors"
                >
                  Full archive →
                </Link>
              </div>
              <div className="divide-y divide-[#1e1e2e]">
                {recentMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="px-5 py-4 flex items-start justify-between gap-4 hover:bg-[#16161f] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant={meeting.type as "lesson" | "speaker" | "workshop" | "competition" | "social"}>
                          {typeLabels[meeting.type]}
                        </Badge>
                      </div>
                      <p
                        className="font-serif italic text-base text-[#e8e8f0] leading-snug"
                        style={{ fontFamily: "var(--font-instrument-serif)" }}
                      >
                        {meeting.topic}
                      </p>
                      <p className="font-mono text-[10px] text-[#55556a] mt-0.5">
                        {meeting.presenter}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-[10px] text-[#55556a]">
                        {meeting.date ? formatDate(meeting.date) : "TBD"}
                      </p>
                      {meeting.slidesUrl && (
                        <a
                          href={meeting.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] text-[#6ee7ff] hover:text-[#9cf0ff] transition-colors"
                        >
                          Slides ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active projects */}
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl overflow-hidden card-glow">
              <div className="px-5 py-4 border-b border-[#1e1e2e] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
                  <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                    Active Projects
                  </span>
                </div>
                <Link
                  href="/projects"
                  className="font-mono text-[10px] text-[#8888aa] hover:text-[#b69bff] transition-colors"
                >
                  All projects →
                </Link>
              </div>
              <div className="divide-y divide-[#1e1e2e]">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="px-5 py-4 flex items-start gap-4 hover:bg-[#16161f] transition-colors"
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{project.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`font-serif italic text-base text-[#e8e8f0]`}
                          style={{ fontFamily: "var(--font-instrument-serif)" }}
                        >
                          {project.title}
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#b69bff]/30 text-[#b69bff] bg-[#b69bff]/10">
                          {project.category}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#8888aa] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <p className="font-mono text-[10px] text-[#55556a] mt-1">
                        {project.author}
                      </p>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] text-[#6ee7ff] hover:text-[#9cf0ff] transition-colors shrink-0"
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
