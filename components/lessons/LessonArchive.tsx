"use client";

import { useDeferredValue, useState } from "react";
import { CodeList, LessonRow } from "@/components/lessons/LessonList";
import { TOPICS, topicsFor, type TopicId } from "@/lib/topics";
import type { Lesson, LessonYear } from "@/lib/types";
import { cn } from "@/lib/cn";

export const yearId = (year: string) => `year-${year.replace("–", "-")}`;

function matches(lesson: Lesson, query: string, topic: TopicId | null) {
  if (topic && !topicsFor(lesson.title).includes(topic)) return false;
  return query === "" || lesson.title.toLowerCase().includes(query);
}

/**
 * The archive, searchable. It renders the full list on the server, so with
 * JavaScript off every lesson is still there; the search box and topic
 * chips just narrow it down once the page is interactive.
 */
export default function LessonArchive({ years }: { years: LessonYear[] }) {
  const [rawQuery, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | null>(null);
  const query = useDeferredValue(rawQuery.trim().toLowerCase());
  const filtering = query !== "" || topic !== null;

  const filtered = years
    .map((y) => ({
      ...y,
      lessons: y.lessons.filter((l) => matches(l, query, topic)),
      code: y.code.filter((c) => matches(c, query, topic)),
    }))
    .filter((y) => y.lessons.length + y.code.length > 0);
  const resultCount = filtered.reduce((n, y) => n + y.lessons.length + y.code.length, 0);

  return (
    <section aria-labelledby="archive">
      <div className="mb-6 border-b-2 border-ink/10 pb-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <h2 id="archive" className="text-3xl font-black tracking-[-.045em] text-ink sm:text-4xl">Archive</h2>
          <nav aria-label="Jump to a school year" className="flex flex-wrap gap-2">
            {years.map((y) => (
              <a key={y.year} href={`#${yearId(y.year)}`} className="rounded-full border border-rule bg-white px-3 py-1 text-xs font-bold text-ink-muted hover:border-accent hover:text-accent">
                {y.year}
              </a>
            ))}
          </nav>
        </div>

        <label htmlFor="lesson-search" className="sr-only">Search lessons and notebooks</label>
        <div className="relative">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m13 13 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="lesson-search"
            type="search"
            value={rawQuery}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons and notebooks — try “neural”, “titanic”, or “ethics”"
            className="min-h-12 w-full rounded-full border border-rule bg-white pl-11 pr-5 text-sm text-ink shadow-[0_8px_20px_rgba(17,26,51,.04)] placeholder:text-ink-muted/80 focus:border-accent focus:outline-none"
          />
        </div>

        <div role="group" aria-label="Filter by topic" className="mt-4 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={topic === t.id}
              onClick={() => setTopic(topic === t.id ? null : t.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                topic === t.id ? "bg-night text-white" : "bg-blue-soft text-accent hover:bg-accent hover:text-white",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p aria-live="polite" className={cn("mt-4 text-sm text-ink-muted", !filtering && "sr-only")}>
          {filtering && (
            <>
              {resultCount} {resultCount === 1 ? "result" : "results"}
              {(query || topic) && (
                <button type="button" onClick={() => { setQuery(""); setTopic(null); }} className="ml-3 font-bold text-accent underline underline-offset-4">
                  Clear filters
                </button>
              )}
            </>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-rule bg-white p-10 text-center text-sm text-ink-muted">
          Nothing matches yet. Try a broader word, or ask in the Discord — someone has probably covered it.
        </p>
      ) : (
        <div className="space-y-6">
          {filtered.map((y) => (
            <section key={y.year} id={yearId(y.year)} aria-labelledby={`${yearId(y.year)}-title`} className="scroll-mt-28 rounded-[2rem] border border-rule bg-white p-6 shadow-[0_14px_34px_rgba(17,26,51,.05)] sm:p-8">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 id={`${yearId(y.year)}-title`} className="text-2xl font-black tracking-tight text-ink">{y.year}</h3>
                <span className="text-xs font-semibold text-ink-muted">
                  {y.lessons.length} {y.lessons.length === 1 ? "lesson" : "lessons"}
                  {y.code.length > 0 && ` · ${y.code.length} notebooks & datasets`}
                </span>
              </div>
              {y.lessons.length > 0 && (
                <ol className="md:columns-2 md:gap-10">
                  {y.lessons.map((l) => (
                    <LessonRow key={l.url + l.title} lesson={l} />
                  ))}
                </ol>
              )}
              <CodeList code={y.code} headingLevel="h4" />
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
