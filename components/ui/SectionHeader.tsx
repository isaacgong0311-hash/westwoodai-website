interface SectionHeaderProps {
  title: string;
  count?: string;
  /** Heading id, for a section's aria-labelledby. */
  id?: string;
}

/**
 * Section title + hairline rule + optional right-aligned count. Replaces
 * three verbatim copies of this block (Guest Speakers, Club History, and
 * the old "Pages" grid) — and promotes the title to a real <h2>, since the
 * old version rendered it as a styled <p> with no heading at all.
 */
export default function SectionHeader({ title, count, id }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-2">
      <h2 id={id} className="font-serif text-2xl font-normal text-ink">{title}</h2>
      {count && <span className="text-sm text-ink-muted">{count}</span>}
    </div>
  );
}
