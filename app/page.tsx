import Link from "next/link";
import Hero from "@/components/home/Hero";
import MeetingInfo from "@/components/home/MeetingInfo";
import NextMeetingCard from "@/components/home/NextMeetingCard";
import GuestSpeakers from "@/components/home/GuestSpeakers";
import SectionHeader from "@/components/ui/SectionHeader";
import Panel from "@/components/ui/Panel";
import PhotoGrid from "@/components/content/PhotoGrid";
import configData from "@/data/config.json";
import { photos, slides } from "@/lib/content";
import type { SiteConfig } from "@/lib/types";

const config = configData as SiteConfig;

// The homepage is statically prerendered, but NextMeetingCard's "in N days"
// badge is computed from `new Date()` at render time — without revalidation
// that value would be baked in at build time and never update again. An
// hourly regen is more than enough freshness for a day-granularity countdown.
export const revalidate = 3600;

const ACTIVITIES = [
  "Lessons on AI and machine learning topics",
  "Interactive demos you can follow along with",
  "Discussions about new AI tools and how they're used",
  "Student-led projects",
  "Competitions, inside the club and out",
  "Talks from guest speakers who work in AI",
];

export default function HomePage() {
  const latest = slides.current.meetings[slides.current.meetings.length - 1];

  return (
    <div>
      <Hero founded={config.founded} />

      <section aria-label="Meeting schedule" className="px-4 sm:px-6 pb-14">
        <div className="max-w-5xl mx-auto">
          <MeetingInfo />
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <NextMeetingCard config={config.nextMeeting} />
            {latest && (
              <Panel className="p-5">
                <h2 className="text-xs uppercase tracking-wider text-ink-muted mb-3">Missed a meeting?</h2>
                <p className="text-base text-ink leading-snug mb-3">
                  Meeting {latest.number}: {latest.title}
                </p>
                <Link href="/meetings" className="text-sm underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                  Catch up with this year&rsquo;s meeting slides
                </Link>
              </Panel>
            )}
          </div>

          <div className="lg:col-span-2">
            <SectionHeader title="What we do" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {ACTIVITIES.map((a) => (
                <li key={a} className="py-3 border-b border-rule text-base text-ink">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-ink">
              New here?{" "}
              <Link href="/join" className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                Here&rsquo;s how to join
              </Link>
              , or read the{" "}
              <Link href="/faq" className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                frequently asked questions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="photos-heading" className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Around the club" id="photos-heading" />
          <div className="mt-4">
            <PhotoGrid photos={photos.club.slice(0, 6)} />
          </div>
        </div>
      </section>

      <GuestSpeakers />
    </div>
  );
}
