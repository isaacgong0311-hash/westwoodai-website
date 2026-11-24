import Link from "next/link";
import HeroArt from "@/components/home/HeroArt";

const WAYS = [
  {
    href: "/lessons",
    label: "Lessons",
    title: "Every meeting's slides since 2019",
    text: "Missed a meeting, or want to start from the beginning? Slides, Colab notebooks, and datasets, plus a six-step path for beginners.",
    tone: "bg-blue-soft",
  },
  {
    href: "/events",
    label: "Events",
    title: "Guest speakers and outreach",
    text: "People from Arctic Wolf, Dell, IBM, and startups have come to talk about how they use AI. Their slides and photos are posted too.",
    tone: "bg-peach-soft",
  },
  {
    href: "/projects",
    label: "Projects",
    title: "Build something of your own",
    text: "Pick a topic, send in your idea, and present it at a meeting. There's a list of topic ideas to start from.",
    tone: "bg-lilac-soft",
  },
];

export default function StartHere() {
  return (
    <section aria-labelledby="ways-in" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 id="ways-in" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Things to explore
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/playground" className="group flex items-center gap-5 rounded-lg border border-rule bg-white p-5">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs text-ink-muted">Playground</p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-ink group-hover:text-accent">Train a model in your browser</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Fit a line, cluster points, and train a neural network, with nothing to install. The picture is a real network
              trained when this page was built.
            </p>
          </div>
          <div className="hidden w-28 shrink-0 sm:block">
            <HeroArt compact />
          </div>
        </Link>
        {WAYS.map((w) => (
          <Link key={w.href} href={w.href} className={`group block rounded-lg border border-rule p-5 ${w.tone}`}>
            <p className="font-mono text-xs text-ink-muted">{w.label}</p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-ink group-hover:text-accent">{w.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink">{w.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
