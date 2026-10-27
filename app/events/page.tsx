import type { Metadata } from "next";
import Link from "next/link";
import FileLink from "@/components/ui/FileLink";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import { outreach, talks } from "@/lib/content";
import type { Talk } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Special events — Westwood AI Club",
  description: "Guest speakers from industry and research, and the club's outreach to younger students.",
};

const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .filter((part) => /^[A-Z]/.test(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

function Monogram({ name, large = false }: { name: string; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 rotate-[-5deg] items-center justify-center rounded-2xl font-black tracking-tight ${
        large ? "size-16 bg-[#f0ad82] text-xl text-night" : "size-12 bg-blue-soft text-base text-accent"
      }`}
    >
      {initials(name)}
    </span>
  );
}

function FeaturedTalk({ talk }: { talk: Talk }) {
  return (
    <article className="relative mb-4 overflow-hidden rounded-[2rem] bg-night p-7 text-white poster-grid sm:p-10">
      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full border-[32px] border-white/5" />
      <p className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[.16em] text-[#d9e6ff]">
        <span className="size-2 rounded-full bg-[#f0ad82]" /> Latest talk · <time dateTime={talk.date}>{formatShortDate(talk.date)}</time>
      </p>
      <h3 className="relative max-w-3xl font-serif text-4xl italic leading-[1.02] text-[#f0ad82] sm:text-5xl">{talk.title}</h3>
      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Monogram name={talk.speaker} large />
          <div>
            <p className="text-xl font-black tracking-tight">{talk.speaker}</p>
            <p className="text-sm text-[#bdccea]">{talk.role}, {talk.org}</p>
          </div>
        </div>
        {talk.slides && (
          <a href={talk.slides.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-bold text-night transition-transform hover:-translate-y-0.5">
            View the slides<span className="sr-only">: {talk.title}</span> ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function EventsPage() {
  const [latest, ...earlier] = talks;
  const firstYear = Math.min(...[...talks, ...outreach].map((e) => Number(e.date.slice(0, 4))));

  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="Ideas from beyond the classroom"
          title="Special events"
          description="Engineers, founders, and researchers who came to share how they use AI — plus the times our members taught it to younger students."
          stats={[
            { value: String(talks.length), label: "Guest talks" },
            { value: String(outreach.length), label: "Outreach events" },
            { value: String(firstYear), label: "Since" },
          ]}
        />

        <section className="mb-16">
          <SectionHeader title="Guest speakers" count={`${talks.length} talks`} />
          <FeaturedTalk talk={latest} />
          <div className="grid gap-4 sm:grid-cols-2">
            {earlier.map((t) => (
              <article key={t.id} className="flex flex-col rounded-[1.75rem] border border-rule bg-white p-6 shadow-[0_14px_34px_rgba(17,26,51,.05)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(17,26,51,.1)] sm:p-7">
                <p className="mb-5 text-xs font-bold uppercase tracking-[.16em] text-event-speaker">
                  <time dateTime={t.date}>{formatShortDate(t.date)}</time>
                </p>
                <h3 className="font-serif text-2xl italic leading-tight text-accent-warm">{t.title}</h3>
                <div className="mt-5 flex items-center gap-3">
                  <Monogram name={t.speaker} />
                  <div>
                    <p className="text-lg font-black leading-tight tracking-tight text-ink">{t.speaker}</p>
                    <p className="text-sm text-ink-muted">{t.role}, {t.org}</p>
                  </div>
                </div>
                {t.slides && (
                  <div className="mt-auto pt-6 text-sm">
                    <FileLink href={t.slides.url} format={t.slides.format}>
                      {t.speaker}&apos;s slides
                    </FileLink>
                  </div>
                )}
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-2xl bg-blue-soft px-5 py-4 text-sm text-ink">
            Know someone who works with AI and would talk to students? Email{" "}
            <a href="mailto:wwhs.aiexploration@gmail.com" className="font-bold text-accent underline underline-offset-4">wwhs.aiexploration@gmail.com</a>. Upcoming speakers go on the{" "}
            <Link href="/calendar" className="font-bold text-accent underline underline-offset-4">club calendar</Link>.
          </p>
        </section>

        <section>
          <SectionHeader title="Outreach" count="Teaching younger students" />
          <ol className="relative space-y-4 border-l-2 border-rule pl-6">
            {outreach.map((e) => (
              <li key={e.id} className="relative rounded-3xl border border-rule bg-white p-6">
                <span aria-hidden="true" className="absolute -left-[33px] top-8 size-4 rounded-full border-4 border-paper bg-accent-warm" />
                <p className="text-xs font-bold uppercase tracking-[.16em] text-accent-warm">
                  <time dateTime={e.date}>{formatShortDate(e.date)}</time>
                </p>
                <h3 className="mt-2 text-xl font-black tracking-tight text-ink">{e.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{e.description}</p>
                {e.files && (
                  <ul className="mt-4 space-y-2 text-sm">
                    {e.files.map((f) => (
                      <li key={f.url}>
                        <FileLink href={f.url} format={f.format}>{f.label}</FileLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
