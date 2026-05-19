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
    <div className="border border-[#1e1e2e] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1e1e2e]">
        <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
          How points work
        </p>
      </div>
      <div className="divide-y divide-[#1e1e2e]">
        {breakdown.map(({ category, points, note }) => (
          <div
            key={category}
            className="px-5 py-3 flex items-center justify-between"
          >
            <div>
              <p className="font-sans text-sm text-[#e8e8f0]">{category}</p>
              <p className="font-mono text-[10px] text-[#55556a]">{note}</p>
            </div>
            <span className="font-mono text-sm text-[#8888aa]">+{points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
