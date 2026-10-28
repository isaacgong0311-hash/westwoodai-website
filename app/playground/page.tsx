import type { Metadata } from "next";
import Link from "next/link";
import KMeansLab from "@/components/playground/KMeansLab";
import NeuralLab from "@/components/playground/NeuralLab";
import RegressionLab from "@/components/playground/RegressionLab";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Playground",
  description: "Fit a line, cluster points, and train a small neural network in your browser. Based on Westwood AI Club lessons.",
};

const LABS = [
  { href: "#fit-a-line", label: "Fit a line", note: "gradient descent" },
  { href: "#find-clusters", label: "Find clusters", note: "k-means" },
  { href: "#train-a-network", label: "Train a network", note: "backpropagation" },
];

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <PageHeader
        eyebrow="Playground"
        title="Machine learning you can poke at"
        description="Three ideas from our meetings, running in your browser. Click the plots, change the settings, and see what breaks. Nothing you do here is sent anywhere."
      />

      <nav aria-label="Labs" className="-mt-4 mb-14 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        {LABS.map((lab) => (
          <a key={lab.href} href={lab.href} className="text-accent hover:underline">
            {lab.label} <span className="text-ink-muted">({lab.note})</span>
          </a>
        ))}
      </nav>

      <noscript>
        <p className="mb-10 rounded-md border border-rule bg-white p-4 text-sm text-ink-muted">
          The labs need JavaScript to train. You can still read how each one works below.
        </p>
      </noscript>

      <div className="space-y-20">
        <RegressionLab />
        <KMeansLab />
        <NeuralLab />
      </div>

      <aside className="mt-20 rounded-lg border border-rule bg-white p-6">
        <h2 className="font-semibold text-ink">Want to see the code?</h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Each lab is a few dozen lines of TypeScript with no libraries. If you&apos;d rather work in Python, the{" "}
          <Link href="/lessons" className="text-accent hover:underline">lessons archive</Link> has Colab notebooks from past meetings covering
          linear regression, clustering, and neural networks built from scratch.
        </p>
      </aside>
    </div>
  );
}
