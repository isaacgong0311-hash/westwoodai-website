import SectionHeader from "@/components/ui/SectionHeader";

const SPEAKERS = [
  {
    name: "Bryan Mishkin",
    title: "CTO",
    org: "MIT Sloan Management",
    topic: "AI as a Partner",
    year: "2026",
  },
  {
    name: "Dr. Dean Teffer",
    title: "VP of AI",
    org: "Arctic Wolf",
    topic: "AI in Cybersecurity",
    year: "2026",
  },
  {
    name: "Keith Moore",
    title: "CEO",
    org: "AutoScheduler.AI",
    topic: "Life, Supply Chain & AI",
    year: "2025",
  },
  {
    name: "Myra D'Souza",
    title: "Co-founder & CEO",
    org: "Autyn",
    topic: "AI in Mortgage Processing",
    year: "2025",
  },
  {
    name: "Dr. C. J. Paul",
    title: "Global CTO Office",
    org: "Kyndryl / IBM",
    topic: "Real-time AI at Scale",
    year: "2025",
  },
  {
    name: "Anshul Moondra",
    title: "ML Engineer",
    org: "Independent",
    topic: "ML in Baseball Analytics",
    year: "2025",
  },
  {
    name: "Sarah Griffin",
    title: "SWE",
    org: "Dell",
    topic: "The Future of AI",
    year: "2023",
  },
];

const earliestYear = Math.min(...SPEAKERS.map((s) => Number(s.year)));

export default function GuestSpeakers() {
  return (
    <section id="speakers" className="px-4 sm:px-6 pb-14 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Guest speakers"
          count={`${SPEAKERS.length} since ${earliestYear}`}
        />
        <ul>
          {SPEAKERS.map((s) => (
            <li key={s.name} className="flex gap-6 py-4 border-b border-rule last:border-b-0 items-baseline">
              <span className="w-12 flex-shrink-0 text-sm text-ink-muted">{s.year}</span>
              <div>
                <h3 className="text-base text-ink">{s.name}</h3>
                <p className="text-sm text-ink-muted mt-0.5">
                  {s.title}, {s.org}
                </p>
                <p className="font-serif text-lg italic text-ink mt-1">
                  &ldquo;{s.topic}&rdquo;
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
