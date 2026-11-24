interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  /** Plain facts shown under the description, e.g. "72 lessons". */
  stats?: { value: string; label: string }[];
}

/** The label + h1 + lede block every page opens with. */
export default function PageHeader({ eyebrow, title, description, centered = false, stats }: PageHeaderProps) {
  return (
    <header className={`mb-12 border-b border-rule pb-10 ${centered ? "text-center" : ""}`}>
      <p className="mb-4 font-mono text-xs text-ink-muted">{eyebrow}</p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {description && (
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted ${centered ? "mx-auto" : ""}`}>{description}</p>
      )}
      {stats && stats.length > 0 && (
        <dl className={`mt-8 flex flex-wrap gap-x-12 gap-y-4 ${centered ? "justify-center" : ""}`}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-sm text-ink-muted">{s.label}</dt>
              <dd className="text-3xl font-semibold tabular-nums tracking-tight text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
