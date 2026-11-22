import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SlideList from "@/components/content/SlideList";
import ExternalLink from "@/components/ui/ExternalLink";
import { slides } from "@/lib/content";

export const metadata = {
  title: "Slides Archive — Westwood AI Club",
  description: "Meeting slides and Colab notebooks from every Westwood AI Club year since 2019–20.",
};

function slug(year: string) {
  return `year-${year.replace(/[^0-9]/g, "")}`;
}

export default function ArchivePage() {
  const years = slides.archive;

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="Previous years"
          title="Slides & code archive"
          description="Every lesson the club has taught since 2019, newest year first, plus the Google Colab notebooks and datasets used in hands-on demos."
        />

        <nav aria-label="Jump to a school year" className="mb-12">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {years.map((y) => (
              <li key={y.year}>
                <a href={`#${slug(y.year)}`} className="inline-block py-2 text-ink-muted underline underline-offset-4 decoration-rule hover:text-ink hover:decoration-ink">
                  {y.year}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {years.map((y) => (
          <section key={y.year} id={slug(y.year)} aria-labelledby={`${slug(y.year)}-h`} className="mb-14">
            <SectionHeader title={y.year} id={`${slug(y.year)}-h`} count={`${y.meetings.length} decks`} />
            <SlideList decks={y.meetings} year={y.year} />
            {y.code && (
              <div className="mt-6">
                <h3 className="text-sm uppercase tracking-wider text-ink-muted mb-2">Code and data</h3>
                <ul className="space-y-1">
                  {y.code.map((c) => (
                    <li key={c.url}>
                      <ExternalLink href={c.url} className="inline-block py-1 text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                        {c.title}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
