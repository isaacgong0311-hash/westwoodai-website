import Link from "next/link";

const cardClass = "group border-r border-b border-rule p-6 min-h-48 flex flex-col hover:bg-paper-raised transition-colors";

export default function StartHere() {
  return (
    <section className="px-4 sm:px-6 pb-16" aria-labelledby="start-here-title">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">Your first step</p>
            <h2 id="start-here-title" className="font-serif text-3xl sm:text-4xl leading-none text-ink">Start here</h2>
          </div>
          <p className="text-sm text-ink-muted max-w-sm">Join a meeting, try a lesson, or explore the people who have shared their work with the club.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-rule">
          <a href="https://forms.gle/m1a5LrzEBHhacpbg6" target="_blank" rel="noopener noreferrer" className={cardClass}>
            <span className="text-xs text-accent mb-8">01 / JOIN</span>
            <span className="font-serif text-2xl text-ink leading-tight mb-2">Make it official</span>
            <span className="text-sm text-ink-muted leading-relaxed flex-1">Fill out the interest form to get club updates. Beginners are welcome.</span>
            <span className="text-sm text-accent mt-5 group-hover:underline">Interest form ↗</span>
          </a>
          <a href="https://sites.google.com/view/westwoodaiclub/more/previous-slides" target="_blank" rel="noopener noreferrer" className={cardClass}>
            <span className="text-xs text-accent mb-8">02 / LEARN</span>
            <span className="font-serif text-2xl text-ink leading-tight mb-2">Explore past lessons</span>
            <span className="text-sm text-ink-muted leading-relaxed flex-1">Browse the club&apos;s public archive of presentations and code notebooks.</span>
            <span className="text-sm text-accent mt-5 group-hover:underline">Open archive ↗</span>
          </a>
          <Link href="/#speakers" className={cardClass}>
            <span className="text-xs text-accent mb-8">03 / GET INSPIRED</span>
            <span className="font-serif text-2xl text-ink leading-tight mb-2">Meet our speakers</span>
            <span className="text-sm text-ink-muted leading-relaxed flex-1">See the practitioners and builders who have spoken to the club.</span>
            <span className="text-sm text-accent mt-5 group-hover:underline">Guest speakers →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
