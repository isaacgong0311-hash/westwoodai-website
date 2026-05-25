"use client";

// Real things from the club's history — not generic AI buzzwords
const TAGS = [
  "MIT Sloan Management",
  "Arctic Wolf",
  "AutoScheduler.AI",
  "Spicewood STEAM Day",
  "Google Colab",
  "PyTorch",
  "HERStory Makers",
  "Kyndryl & IBM",
  "Baseball Analytics",
  "Room E1307",
  "Est. 2019",
  "Mr. Kluge",
  "Warriors AI",
  "Austin TX",
  "Python",
  "No Membership Fees",
  "Open to Everyone",
];

export default function Marquee() {
  const doubled = [...TAGS, ...TAGS];
  return (
    <div className="relative w-full overflow-hidden py-2.5 border-y border-[#1e1e2e] mb-2">
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />
      <div className="flex gap-7 w-max animate-marquee">
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-2 font-mono text-[10px] text-[#3a3a55] uppercase tracking-widest whitespace-nowrap select-none"
          >
            <span className="w-1 h-1 rounded-full bg-[#2e2e45] flex-shrink-0" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
