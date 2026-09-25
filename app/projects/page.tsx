import type { Metadata } from "next";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Tag from "@/components/ui/Tag";
import { projects } from "@/lib/content";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects — Westwood AI Club",
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
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="What members are building"
          title="Projects"
          description="Apps, models, and experiments members are building. Add yours once it's ready to share."
        />

        {projects.length === 0 ? (
          <EmptyState
            title="Nothing posted yet"
            description="Projects go up here as members share them. If you're working on something, post it in #show-and-tell and an officer will add it."
            cta={{
              label: "Open Discord",
              href: "https://discord.gg/7QctqCABR",
              external: true,
            }}
          />
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

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-rule">
              {shown.map((p) => (
                <article key={p.id} className="border-r border-b border-rule p-6 flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-xs uppercase tracking-wider text-ink-muted">{p.category}</p>
                    <Tag tone={p.status === "active" ? "accent" : "muted"}>{STATUS_LABELS[p.status]}</Tag>
                  </div>
                  <h2 className="font-serif text-2xl font-normal text-ink leading-tight mb-1">{p.title}</h2>
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
                        View project ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
