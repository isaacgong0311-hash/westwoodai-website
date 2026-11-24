interface SectionHeaderProps {
  title: string;
  count?: string;
  id?: string;
}

/** A section's h2 with an optional quiet count on the right. */
export default function SectionHeader({ title, count, id }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      {count && <span className="font-mono text-xs text-ink-muted">{count}</span>}
    </div>
  );
}
