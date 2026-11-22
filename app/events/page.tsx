import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import ExternalLink from "@/components/ui/ExternalLink";
import PhotoGrid from "@/components/content/PhotoGrid";
import { events, photos } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import type { ClubEvent } from "@/lib/types";

export const metadata = {
  title: "Events — Westwood AI Club",
  description: "Guest speakers from industry and the club's outreach events, with slides and photos.",
};

function EventEntry({ event }: { event: ClubEvent }) {
  const eventPhotos = event.photos ? photos.events[event.photos] ?? [] : [];
  const headingId = `${event.id}-h`;

  return (
    <article id={event.id} aria-labelledby={headingId} className="py-8 border-b border-rule last:border-b-0 scroll-mt-24">
      <p className="text-sm text-ink-muted mb-1">
        <time dateTime={event.date}>{formatDate(event.date)}</time>
      </p>
      <h3 id={headingId} className="font-serif text-2xl font-normal text-ink leading-snug">
        {event.title}
      </h3>
      {event.speaker && (
        <p className="text-base text-ink mt-1">
          {event.speaker}
          {event.affiliation && <span className="text-ink-muted"> &middot; {event.affiliation}</span>}
        </p>
      )}
      {event.description && <p className="text-base text-ink leading-relaxed mt-2 max-w-2xl">{event.description}</p>}
      {event.slides && (
        <ul className="mt-3 space-y-1">
          {event.slides.map((s) => (
            <li key={s.url}>
              <ExternalLink href={s.url} className="inline-block py-1 text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                View {s.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      )}
      {eventPhotos.length > 0 && (
        <div className="mt-5">
          <PhotoGrid photos={eventPhotos} />
        </div>
      )}
    </article>
  );
}

export default function EventsPage() {
  const speakers = events.filter((e) => e.kind === "speaker");
  const outreach = events.filter((e) => e.kind === "outreach");

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          eyebrow="Special events"
          title="Speakers & events"
          description="People who work in AI come to talk to the club every year, and members take what they've learned to younger students at local schools."
        />

        <section aria-labelledby="speakers-heading" className="mb-16">
          <SectionHeader title="Guest speakers" id="speakers-heading" count={`${speakers.length} talks`} />
          {speakers.map((e) => (
            <EventEntry key={e.id} event={e} />
          ))}
        </section>

        <section aria-labelledby="outreach-heading">
          <SectionHeader title="Outreach" id="outreach-heading" count={`${outreach.length} events`} />
          {outreach.map((e) => (
            <EventEntry key={e.id} event={e} />
          ))}
        </section>
      </div>
    </div>
  );
}
