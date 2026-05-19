import Hero from "@/components/home/Hero";
import MeetingInfo from "@/components/home/MeetingInfo";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import Link from "next/link";
import configData from "@/data/config.json";
import membersData from "@/data/members.json";
import type { SiteConfig, Member } from "@/lib/types";

const config = configData as SiteConfig;
const members = membersData as Member[];

const sections = [
  {
    href: "/leaderboard",
    label: "Leaderboard",
    description:
      "Member rankings by attendance, projects, and competition results. Resets each school year.",
  },
  {
    href: "/projects",
    label: "Projects",
    description:
      "What members are building — from RAG apps to RL agents. Submit your own.",
  },
  {
    href: "/prompt",
    label: "Prompt of the Week",
    description:
      "A new challenge each week. Submit your best prompt, vote on others'.",
  },
  {
    href: "/competitions",
    label: "Competitions",
    description:
      "Internal challenges and external comps we're entering as a club.",
  },
  {
    href: "/meetings",
    label: "Meetings",
    description:
      "Topics, presenters, and slides from past meetings. First entry is the upcoming one.",
  },
  {
    href: "/news",
    label: "News Digest",
    description:
      "Officer-curated weekly summaries of what matters in AI right now.",
  },
];

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <MeetingInfo />
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <NextMeetingCard config={config.nextMeeting} />
          </div>

          <div className="lg:col-span-2 border border-[#1e1e2e] rounded-xl p-6">
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
              2026–27 Officer Team
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between border-b border-[#1e1e2e] last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 pb-3 last:pb-0 sm:[&:nth-last-child(2)]:pb-0"
                >
                  <span className="font-sans text-sm text-[#e8e8f0]">
                    {m.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#8888aa]">
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-5">
            Sections
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e1e2e] border border-[#1e1e2e] rounded-xl overflow-hidden">
            {sections.map(({ href, label, description }) => (
              <Link
                key={href}
                href={href}
                className="bg-[#0a0a0f] p-5 hover:bg-[#111118] transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-sm text-[#e8e8f0]">
                    {label}
                  </span>
                  <span className="font-mono text-[#55556a] group-hover:text-[#b69bff] transition-colors text-sm">
                    →
                  </span>
                </div>
                <p className="font-sans text-xs text-[#8888aa] leading-relaxed">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
