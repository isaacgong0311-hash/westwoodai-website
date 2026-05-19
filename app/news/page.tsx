import Badge from "@/components/ui/Badge";
import newsData from "@/data/news.json";
import type { NewsItem } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

const news = newsData as NewsItem[];

export const metadata = {
  title: "News — Westwood AI Club",
};

export default function NewsPage() {
  const featured = news.filter((n) => n.hot);
  const rest = news.filter((n) => !n.hot);
  const sorted = [...featured, ...rest];

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Officer Curated
          </p>
          <h1
            className="font-serif italic text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            News Digest
          </h1>
          <p className="font-sans text-[#8888aa] mt-2 text-sm max-w-xl">
            What&apos;s happening in AI — filtered for what actually matters, with
            officer takes.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {sorted.map((item, i) => (
            <div
              key={item.id}
              className={`bg-[#111118] border rounded-xl p-5 sm:p-6 card-glow ${
                item.hot
                  ? "border-orange-400/20"
                  : "border-[#1e1e2e]"
              }`}
            >
              {item.hot && (
                <div className="absolute-0 pointer-events-none" />
              )}

              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.hot && (
                    <Badge variant="hot">🔥 Hot</Badge>
                  )}
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#1e1e2e] text-[#55556a]">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[#55556a] hover:text-[#8888aa] transition-colors"
                  >
                    {item.source} ↗
                  </a>
                  <span className="font-mono text-[10px] text-[#55556a]">
                    {formatShortDate(item.date)}
                  </span>
                </div>
              </div>

              <h2
                className="font-serif italic text-xl sm:text-2xl text-[#e8e8f0] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                {item.title}
              </h2>

              <p className="font-sans text-sm text-[#8888aa] leading-relaxed mb-4">
                {item.summary}
              </p>

              <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] text-[#b69bff] uppercase tracking-wider">
                    Officer Take
                  </span>
                  <span className="font-mono text-[10px] text-[#55556a]">
                    — {item.officer}
                  </span>
                </div>
                <p className="font-sans text-sm text-[#e8e8f0] leading-relaxed italic">
                  &ldquo;{item.officerTake}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
