import Link from "next/link";

const WAYS = [
  {
    href: "/lessons",
    label: "Lessons",
    title: "Every meeting's slides since 2019",
    text: "Missed a meeting, or want to start from the beginning? The archive has slides, Colab notebooks, and datasets, plus a six-step path for beginners.",
  },
  {
    href: "/playground",
    label: "Playground",
    title: "Train a model in your browser",
    text: "Three small labs: fit a line with gradient descent, cluster points with k-means, and train a neural network. Nothing to install.",
  },
  {
    href: "/events",
    label: "Events",
    title: "Guest speakers and outreach",
    text: "People from Arctic Wolf, Dell, IBM, and startups have come to talk about how they use AI. Their slides are posted too.",
  },
];

export default function StartHere() {
  return (
    <section aria-labelledby="ways-in" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 id="ways-in" className="sr-only">Where to start</h2>
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {WAYS.map((w) => (
          <Link key={w.href} href={w.href} className="group block border-t-2 border-ink pt-5">
            <p className="font-mono text-xs text-ink-muted">{w.label}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink group-hover:text-accent">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{w.text}</p>
            <span className="mt-4 inline-block text-sm text-accent group-hover:underline">Open {w.label.toLowerCase()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
