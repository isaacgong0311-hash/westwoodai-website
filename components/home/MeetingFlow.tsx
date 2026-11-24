import Link from "next/link";

// What a meeting is actually like, taken from this year's slides (Meetings 3
// to 5): announcements, a short lesson, then something hands-on.
const STEPS = [
  {
    title: "Catch up",
    text: "We start with what's coming up: competitions, guest speakers, and club events.",
    tone: "bg-blue-soft",
  },
  {
    title: "Learn one idea",
    text: "An officer teaches a short lesson, like how neural networks learn or how computers recognize images.",
    tone: "bg-peach-soft",
  },
  {
    title: "Try it yourself",
    text: "Then everyone gets hands-on: a Colab notebook, a demo like Teachable Machine, or a game of Hot and Cold that acts out reinforcement learning.",
    tone: "bg-lilac-soft",
  },
  {
    title: "Build your own",
    text: "Through the year, members work on their own projects and team up for competitions, then present them at meetings.",
    tone: "bg-blue-soft",
  },
];

export default function MeetingFlow() {
  return (
    <section aria-labelledby="meeting-flow" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 id="meeting-flow" className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        What happens at a meeting
      </h2>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Meetings run an hour after school. Come to any of them, even if you missed the last few. Every lesson&apos;s slides are on
        the <Link href="/lessons" className="link">Lessons page</Link>.
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className={`rounded-lg border border-rule p-5 ${s.tone}`}>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white font-mono text-sm font-medium text-ink">
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
