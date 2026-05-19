import newsData from "@/data/news.json";
import type { NewsItem } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";

const news = newsData as NewsItem[];

export const metadata = {
  title: "News — Westwood AI Club",
};

export default function NewsPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            From the officers
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            News
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Officers drop short takes on AI stuff worth knowing about — what
            happened and why we think it matters.
          </p>
        </div>

        {news.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="First posts go up in September. For now, r/MachineLearning and Hacker News will hold you over."
          />
        ) : (
          <div>{/* news cards render here */}</div>
        )}
      </div>
    </div>
  );
}
