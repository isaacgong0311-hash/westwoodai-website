import type { Metadata } from "next";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Tag from "@/components/ui/Tag";
import { news } from "@/lib/content";
import { formatShortDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
};

export default function NewsPage() {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="From the officers"
          title="News"
          description="Short write-ups from officers on AI news worth knowing about, and why it matters to the club."
        />

        {news.length === 0 ? (
          <EmptyState
            title="Nothing posted yet"
            description="There are no officer-written news notes yet. Check back for stories the club chooses to discuss."
            cta={{ label: "Follow club updates", href: "https://www.instagram.com/warriorai/", external: true }}
          />
        ) : (
          <div className="space-y-4">
            {sorted.map((item) => (
              <article key={item.id} className="rounded-lg border border-rule bg-white p-6 sm:p-8">
                <div className="font-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted mb-2">
                  <span>{formatShortDate(item.date)}</span>
                  <span>&middot;</span>
                  <span>{item.category}</span>
                  {item.hot && <Tag tone="accent">Hot</Tag>}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink leading-tight mb-1">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    {item.title}
                  </a>
                </h2>
                <p className="text-sm text-ink-muted mb-4">{item.source} ↗</p>
                <p className="text-sm leading-relaxed text-ink mb-5">{item.summary}</p>
                <blockquote className="border-l-2 border-accent pl-4">
                  <p className="text-lg leading-snug text-ink">{item.officerTake}</p>
                  <footer className="text-xs text-ink-muted mt-2">&mdash; {item.officer}</footer>
                </blockquote>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
