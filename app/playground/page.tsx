import type { Metadata } from "next";
import Link from "next/link";
import KMeansLab from "@/components/playground/KMeansLab";
import NeuralLab from "@/components/playground/NeuralLab";
import RegressionLab from "@/components/playground/RegressionLab";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Playground — Westwood AI Club",
  description: "Train a line, a clustering algorithm, and a neural network right in your browser. No account, no install, no code required.",
};

const LABS = [
  { href: "#fit-a-line", index: "01", label: "Fit a line", note: "Gradient descent" },
  { href: "#find-clusters", index: "02", label: "Find clusters", note: "k-means" },
  { href: "#train-a-network", index: "03", label: "Train a network", note: "Backpropagation" },
];

export default function PlaygroundPage() {
  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          eyebrow="Learn it by poking it"
          title="Playground"
          description="Three machine learning ideas from our meetings, running live in your browser. Click, break things, try again — nothing you do here leaves your device."
        />

        <nav aria-label="Labs" className="mb-10 grid gap-3 sm:grid-cols-3">
          {LABS.map((lab) => (
            <a key={lab.href} href={lab.href} className="group flex items-center gap-4 rounded-2xl border border-rule bg-white p-4 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-accent">
              <span className="font-mono text-2xl font-bold text-accent/40 group-hover:text-accent">{lab.index}</span>
              <span>
                <span className="block font-black text-ink">{lab.label}</span>
                <span className="block text-xs text-ink-muted">{lab.note}</span>
              </span>
            </a>
          ))}
        </nav>

        <noscript>
          <p className="mb-8 rounded-2xl bg-peach-soft p-4 text-sm font-semibold text-accent-warm">
            The labs need JavaScript to train. You can still read how each one works below.
          </p>
        </noscript>

        <div className="space-y-10">
          <RegressionLab />
          <KMeansLab />
          <NeuralLab />
        </div>

        <section className="mt-14 rounded-[2rem] bg-night p-8 text-white poster-grid sm:p-10">
          <h2 className="text-3xl font-black tracking-[-.045em]">Ready for the real code?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d5e1f7]">
            Every lab here is a few dozen lines of math. The Lessons archive has the Colab notebooks we wrote at meetings — linear
            regression, k-means-style clustering, and neural networks from scratch — so you can run and change the Python yourself.
          </p>
          <Link href="/lessons" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#f0ad82] px-6 text-sm font-bold text-night shadow-[0_7px_0_#a84d25] transition-transform hover:-translate-y-0.5">
            Browse lessons &amp; notebooks →
          </Link>
        </section>
      </div>
    </div>
  );
}
