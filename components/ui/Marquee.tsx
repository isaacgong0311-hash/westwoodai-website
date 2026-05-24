"use client";

const TAGS = [
  "Machine Learning",
  "Computer Vision",
  "NLP",
  "Hackathons",
  "Neural Networks",
  "Python",
  "PyTorch",
  "LLMs",
  "Reinforcement Learning",
  "Prompt Engineering",
  "Data Science",
  "Transformers",
  "AI Ethics",
  "Guest Speakers",
  "Club Projects",
  "Competitions",
  "Room E1307",
  "Austin TX",
  "TensorFlow",
  "Diffusion Models",
];

export default function Marquee() {
  const doubled = [...TAGS, ...TAGS];

  return (
    <div className="relative w-full overflow-hidden py-3 border-y border-[#1e1e2e] mb-2">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none" />

      <div className="flex gap-8 w-max animate-marquee">
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 font-mono text-[11px] text-[#3a3a55] uppercase tracking-widest whitespace-nowrap select-none"
          >
            <span className="w-1 h-1 rounded-full bg-[#2e2e45] flex-shrink-0" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
