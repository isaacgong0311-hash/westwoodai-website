import type { Metadata } from "next";
import Link from "next/link";
import FileLink from "@/components/ui/FileLink";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import { outreach, talks } from "@/lib/content";
import { formatShortDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Special events — Westwood AI Club",
  description: "Guest speakers from industry and research, and the club's outreach to younger students.",
};

export default function EventsPage() {
  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="Ideas from beyond the classroom"
          title="Special events"
          description="Engineers, founders, and researchers who came to share how they use AI — plus the times our members taught it to younger students."
        />

        <section className="mb-16">
          <SectionHeader title="Guest speakers" count={`${talks.length} talks`} />
          <div className="grid gap-4 sm:grid-cols-2">
            {talks.map((t) => (
              <article key={t.id} className="flex flex-col rounded-[1.75rem] border border-rule bg-white p-6 shadow-[0_14px_34px_rgba(17,26,51,.05)] sm:p-7">
                <p className="mb-6 text-xs font-bold uppercase tracking-[.16em] text-event-speaker">
                  <time dateTime={t.date}>{formatShortDate(t.date)}</time>
                </p>
                <h3 className="font-serif text-2xl italic leading-tight text-accent-warm">{t.title}</h3>
                <p className="mt-4 text-lg font-black tracking-tight text-ink">{t.speaker}</p>
                <p className="text-sm text-ink-muted">{t.role}, {t.org}</p>
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
          <p className="mt-6 text-sm text-ink-muted">
            Upcoming speakers are posted on the <Link href="/calendar" className="font-semibold text-accent underline underline-offset-4 hover:text-ink">club calendar</Link>.
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
