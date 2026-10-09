interface SectionHeaderProps {
  title: string;
  count?: string;
}

/**
 * Section title + hairline rule + optional right-aligned count. Replaces
 * three verbatim copies of this block (Guest Speakers, Club History, and
 * the old "Pages" grid) — and promotes the title to a real <h2>, since the
 * old version rendered it as a styled <p> with no heading at all.
 */
export default function SectionHeader({ title, count }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink/10 pb-5 mb-5">
      <h2 className="font-sans text-3xl sm:text-4xl font-black tracking-[-0.045em] text-ink">{title}</h2>
      {count && <span className="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-accent">{count}</span>}
    </div>
  );
}
