import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TypeDot } from "@/components/calendar/EventChip";
import Button from "@/components/ui/Button";
import Panel from "@/components/ui/Panel";
import configData from "@/data/config.json";
import { getEvent } from "@/lib/calendar";
import { EVENT_TYPES, formatEventWhen, googleAddLink, isPast } from "@/lib/events";
import type { ClubEvent, SiteConfig } from "@/lib/types";

const config = configData as SiteConfig;

export const revalidate = 900;

type Props = { params: Promise<{ id: string }> };

/** The event's location, else the usual room — except deadlines, which don't happen anywhere. */
function eventLocation(event: ClubEvent): string | null {
  if (event.location) return event.location;
  return event.type === "deadline" ? null : `Room ${config.nextMeeting.room}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(decodeURIComponent((await params).id));
  if (!event) return { title: "Event not found" };
  const where = eventLocation(event);
  return {
    title: `${event.title}`,
    description: [formatEventWhen(event), where].filter(Boolean).join(" · "),
  };
}

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

/** Plain-text description with bare URLs turned into links. */
function Linkified({ text }: { text: string }) {
  return (
    <p className="text-base leading-relaxed text-ink whitespace-pre-line">
      {text.split(URL_PATTERN).map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 decoration-rule hover:decoration-accent break-all"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </p>
  );
}

export default async function EventPage({ params }: Props) {
  const event = await getEvent(decodeURIComponent((await params).id));
  if (!event) notFound();

  const past = isPast(event);
  const where = eventLocation(event);

  return (
    <div className="px-4 sm:px-6 py-16">
      <article className="max-w-3xl mx-auto">
        <Link href="/calendar" className="text-sm text-ink-muted hover:text-ink">
          &larr; Calendar
        </Link>

        <p className="font-mono flex items-center gap-2 text-xs text-ink-muted mt-8 mb-2">
          <TypeDot event={event} className="size-2" />
          {EVENT_TYPES[event.type].label}
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink mb-8">
          {event.title}
        </h1>

        <Panel raised className="p-5 mb-8">
          <dl className="grid grid-cols-[5.5rem_1fr] gap-y-2 text-sm">
            <dt className="text-ink-muted">When</dt>
            <dd className="text-ink">{formatEventWhen(event)}</dd>
            {where && (
              <>
                <dt className="text-ink-muted">Where</dt>
                <dd className="text-ink">{where}</dd>
              </>
            )}
            {event.presenter && (
              <>
                <dt className="text-ink-muted">Presenter</dt>
                <dd className="text-ink">{event.presenter}</dd>
              </>
            )}
          </dl>
          {past && <p className="text-sm text-ink-muted mt-4 pt-4 border-t border-rule">This event has passed.</p>}
        </Panel>

        {event.description && (
          <div className="mb-10">
            <Linkified text={event.description} />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-6">
          {!past && (
            <Button href={googleAddLink(event)} external variant="primary">
              Add to my calendar
            </Button>
          )}
          {event.slidesUrl && (
            <Button href={event.slidesUrl} external variant={past ? "primary" : "secondary"}>
              Slides ↗
            </Button>
          )}
          {event.related && (
            <Button href={event.related.href} variant="secondary">
              {event.related.label}&nbsp;&rarr;
            </Button>
          )}
          {event.htmlLink && (
            <Button href={event.htmlLink} external variant="secondary">
              Open in Google Calendar ↗
            </Button>
          )}
        </div>
      </article>
    </div>
  );
}
