import type { Metadata } from "next";
import Link from "next/link";
import LessonArchive from "@/components/lessons/LessonArchive";
import { CodeList, LessonRow } from "@/components/lessons/LessonList";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { learningPath, lessonYears, resourcesDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lessons — Westwood AI Club",
  description: "Slides from every Westwood AI Club meeting since 2019, plus the Colab notebooks and datasets we coded along with.",
};

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
          description="Slides from every meeting since 2019, plus the notebooks and datasets we coded along with. Everything opens in Google Drive or Colab — free, nothing to install."
          stats={[
            { value: String(totalLessons), label: "Lessons" },
            { value: String(totalCode), label: "Notebooks & datasets" },
            { value: String(lessonYears.length), label: "School years" },
          ]}
        />

        <section aria-labelledby="start-here" className="mb-14">
          <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-accent-warm">New to AI?</p>
          <h2 id="start-here" className="mb-2 text-3xl font-black tracking-[-.045em] text-ink sm:text-4xl">
            Start here, in <span className="font-serif font-normal italic text-accent-warm">six steps.</span>
          </h2>
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-ink-muted">
            The officers&apos; pick of the best decks, in order. Where there&apos;s a playground lab, try it right after the slides.
          </p>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {learningPath.map((step, i) => (
              <li key={step.title} className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-rule bg-white p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(17,26,51,.08)]">
                <span aria-hidden="true" className="absolute -right-3 -top-6 font-serif text-[7rem] italic leading-none text-accent/[.07]">{i + 1}</span>
                <p className="relative text-[11px] font-black uppercase tracking-[.18em] text-accent">Step {i + 1}</p>
                <h3 className="relative mt-2 text-xl font-black tracking-tight text-ink">{step.title}</h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{step.blurb}</p>
                <div className="relative mt-5 flex flex-wrap gap-2 text-xs font-bold">
                  <a href={step.lesson} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-3 py-1.5 text-white hover:bg-night">
                    Slides<span className="sr-only">: {step.title}</span> ↗
                  </a>
                  {step.lab && (
                    <Link href={step.lab} className="rounded-full bg-peach-soft px-3 py-1.5 text-accent-warm hover:bg-accent-warm hover:text-white">
                      Try the lab<span className="sr-only">: {step.title}</span> →
                    </Link>
                  )}
                  {step.notebook && (
                    <a href={step.notebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-lilac-soft px-3 py-1.5 text-[#60479a] hover:bg-[#60479a] hover:text-white">
                      Colab notebook<span className="sr-only">: {step.title}</span> ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

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

        <LessonArchive years={past} />

        <section className="mt-14 flex flex-col items-start gap-5 rounded-[2rem] bg-night p-8 text-white poster-grid sm:flex-row sm:items-center sm:justify-between">
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
