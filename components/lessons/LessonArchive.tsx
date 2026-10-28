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
 * buttons narrow it down once the page is interactive.
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
      <div className="mb-10">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="archive" className="text-2xl font-semibold tracking-tight text-ink">Past years</h2>
          <nav aria-label="Jump to a school year" className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
            {years.map((y) => (
              <a key={y.year} href={`#${yearId(y.year)}`} className="text-ink-muted hover:text-accent">
                {y.year}
              </a>
            ))}
          </nav>
        </div>

        <label htmlFor="lesson-search" className="sr-only">Search lessons and notebooks</label>
        <input
          id="lesson-search"
          type="search"
          value={rawQuery}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, like neural, titanic, or ethics"
          className="h-11 w-full rounded-md border border-rule bg-white px-4 text-sm text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
        />

        <div role="group" aria-label="Filter by topic" className="mt-3 flex flex-wrap gap-1.5">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={topic === t.id}
              onClick={() => setTopic(topic === t.id ? null : t.id)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs transition-colors",
                topic === t.id ? "border-ink bg-ink text-white" : "border-rule bg-white text-ink-muted hover:border-ink hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p aria-live="polite" className={cn("mt-3 text-sm text-ink-muted", !filtering && "sr-only")}>
          {filtering && (
            <>
              {resultCount} {resultCount === 1 ? "match" : "matches"}.{" "}
              <button type="button" onClick={() => { setQuery(""); setTopic(null); }} className="text-accent underline underline-offset-4">
                Clear
              </button>
            </>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-rule bg-white p-8 text-center text-sm text-ink-muted">
          Nothing matches that. Try a shorter word, or ask in the Discord.
        </p>
      ) : (
        <div className="space-y-12">
          {filtered.map((y) => (
            <section key={y.year} id={yearId(y.year)} aria-labelledby={`${yearId(y.year)}-title`} className="scroll-mt-24">
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-2">
                <h3 id={`${yearId(y.year)}-title`} className="text-lg font-semibold text-ink">{y.year}</h3>
                <span className="font-mono text-xs text-ink-muted">
                  {y.lessons.length} {y.lessons.length === 1 ? "lesson" : "lessons"}
                  {y.code.length > 0 && `, ${y.code.length} notebooks and datasets`}
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
