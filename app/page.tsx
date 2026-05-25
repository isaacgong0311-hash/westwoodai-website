import Hero from "@/components/home/Hero";
import MeetingInfo from "@/components/home/MeetingInfo";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import Stats from "@/components/home/Stats";
import GuestSpeakers from "@/components/home/GuestSpeakers";
import InstagramSection from "@/components/home/InstagramSection";
import Marquee from "@/components/ui/Marquee";
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
    description: "Points for showing up, building stuff, placing in comps. Resets every year.",
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Stuff people in the club are making. Add yours when it's ready.",
  },
  {
    href: "/prompt",
    label: "Prompt of the Week",
    description: "A weekly challenge. Send in your best, vote on the rest.",
  },
  {
    href: "/competitions",
    label: "Competitions",
    description: "Hackathons and contests we're entering. Grab a teammate and go.",
  },
  {
    href: "/meetings",
    label: "Meetings",
    description: "What we covered each meeting. Slides live here too.",
  },
  {
    href: "/news",
    label: "News",
    description: "Short takes from officers on AI stuff actually worth reading.",
  },
];

// Club history — pulled from Google Sites officer page
const HISTORY = [
  { year: "2026–27", president: "Reett Aulakh & Aanya Pathak" },
  { year: "2025–26", president: "Victor Lehr" },
  { year: "2024–25", president: "Indivara Kolluru" },
  { year: "2023–24", president: "Raghav Aggarwal" },
  { year: "2022–23", president: "Evan Lai" },
  { year: "2021–22", president: "Shoumik Roychowdhury" },
  { year: "2020–21", president: "Aarya Agarwal" },
  { year: "2019–20", president: "Aarya Agarwal" },
];

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Marquee />

      {/* Stats */}
      <Stats />

      {/* Meeting info */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <MeetingInfo />
          </Reveal>
        </div>
      </section>

      {/* Next meeting + Officers */}
      <section className="px-4 sm:px-6 pb-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Reveal className="lg:col-span-1" delay={0.04}>
            <NextMeetingCard config={config.nextMeeting} />
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.08}>
            <div className="border border-[#1e1e2e] rounded-xl overflow-hidden h-full">
              <div className="px-5 py-3 border-b border-[#1e1e2e] bg-[#0a0a0f] flex items-center justify-between">
                <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                  Officers · 2026–27
                </p>
                <span className="font-mono text-[10px] text-[#2e2e45]">{members.length} people</span>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="group flex items-center justify-between border-b border-[#1e1e2e] last:border-0 sm:[&:nth-last-child(2)]:border-0 py-3"
                  >
                    <span className="font-sans text-sm text-[#e8e8f0] group-hover:text-white transition-colors">
                      {m.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#55556a] ml-2 text-right">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Guest speakers — the real credibility section */}
      <GuestSpeakers />

      {/* Instagram */}
      <InstagramSection />

      {/* Club history */}
      <section className="px-4 sm:px-6 pb-14">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                Club History
              </p>
              <div className="flex-1 h-px bg-[#1e1e2e]" />
              <span className="font-mono text-[10px] text-[#3a3a55]">
                {HISTORY.length} years running
              </span>
            </div>
          </Reveal>
          <div className="border border-[#1e1e2e] rounded-xl overflow-hidden divide-y divide-[#1e1e2e]">
            {HISTORY.map((h, i) => (
              <Reveal key={h.year} delay={i * 0.03}>
                <div className={`flex items-center justify-between px-5 py-3 ${
                  i === 0 ? "bg-[#0d0d14]" : "bg-[#0a0a0f]"
                } hover:bg-[#0d0d14] transition-colors group`}>
                  <span className={`font-mono text-xs ${i === 0 ? "text-[#7ea3d8]" : "text-[#55556a]"}`}>
                    {h.year}
                  </span>
                  <div className="flex items-center gap-2">
                    {i === 0 && (
                      <span className="font-mono text-[9px] text-[#7ea3d8] border border-[#7ea3d8]/30 px-1.5 py-0.5 rounded">
                        current
                      </span>
                    )}
                    <span className={`font-sans text-sm ${i === 0 ? "text-[#e8e8f0]" : "text-[#8888aa] group-hover:text-[#c8c8e0]"} transition-colors`}>
                      {h.president}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore pages */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                Pages
              </p>
              <div className="flex-1 h-px bg-[#1e1e2e]" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map(({ href, label, description }, i) => (
              <Reveal key={href} delay={0.04 * i} y={16}>
                <Link
                  href={href}
                  className="group block border border-[#1e1e2e] rounded-xl p-5 bg-[#0a0a0f] hover:bg-[#0d0d14] hover:border-[#2e2e45] transition-all duration-200 h-full"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sans text-sm text-[#e8e8f0] group-hover:text-white transition-colors">
                      {label}
                    </span>
                    <span className="font-mono text-[#3a3a55] group-hover:text-[#7ea3d8] group-hover:translate-x-1 transition-all text-sm">
                      →
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#55556a] leading-relaxed group-hover:text-[#8888aa] transition-colors">
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
