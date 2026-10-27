import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FileLink from "@/components/ui/FileLink";
import PageHeader from "@/components/ui/PageHeader";
import { lessonYears, resourcesDoc } from "@/lib/content";
import type { Lesson } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Lessons — Westwood AI Club",
  description: "Slides from every Westwood AI Club meeting since 2019, plus the Colab notebooks and datasets we coded along with.",
};

const yearId = (year: string) => `year-${year.replace("–", "-")}`;

function LessonRow({ lesson }: { lesson: Lesson }) {
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

function CodeList({ code, headingLevel }: { code: Lesson[]; headingLevel: "h3" | "h4" }) {
  const Heading = headingLevel;
  if (code.length === 0) return null;
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

export default function LessonsPage() {
  const [current, ...past] = lessonYears;
  const totalLessons = lessonYears.reduce((n, y) => n + y.lessons.length, 0);
  const totalCode = lessonYears.reduce((n, y) => n + y.code.length, 0);

  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="Missed a meeting? Start here"
          title="Lessons"
          description={`Slides from every meeting since 2019 — ${totalLessons} lessons and ${totalCode} notebooks and datasets. Everything opens in Google Drive or Colab, free, nothing to install.`}
        />

        <section aria-labelledby="current-year" className="mb-14 rounded-[2rem] border border-accent bg-blue-soft p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-accent">This school year</p>
              <h2 id="current-year" className="text-3xl font-black tracking-[-.045em] text-ink sm:text-4xl">{current.year}</h2>
            </div>
            <p className="max-w-xs text-sm text-ink-muted">Slides go up here and in the Discord after every meeting.</p>
          </div>
          <ol className="rounded-2xl bg-white px-5">
            {current.lessons.map((l) => (
              <LessonRow key={l.url} lesson={l} />
            ))}
          </ol>
          <CodeList code={current.code} headingLevel="h3" />
        </section>

        <section aria-labelledby="archive">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/10 pb-5">
            <h2 id="archive" className="text-3xl font-black tracking-[-.045em] text-ink sm:text-4xl">Archive</h2>
            <nav aria-label="Jump to a school year" className="flex flex-wrap gap-2">
              {past.map((y) => (
                <a key={y.year} href={`#${yearId(y.year)}`} className="rounded-full border border-rule bg-white px-3 py-1 text-xs font-bold text-ink-muted hover:border-accent hover:text-accent">
                  {y.year}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            {past.map((y) => (
              <section key={y.year} id={yearId(y.year)} aria-labelledby={`${yearId(y.year)}-title`} className="scroll-mt-28 rounded-[2rem] border border-rule bg-white p-6 shadow-[0_14px_34px_rgba(17,26,51,.05)] sm:p-8">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 id={`${yearId(y.year)}-title`} className="text-2xl font-black tracking-tight text-ink">{y.year}</h3>
                  <span className="text-xs font-semibold text-ink-muted">
                    {y.lessons.length} lessons{y.code.length > 0 && ` · ${y.code.length} notebooks & datasets`}
                  </span>
                </div>
                <ol className="md:columns-2 md:gap-10">
                  {y.lessons.map((l) => (
                    <LessonRow key={l.url + l.title} lesson={l} />
                  ))}
                </ol>
                <CodeList code={y.code} headingLevel="h4" />
              </section>
            ))}
          </div>
        </section>

        <section className="mt-14 flex flex-col items-start gap-5 rounded-[2rem] bg-night p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Want more to explore?</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#d5e1f7]">
              The officers keep a running list of AI tools, tutorials, and articles — technical and non-technical.
            </p>
          </div>
          <Button href={resourcesDoc} external className="!bg-[#f0ad82] !text-night !shadow-[0_7px_0_#a84d25] hover:!bg-white">
            Open the AI tools &amp; resources doc ↗
          </Button>
        </section>
      </div>
    </div>
  );
}
