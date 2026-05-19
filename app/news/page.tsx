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
            Officer Curated
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            News Digest
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Officers post short summaries of the AI news worth paying attention
            to, with a one-paragraph take on why it matters.
          </p>
        </div>

        {news.length === 0 ? (
          <EmptyState
            title="First digest coming soon"
            description="Officers post the weekly digest starting in September. Until then, nothing fake goes here — check the AI subreddit or HN in the meantime."
          />
        ) : (
          <div>{/* news cards render here */}</div>
        )}
      </div>
    </div>
  );
}
