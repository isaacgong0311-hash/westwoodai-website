import type { Metadata } from "next";
import Link from "next/link";
import LessonArchive from "@/components/lessons/LessonArchive";
import { CodeList, LessonRow } from "@/components/lessons/LessonList";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHeader from "@/components/ui/PageHeader";
import { learningPath, lessonYears, resourcesDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lessons",
  description: "Slides from every Westwood AI Club meeting since 2019, plus the Colab notebooks and datasets we coded along with.",
};

const linkClass = "text-accent hover:underline";

export default function LessonsPage() {
  const [current, ...past] = lessonYears;
  const totalLessons = lessonYears.reduce((n, y) => n + y.lessons.length, 0);
  const totalCode = lessonYears.reduce((n, y) => n + y.code.length, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <PageHeader
        eyebrow="Lessons"
        title="Every meeting, since 2019"
        description="Slides from each meeting, along with the Colab notebooks and datasets we worked through. Everything opens in Google Drive or Colab, so there's nothing to install."
        stats={[
          { value: String(totalLessons), label: "slide decks" },
          { value: String(totalCode), label: "notebooks and datasets" },
          { value: String(lessonYears.length), label: "school years" },
        ]}
      />

      <section aria-labelledby="start-here" className="mb-16">
        <SectionHeader id="start-here" title="New here? Start with these" count="picked by the officers" />
        <ol className="grid gap-x-10 border-t border-rule md:grid-cols-2">
          {learningPath.map((step, i) => (
            <li key={step.title} className="flex gap-5 border-b border-rule py-5">
              <span className="w-6 shrink-0 font-mono text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.blurb}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a href={step.lesson} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Slides<span className="sr-only"> for {step.title}</span>
                  </a>
                  {step.lab && (
                    <Link href={step.lab} className={linkClass}>
                      Playground lab<span className="sr-only"> for {step.title}</span>
                    </Link>
                  )}
                  {step.notebook && (
                    <a href={step.notebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Colab notebook<span className="sr-only"> for {step.title}</span>
                    </a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="current-year" className="mb-16">
        <SectionHeader id="current-year" title={`This year, ${current.year}`} count="posted after each meeting" />
        <ol className="border-t border-rule">
          {current.lessons.map((l) => (
            <LessonRow key={l.url} lesson={l} />
          ))}
        </ol>
        <CodeList code={current.code} headingLevel="h3" />
      </section>

      <LessonArchive years={past} />

      <aside className="mt-16 rounded-lg border border-rule bg-white p-6">
        <h2 className="font-semibold text-ink">More reading</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          The officers keep a Google Doc of AI tools, tutorials, and articles, split into technical and non-technical sections.{" "}
          <a href={resourcesDoc} target="_blank" rel="noopener noreferrer" className={linkClass}>Open the resources doc</a>
        </p>
      </aside>
    </div>
  );
}
