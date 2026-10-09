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
    <section id="speakers" className="px-4 sm:px-6 py-20 scroll-mt-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-accent">Ideas from beyond the classroom</p>
        <SectionHeader
          title="People who came to share."
          count={`${SPEAKERS.length} guest speakers since ${earliestYear}`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((s, i) => (
            <article key={s.name} className={`relative flex min-h-60 flex-col overflow-hidden rounded-[1.75rem] border p-6 sm:p-7 ${i === 0 ? "border-accent bg-blue-soft sm:col-span-2 lg:col-span-2" : "border-rule bg-paper"}`}>
              <div className="mb-8 flex items-start justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? "bg-accent text-white" : "bg-white text-accent"}`}>{s.year}</span>
                <span aria-hidden="true" className={`font-serif text-5xl leading-none ${i === 0 ? "text-accent/20" : "text-accent-warm/20"}`}>&ldquo;</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-ink">{s.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{s.title}, {s.org}</p>
              <p className="mt-auto pt-7 font-serif text-xl italic leading-tight text-accent-warm">{s.topic}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
