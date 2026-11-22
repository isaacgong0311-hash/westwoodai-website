import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { speakerEvents } from "@/lib/content";

export default function GuestSpeakers() {
  const earliestYear = Math.min(...speakerEvents.map((s) => Number(s.date.slice(0, 4))));

  return (
    <section id="speakers" aria-labelledby="speakers-heading" className="px-4 sm:px-6 pb-14 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Guest speakers"
          id="speakers-heading"
          count={`${speakerEvents.length} since ${earliestYear}`}
        />
        <ul>
          {speakerEvents.map((s) => (
            <li key={s.id} className="flex gap-6 py-4 border-b border-rule last:border-b-0 items-baseline">
              <time dateTime={s.date} className="w-12 flex-shrink-0 text-sm text-ink-muted">
                {s.date.slice(0, 4)}
              </time>
              <div>
                <h3 className="text-base text-ink">{s.speaker}</h3>
                {s.affiliation && <p className="text-sm text-ink-muted mt-0.5">{s.affiliation}</p>}
                <p className="font-serif text-lg italic text-ink mt-1">&ldquo;{s.title}&rdquo;</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base">
          <Link href="/events" className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
            See every talk&rsquo;s slides and photos
          </Link>
        </p>
      </div>
    </section>
  );
}
