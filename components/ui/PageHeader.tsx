interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  /** Big-number facts shown along the bottom of the header, e.g. "72 lessons". */
  stats?: { value: string; label: string }[];
}

/**
 * The eyebrow + h1 + lede block every page opens with. Replaces seven
 * copies of the same three-part markup (leaderboard, projects, prompt,
 * competitions, meetings, news, 404) that had quietly drifted apart —
 * different max-widths, some wrapped in a fade-in and some not.
 */
export default function PageHeader({ eyebrow, title, description, centered = false, stats }: PageHeaderProps) {
  return (
    <div className={`relative isolate overflow-hidden rounded-[2rem] bg-night px-7 py-10 sm:px-10 sm:py-12 mb-10 poster-grid ${centered ? "text-center" : ""}`}>
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full border-[38px] border-white/7" />
      <span aria-hidden="true" className="pointer-events-none absolute right-10 bottom-5 size-24 rounded-full bg-accent-warm/25 blur-2xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -left-20 -bottom-24 size-64 rounded-full bg-accent/30 blur-3xl" />
      <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-[#a9c5ff] mb-3">
        {eyebrow}
      </p>
      <h1 className={`relative max-w-3xl font-sans text-4xl sm:text-6xl font-black tracking-[-0.05em] leading-[.98] text-white mb-5 ${centered ? "mx-auto" : ""}`}>
        {title}
      </h1>
      {description && (
        <p className={`relative text-base leading-relaxed text-[#e7eeff] ${centered ? "mx-auto" : ""} max-w-xl`}>
          {description}
        </p>
      )}
      {stats && stats.length > 0 && (
        <dl className={`relative mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 ${centered ? "justify-center" : ""}`}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-xs font-semibold uppercase tracking-[.14em] text-[#a9c5ff]">{s.label}</dt>
              <dd className="font-serif text-4xl italic leading-none text-[#f0ad82] sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
