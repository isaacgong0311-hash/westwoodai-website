import Hero from "@/components/home/Hero";
import MeetingInfo from "@/components/home/MeetingInfo";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import Reveal from "@/components/ui/Reveal";
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
      "Points for showing up, building stuff, and placing in comps. Starts fresh every year.",
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Stuff people in the club are making. Add yours when it's ready.",
  },
  {
    href: "/prompt",
    label: "Prompt of the Week",
    description:
      "A weekly prompt challenge. Send in your best, vote on the rest.",
  },
  {
    href: "/competitions",
    label: "Competitions",
    description:
      "Hackathons and contests we're jumping into. Grab a teammate.",
  },
  {
    href: "/meetings",
    label: "Meetings",
    description:
      "What we did each meeting, plus what's next. Slides land here too.",
  },
  {
    href: "/news",
    label: "News",
    description:
      "Short writeups from officers on AI stuff actually worth your time.",
  },
];

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <MeetingInfo />
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-1" delay={0.05}>
            <NextMeetingCard config={config.nextMeeting} />
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="border border-[#1e1e2e] rounded-xl p-6 h-full">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-4">
                Officers · 2026–27
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="group flex items-center justify-between border-b border-[#1e1e2e] last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 pb-3 last:pb-0 sm:[&:nth-last-child(2)]:pb-0"
                  >
                    <span className="font-sans text-sm text-[#e8e8f0] group-hover:text-[#7ea3d8] transition-colors">
                      {m.name}
                    </span>
                    <span className="font-mono text-[11px] text-[#8888aa]">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-5">
              Where to go
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map(({ href, label, description }, i) => (
              <Reveal key={href} delay={0.04 * i} y={20}>
                <Link
                  href={href}
                  className="group block border border-[#1e1e2e] rounded-xl p-5 bg-[#0a0a0f] hover:border-[#7ea3d8]/40 hover:bg-[#10101a] transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-sm text-[#e8e8f0] group-hover:text-white transition-colors">
                      {label}
                    </span>
                    <span className="font-mono text-[#55556a] group-hover:text-[#7ea3d8] group-hover:translate-x-1 transition-all text-sm">
                      →
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#8888aa] leading-relaxed">
                    {description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
