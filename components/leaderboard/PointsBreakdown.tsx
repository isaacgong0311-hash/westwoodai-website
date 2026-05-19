const breakdown = [
  {
    category: "Meeting Attendance",
    emoji: "📅",
    points: 30,
    note: "per meeting attended",
    color: "text-[#6ee7ff]",
  },
  {
    category: "Project Submission",
    emoji: "🛠️",
    points: 150,
    note: "per completed project",
    color: "text-[#b69bff]",
  },
  {
    category: "Project Demo",
    emoji: "🎤",
    points: 75,
    note: "presenting at showcase",
    color: "text-[#b69bff]",
  },
  {
    category: "Competition Entry",
    emoji: "🏆",
    points: 100,
    note: "per competition entered",
    color: "text-orange-400",
  },
  {
    category: "Competition Placement",
    emoji: "🥇",
    points: 250,
    note: "top 3 finish",
    color: "text-yellow-400",
  },
  {
    category: "Prompt Challenge",
    emoji: "💡",
    points: 50,
    note: "per submission",
    color: "text-[#00ff88]",
  },
  {
    category: "Prompt Winner",
    emoji: "✨",
    points: 100,
    note: "most upvoted entry",
    color: "text-[#00ff88]",
  },
  {
    category: "Lesson Delivery",
    emoji: "🎓",
    points: 100,
    note: "presenting a lesson",
    color: "text-pink-400",
  },
];

export default function PointsBreakdown() {
  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1e1e2e]">
        <h2
          className="font-serif italic text-xl text-[#e8e8f0]"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          How points work
        </h2>
        <p className="font-mono text-xs text-[#55556a] mt-1">
          Earn points by showing up, building, and competing.
        </p>
      </div>
      <div className="divide-y divide-[#1e1e2e]">
        {breakdown.map(({ category, emoji, points, note, color }) => (
          <div
            key={category}
            className="px-5 py-3.5 flex items-center justify-between hover:bg-[#16161f] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{emoji}</span>
              <div>
                <p className="font-sans text-sm text-[#e8e8f0]">{category}</p>
                <p className="font-mono text-[10px] text-[#55556a]">{note}</p>
              </div>
            </div>
            <span className={`font-mono text-sm font-semibold ${color}`}>
              +{points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
