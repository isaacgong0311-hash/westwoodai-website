import { POINTS_BREAKDOWN } from "@/lib/points";


export default function PointsBreakdown() {
  return (
    <div className="rounded-3xl border border-rule bg-white p-5 shadow-[0_16px_40px_rgba(17,26,51,.05)] sm:p-6">
      <h2 className="text-lg font-black tracking-tight text-ink border-b border-rule pb-4 mb-2">
        How points work
      </h2>
      <div className="divide-y divide-rule">
        {POINTS_BREAKDOWN.map(({ category, points, note }) => (
          <div key={category} className="py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-ink">{category}</p>
              <p className="text-xs text-ink-muted">{note}</p>
            </div>
            <span className="rounded-full bg-peach-soft px-3 py-1 text-xs font-black text-accent-warm tabular-nums">+{points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
