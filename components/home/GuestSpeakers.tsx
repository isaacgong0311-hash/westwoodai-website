import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { talks } from "@/lib/content";
import { formatShortDate } from "@/lib/utils";

const recent = talks.slice(0, 5);

export default function GuestSpeakers() {
  return (
    <section id="speakers" aria-labelledby="speakers-title" className="scroll-mt-24">
      <SectionHeader id="speakers-title" title="Recent guest speakers" count={`${talks.length} talks since ${talks[talks.length - 1].date.slice(0, 4)}`} />
      <ol className="border-t border-rule">
        {recent.map((t) => (
          <li key={t.id} className="grid gap-x-6 gap-y-1 border-b border-rule py-4 sm:grid-cols-[7rem_1fr]">
            <time dateTime={t.date} className="font-mono text-xs leading-6 text-ink-muted">{formatShortDate(t.date)}</time>
            <div>
              <p className="font-medium text-ink">{t.title}</p>
              <p className="text-sm text-ink-muted">{t.speaker}, {t.role} at {t.org}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link href="/events" className="mt-4 inline-block text-sm text-accent hover:underline">All talks and their slides</Link>
    </section>
  );
}
