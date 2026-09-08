import newsData from "@/data/news.json";
import type { NewsItem } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const news = newsData as NewsItem[];

export const metadata = {
  title: "News — Westwood AI Club",
};

export default function NewsPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="From the officers"
          title="News"
          description="Short write-ups from officers on AI news worth knowing about, and why it matters to the club."
        />

        {news.length === 0 ? (
          <EmptyState
            title="Nothing posted yet"
            description="The first posts go up in September."
          />
        ) : (
          <div>{/* news cards render here once news.json has entries */}</div>
        )}
      </div>
    </div>
  );
}
