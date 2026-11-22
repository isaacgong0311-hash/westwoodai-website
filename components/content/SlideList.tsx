import type { SlideDeck } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";
import ExternalLink from "@/components/ui/ExternalLink";

interface SlideListProps {
  decks: SlideDeck[];
  /** School year, used to make each link's accessible name unique, e.g. "(2025–26)". */
  year: string;
}

export default function SlideList({ decks, year }: SlideListProps) {
  return (
    <ul className="divide-y divide-rule border-b border-rule">
      {decks.map((deck) => (
        <li key={deck.url + deck.title} className="py-3 flex items-baseline gap-4">
          <span className="w-20 flex-shrink-0 text-sm text-ink-muted tabular-nums">
            {deck.number !== undefined ? `Meeting ${deck.number}` : ""}
          </span>
          <div className="flex-1 min-w-0">
            <ExternalLink
              href={deck.url}
              className="text-base text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {deck.title}
              <span className="sr-only">
                {" "}
                slides{deck.number !== undefined ? `, meeting ${deck.number}` : ""}, {year}
              </span>
            </ExternalLink>
          </div>
          {deck.date && (
            <time dateTime={deck.date} className="flex-shrink-0 text-sm text-ink-muted">
              {formatShortDate(deck.date)}
            </time>
          )}
        </li>
      ))}
    </ul>
  );
}
