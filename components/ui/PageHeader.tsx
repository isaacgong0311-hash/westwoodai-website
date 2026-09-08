interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

/**
 * The eyebrow + h1 + lede block every page opens with. Replaces seven
 * copies of the same three-part markup (leaderboard, projects, prompt,
 * competitions, meetings, news, 404) that had quietly drifted apart —
 * different max-widths, some wrapped in a fade-in and some not.
 */
export default function PageHeader({ eyebrow, title, description, centered = false }: PageHeaderProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <p className="text-xs uppercase tracking-wider text-ink-muted mb-2">
        {eyebrow}
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink mb-4">
        {title}
      </h1>
      {description && (
        <p className={`text-base leading-relaxed text-ink ${centered ? "mx-auto" : ""} max-w-xl`}>
          {description}
        </p>
      )}
    </div>
  );
}
