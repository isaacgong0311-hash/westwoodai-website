import Hero from "@/components/home/Hero";
import MeetingInfo from "@/components/home/MeetingInfo";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import GuestSpeakers from "@/components/home/GuestSpeakers";
import SectionHeader from "@/components/ui/SectionHeader";
import configData from "@/data/config.json";
import membersData from "@/data/members.json";
import type { SiteConfig, Member } from "@/lib/types";

const config = configData as SiteConfig;
const members = membersData as Member[];

// The homepage is statically prerendered, but NextMeetingCard's "in N days"
// badge is computed from `new Date()` at render time — without revalidation
// that value would be baked in at build time and never update again. An
// hourly regen is more than enough freshness for a day-granularity countdown.
export const revalidate = 3600;

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
      <Hero founded={config.founded} />

      <section className="px-4 sm:px-6 pb-14">
        <div className="max-w-5xl mx-auto">
          <MeetingInfo />
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <NextMeetingCard config={config.nextMeeting} />
          </div>

          <div className="lg:col-span-2">
            <SectionHeader title="Officers, 2026–27" count={`${members.length} people`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {members.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex items-center justify-between py-3 border-b border-rule last:border-b-0 ${
                    i < members.length - 2 ? "sm:border-b" : "sm:border-b-0"
                  }`}
                >
                  <span className="text-sm text-ink">{m.name}</span>
                  <span className="text-xs text-ink-muted">{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GuestSpeakers />

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Club history" count={`${HISTORY.length} years running`} />
          <div>
            {HISTORY.map((h, i) => (
              <div
                key={h.year}
                className="flex items-center justify-between py-3 border-b border-rule last:border-b-0"
              >
                <span className={`text-sm ${i === 0 ? "text-accent" : "text-ink-muted"}`}>
                  {h.year}
                </span>
                <div className="flex items-center gap-2">
                  {i === 0 && (
                    <span className="text-xs text-accent border border-accent px-1.5 py-0.5">
                      current
                    </span>
                  )}
                  <span className={`text-sm ${i === 0 ? "text-ink" : "text-ink-muted"}`}>
                    {h.president}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
