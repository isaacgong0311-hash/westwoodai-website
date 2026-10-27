import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import configData from "@/data/config.json";
import { lessonYears, members, pastTeams, sponsor, talks } from "@/lib/content";
import type { SiteConfig } from "@/lib/types";

const config = configData as SiteConfig;

export const metadata: Metadata = {
  title: "About — Westwood AI Club",
  description: "What the Westwood AI Club does, who runs it, and how to stay in the loop.",
};

const WHAT_WE_DO = [
  "Lessons on AI and machine learning topics",
  "Interactive demos and code-alongs",
  "Discussions about new AI tools",
  "Student-led projects",
  "Competitions, in the club and beyond",
  "Talks from guest speakers",
];

const CHANNELS = [
  { label: "Interest form", detail: "Get on the mailing list for meeting dates, speakers, and competitions.", href: "https://forms.gle/m1a5LrzEBHhacpbg6" },
  { label: "Discord", detail: "Reminders, chat with other members, and meeting discussion.", href: "https://discord.gg/7QctqCABR" },
  { label: "Instagram · @warriorai", detail: "Meeting reminders and recaps. We follow back!", href: "https://www.instagram.com/warriorai/" },
  { label: "GitHub · westwoodai", detail: "Code from our demos and interactive activities.", href: "https://github.com/westwoodai" },
  { label: "Email", detail: "wwhs.aiexploration@gmail.com — questions, concerns, or ideas.", href: "mailto:wwhs.aiexploration@gmail.com" },
];

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="Westwood High School · Austin, TX"
          title="About the club"
          description="We give students an in-depth education in artificial intelligence and machine learning. No coding experience and no membership fee — everyone is welcome, any time of year."
          stats={[
            { value: String(pastTeams.length + 1), label: "Years running" },
            { value: String(lessonYears.reduce((n, y) => n + y.lessons.length, 0)), label: "Lessons taught" },
            { value: String(talks.length), label: "Guest speakers" },
          ]}
        />

        <div className="mb-16 grid gap-4 md:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-[2rem] bg-blue-soft p-7 sm:p-8">
            <h2 className="mb-5 text-2xl font-black tracking-tight text-ink">What we do</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {WHAT_WE_DO.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold text-ink">
                  <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-[2rem] bg-peach-soft p-7 sm:p-8">
            <h2 className="mb-5 text-2xl font-black tracking-tight text-ink">When &amp; where</h2>
            <p className="text-sm leading-relaxed text-ink">
              Weekly after school at <strong>{config.nextMeeting.time}</strong>, alternating Mondays and Wednesdays, in{" "}
              <strong>{config.nextMeeting.teacher}&apos;s room ({config.nextMeeting.room})</strong>.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">Club sponsor: <strong className="text-ink">{sponsor}</strong></p>
          </section>
        </div>

        <section className="mb-16">
          <SectionHeader title="Officers" count={`${lessonYears[0].year} team`} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((m) => (
              <li key={m.id} className="flex items-center gap-3 rounded-2xl border border-rule bg-white p-4 shadow-[0_8px_20px_rgba(17,26,51,.04)]">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-xs font-black text-accent">
                  {m.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-ink">{m.name}</span>
                  <span className="block text-xs text-ink-muted">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-10 text-xs font-black uppercase tracking-[.18em] text-accent">Past officer teams</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pastTeams.map((team) => (
              <section key={team.year} className="rounded-2xl border border-rule bg-white p-5">
                <h4 className="mb-3 text-lg font-black tracking-tight text-ink">{team.year}</h4>
                <dl className="space-y-1.5 text-sm">
                  {team.officers.map((o) => (
                    <div key={o.role} className="flex flex-wrap justify-between gap-x-3">
                      <dt className="text-ink-muted">{o.role}</dt>
                      <dd className="font-semibold text-ink">{o.name}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </section>

        <section id="stay-updated" className="scroll-mt-28">
          <SectionHeader title="Stay in the loop" count="The best way to hear about meetings" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group block h-full rounded-2xl border border-rule bg-white p-5 transition-colors hover:border-accent"
                >
                  <span className="block text-base font-black text-ink group-hover:text-accent">
                    {c.label}{c.href.startsWith("http") && " ↗"}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{c.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
