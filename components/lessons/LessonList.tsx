import FileLink from "@/components/ui/FileLink";
import type { Lesson } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

export function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <li className="flex break-inside-avoid gap-4 border-b border-rule py-4 last:border-b-0">
      {lesson.number && (
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-paper text-xs font-black text-ink-muted"
        >
          {lesson.number}
        </span>
      )}
      <div className="min-w-0">
        <FileLink href={lesson.url} format={lesson.format} className="flex-wrap">
          {lesson.number ? `Meeting ${lesson.number}: ${lesson.title}` : lesson.title}
        </FileLink>
        {lesson.date && <p className="mt-1 text-xs text-ink-muted">{formatShortDate(lesson.date)}</p>}
      </div>
    </li>
  );
}

export function CodeList({ code, headingLevel }: { code: Lesson[]; headingLevel: "h3" | "h4" }) {
  if (code.length === 0) return null;
  const Heading = headingLevel;
  return (
    <div className="mt-6 rounded-2xl bg-peach-soft p-5">
      <Heading className="mb-3 text-xs font-black uppercase tracking-[.18em] text-accent-warm">Code &amp; data</Heading>
      <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {code.map((c) => (
          <li key={c.url + c.title}>
            <FileLink href={c.url} format={c.format} className="flex-wrap text-sm">
              {c.title}
            </FileLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
