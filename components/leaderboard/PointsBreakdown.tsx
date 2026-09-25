import { POINTS_BREAKDOWN } from "@/lib/points";


export default function PointsBreakdown() {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-wider text-ink-muted border-b border-rule pb-3 mb-2">
        How points work
      </h2>
      <div className="divide-y divide-rule">
        {POINTS_BREAKDOWN.map(({ category, points, note }) => (
          <div key={category} className="py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-ink">{category}</p>
              <p className="text-xs text-ink-muted">{note}</p>
            </div>
            <span className="text-sm text-ink-muted tabular-nums">+{points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
