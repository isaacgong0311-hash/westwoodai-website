import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { talks } from "@/lib/content";

const SPEAKERS = talks.map((t) => ({ ...t, year: t.date.slice(0, 4) }));
const earliestYear = Math.min(...SPEAKERS.map((s) => Number(s.year)));

export default function GuestSpeakers() {
  return (
    <section id="speakers" className="px-4 sm:px-6 py-20 scroll-mt-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-accent">Ideas from beyond the classroom</p>
        <SectionHeader
          title="People who came to share."
          count={`${SPEAKERS.length} guest speakers since ${earliestYear}`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((s, i) => (
            <article key={s.id} className={`relative flex min-h-60 flex-col overflow-hidden rounded-[1.75rem] border p-6 sm:p-7 ${i === 0 ? "border-accent bg-blue-soft sm:col-span-2 lg:col-span-2" : "border-rule bg-paper"}`}>
              <div className="mb-8 flex items-start justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? "bg-accent text-white" : "bg-white text-accent"}`}>{s.year}</span>
                <span aria-hidden="true" className={`font-serif text-5xl leading-none ${i === 0 ? "text-accent/20" : "text-accent-warm/20"}`}>&ldquo;</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-ink">{s.speaker}</h3>
              <p className="mt-1 text-sm text-ink-muted">{s.role}, {s.org}</p>
              <p className="mt-auto pt-7 font-serif text-xl italic leading-tight text-accent-warm">{s.topic}</p>
            </article>
          ))}
        </div>
        <Link href="/events" className="mt-8 inline-block text-sm font-bold text-accent underline decoration-accent/30 underline-offset-4 hover:text-ink">
          See every talk and its slides →
        </Link>
      </div>
    </section>
  );
}
