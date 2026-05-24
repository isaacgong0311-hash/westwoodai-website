import Hero from "@/components/home/Hero";
import MeetingInfo from "@/components/home/MeetingInfo";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import Stats from "@/components/home/Stats";
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
    description:
      "Points for showing up, building stuff, and placing in comps. Starts fresh every year.",
    accent: "#b69bff",
    tag: "Rankings",
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Stuff people in the club are making. Add yours when it's ready.",
    accent: "#6ee7ff",
    tag: "Showcase",
  },
  {
    href: "/prompt",
    label: "Prompt of the Week",
    description:
      "A weekly prompt challenge. Send in your best, vote on the rest.",
    accent: "#00ff88",
    tag: "Challenge",
  },
  {
    href: "/competitions",
    label: "Competitions",
    description:
      "Hackathons and contests we're jumping into. Grab a teammate.",
    accent: "#c47855",
    tag: "Compete",
  },
  {
    href: "/meetings",
    label: "Meetings",
    description:
      "What we did each meeting, plus what's next. Slides land here too.",
    accent: "#7ea3d8",
    tag: "Archive",
  },
  {
    href: "/news",
    label: "News",
    description:
      "Short writeups from officers on AI stuff actually worth your time.",
    accent: "#b69bff",
    tag: "Digest",
  },
];

const ROLE_COLORS: Record<string, string> = {
  "Co-President": "#b69bff",
  "VP of Competition": "#6ee7ff",
  "VP of Teaching": "#6ee7ff",
  "Secretary": "#00ff88",
  "Webmaster": "#c47855",
  "Activities Coordinator": "#8888aa",
  "Outreach Coordinator": "#8888aa",
};

export default function HomePage() {
  return (
    <div>
      <Hero />

      {/* Scrolling marquee ticker */}
      <Marquee />

      {/* Stat counters */}
      <Stats />

      {/* Meeting schedule */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <MeetingInfo />
          </Reveal>
        </div>
      </section>

      {/* Next meeting + Officers */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-1" delay={0.05}>
            <NextMeetingCard config={config.nextMeeting} />
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="border border-[#1e1e2e] rounded-xl overflow-hidden h-full">
              <div className="px-5 py-3 border-b border-[#1e1e2e] flex items-center justify-between">
                <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                  Officers · 2026–27
                </p>
                <span className="font-mono text-[10px] text-[#2e2e45]">
                  {members.length} people
                </span>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
                {members.map((m) => {
                  const accentColor = ROLE_COLORS[m.role] ?? "#8888aa";
                  return (
                    <div
                      key={m.id}
                      className="group flex items-center justify-between border-b border-[#1e1e2e] last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 py-3 last:pb-0 sm:[&:nth-last-child(2)]:pb-0"
                    >
                      <span className="font-sans text-sm text-[#e8e8f0] group-hover:text-white transition-colors">
                        {m.name}
                      </span>
                      <span
                        className="font-mono text-[10px] opacity-60 group-hover:opacity-100 transition-opacity ml-2 text-right"
                        style={{ color: accentColor }}
                      >
                        {m.role}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Navigation grid */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                Explore
              </p>
              <div className="flex-1 h-px bg-[#1e1e2e]" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map(({ href, label, description, accent, tag }, i) => (
              <Reveal key={href} delay={0.04 * i} y={20}>
                <Link
                  href={href}
                  className="group relative block border border-[#1e1e2e] rounded-xl p-5 bg-[#0a0a0f] hover:bg-[#0d0d14] transition-all duration-300 h-full overflow-hidden card-glow"
                >
                  {/* Hover accent glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 60% 80% at 0% 50%, ${accent}08 0%, transparent 70%)`,
                    }}
                  />
                  {/* Top border flash */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${accent}50, transparent)`,
                    }}
                  />

                  <div className="relative flex items-start justify-between mb-2 gap-2">
                    <span className="font-sans text-sm text-[#e8e8f0] group-hover:text-white transition-colors leading-snug">
                      {label}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded border opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ color: accent, borderColor: `${accent}40` }}
                      >
                        {tag}
                      </span>
                      <span
                        className="font-mono text-[#55556a] group-hover:translate-x-1 transition-transform text-sm"
                        style={{ color: `${accent}80` }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                  <p className="relative font-sans text-xs text-[#8888aa] leading-relaxed">
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
