import type { Metadata } from "next";
import Link from "next/link";
import FileLink from "@/components/ui/FileLink";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import PhotoGrid from "@/components/ui/PhotoGrid";
import { outreach, speakerLine, talkPhotos, talks } from "@/lib/content";
import { formatShortDate } from "@/lib/utils";
import JsonLd from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  title: "Events",
  description: "Guest speakers from industry and research, and the club's outreach to younger students.",
};

export default function EventsPage() {
  const firstYear = Math.min(...[...talks, ...outreach].map((e) => Number(e.date.slice(0, 4))));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": talks.map((t) => ({
            "@type": "EducationEvent",
            name: t.title,
            startDate: t.date,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: { "@type": "Place", name: "Westwood High School", address: "Austin, TX" },
            performer: { "@type": "Person", name: t.speaker, jobTitle: t.role, ...(t.org && { worksFor: { "@type": "Organization", name: t.org } }) },
            organizer: { "@type": "Organization", name: "Westwood AI Club" },
          })),
        }}
      />
      <PageHeader
        eyebrow="Events"
        title="Guest speakers and outreach"
        description="A few times a year someone who works with AI comes to a meeting to talk about their job. Members have also taught intro AI sessions at elementary and middle schools."
        stats={[
          { value: String(talks.length), label: "guest talks" },
          { value: String(outreach.length), label: "outreach events" },
          { value: String(firstYear), label: "first event" },
        ]}
      />

      <section aria-labelledby="talks" className="mb-16">
        <SectionHeader id="talks" title="Guest talks" count="newest first" />
        <ol className="border-t border-rule">
          {talks.map((t) => (
            <li key={t.id} className="grid gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[8rem_1fr]">
              <time dateTime={t.date} className="font-mono text-xs leading-6 text-ink-muted">{formatShortDate(t.date)}</time>
              <div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">{t.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{speakerLine(t)}</p>
                {t.slides && (
                  <p className="mt-3 text-sm">
                    <FileLink href={t.slides.url} format={t.slides.format}>Slides from the talk</FileLink>
                  </p>
                )}
                {talkPhotos(t).length > 0 && (
                  <PhotoGrid
                    photos={talkPhotos(t)}
                    className="mt-5 sm:grid-cols-3 lg:grid-cols-4"
                    sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 50vw"
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm leading-relaxed text-ink-muted">
          If you know someone who works with AI and would talk to students, email{" "}
          <a href="mailto:wwhs.aiexploration@gmail.com" className="link">wwhs.aiexploration@gmail.com</a>. Upcoming
          speakers are posted on the <Link href="/calendar" className="link">calendar</Link>.
        </p>
      </section>

      <section aria-labelledby="outreach">
        <SectionHeader id="outreach" title="Outreach" count="teaching younger students" />
        <ol className="border-t border-rule">
          {outreach.map((e) => (
            <li key={e.id} className="grid gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[8rem_1fr]">
              <time dateTime={e.date} className="font-mono text-xs leading-6 text-ink-muted">{formatShortDate(e.date)}</time>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-ink">{e.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{e.description}</p>
                {e.files && (
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {e.files.map((f) => (
                      <li key={f.url}>
                        <FileLink href={f.url} format={f.format}>{f.label}</FileLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
