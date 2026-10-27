import FileLink from "@/components/ui/FileLink";
import type { Lesson } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

export function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <li className="flex break-inside-avoid items-baseline gap-4 border-b border-rule py-3">
      {lesson.number !== undefined && <span className="w-7 shrink-0 font-mono text-xs text-ink-muted">#{lesson.number}</span>}
      <div className="min-w-0">
        <FileLink href={lesson.url} format={lesson.format} className="flex-wrap">
          {lesson.title}
        </FileLink>
        {lesson.date && <p className="mt-0.5 font-mono text-[11px] text-ink-muted">{formatShortDate(lesson.date)}</p>}
      </div>
    </li>
  );
}

export function CodeList({ code, headingLevel }: { code: Lesson[]; headingLevel: "h3" | "h4" }) {
  if (code.length === 0) return null;
  const Heading = headingLevel;
  return (
    <div className="mt-6">
      <Heading className="mb-2 font-mono text-xs text-ink-muted">Notebooks and data</Heading>
      <ul className="grid gap-x-10 sm:grid-cols-2">
        {code.map((c) => (
          <li key={c.url + c.title} className="border-b border-dashed border-rule py-2.5 text-sm">
            <FileLink href={c.url} format={c.format} className="flex-wrap">
              {c.title}
            </FileLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
