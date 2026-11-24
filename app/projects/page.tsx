import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import PageHeader from "@/components/ui/PageHeader";
import Tag from "@/components/ui/Tag";
import { projects, studentProjects } from "@/lib/content";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/utils";
import NewTabNote from "@/components/ui/NewTabNote";

export const metadata: Metadata = {
  title: "Projects",
};

const STATUS_LABELS = { active: "In progress", completed: "Completed", demo: "Demo" } as const;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  // Only offer filters for categories that actually have projects.
  const categories = [...new Set(projects.map((p) => p.category))].sort();
  const active = typeof category === "string" && categories.includes(category as never) ? category : null;
  const shown = projects
    .filter((p) => !active || p.category === active)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="What members are building"
          title="Projects"
          description="Every member can do a project during the year: build an AI model, or research an AI concept and explain it. Projects are presented at meetings and posted here."
        />

        <section aria-labelledby="how-title" className="mb-16">
          <SectionHeader id="how-title" title="How student projects work" />
          <ol className="grid gap-x-8 border-t border-rule sm:grid-cols-2">
            {studentProjects.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 border-b border-rule py-5">
                <span className="font-mono text-xs leading-6 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={studentProjects.ideasForm} external>
              Submit a project idea
            </Button>
            <a href="mailto:wwhs.aiexploration@gmail.com" className="text-sm link">
              Email a question about your project
            </a>
          </div>
        </section>

        <section aria-labelledby="topics-title" className="mb-16">
          <SectionHeader id="topics-title" title="Topic ideas" count="from the officers" />
          <ul className="flex flex-wrap gap-2">
            {studentProjects.topics.map((t) => (
              <li key={t} className="rounded-md border border-rule bg-white px-3 py-1.5 text-sm text-ink">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="posted-title">
          <SectionHeader id="posted-title" title="Member projects" count={projects.length > 0 ? `${projects.length} posted` : undefined} />
          {projects.length === 0 ? (
            <p className="border-y border-rule py-6 text-sm leading-relaxed text-ink-muted">
              None posted yet this year. Finished projects go up here after they&rsquo;re presented at a meeting.
            </p>
          ) : (
            <>
              {categories.length > 1 && (
                <nav aria-label="Filter by category" className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8 text-sm">
                  <span className="text-ink-muted mr-1">Show:</span>
                  {[null, ...categories].map((c, i) => (
                    <span key={c ?? "all"} className="flex items-center gap-2">
                      {i > 0 && <span className="text-ink-muted">&middot;</span>}
                      <Link
                        href={c ? `/projects?category=${encodeURIComponent(c)}` : "/projects"}
                        scroll={false}
                        aria-current={c === active ? "page" : undefined}
                        className={cn(
                          c === active ? "text-accent font-medium border-b border-accent" : "text-ink-muted hover:text-ink",
                        )}
                      >
                        {c ?? "All"}
                      </Link>
                    </span>
                  ))}
                </nav>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {shown.map((p) => (
                  <article key={p.id} className="flex flex-col rounded-lg border border-rule bg-white p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="font-mono text-xs text-ink-muted">{p.category}</p>
                      <Tag tone={p.status === "active" ? "accent" : "muted"}>{STATUS_LABELS[p.status]}</Tag>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink leading-tight mb-1">{p.title}</h3>
                    <p className="text-sm text-ink-muted mb-3">
                      {p.author} &middot; {formatShortDate(p.date)}
                    </p>
                    <p className="text-sm leading-relaxed text-ink mb-4 flex-1">{p.description}</p>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-ink-muted">{p.tags.join(" · ")}</p>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:text-ink"
                        >
                          View project
                          <NewTabNote />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
