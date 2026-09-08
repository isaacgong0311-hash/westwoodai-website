const breakdown = [
  { category: "Meeting attendance", points: 30, note: "per meeting" },
  { category: "Project submission", points: 150, note: "per project" },
  { category: "Project demo", points: 75, note: "at a showcase" },
  { category: "Competition entry", points: 100, note: "per competition" },
  { category: "Competition placement", points: 250, note: "top 3 finish" },
  { category: "Prompt entry", points: 50, note: "per submission" },
  { category: "Prompt winner", points: 100, note: "most upvotes" },
  { category: "Lesson delivery", points: 100, note: "presenting" },
];

export default function PointsBreakdown() {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-wider text-ink-muted border-b border-rule pb-3 mb-2">
        How points work
      </h2>
      <div className="divide-y divide-rule">
        {breakdown.map(({ category, points, note }) => (
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
