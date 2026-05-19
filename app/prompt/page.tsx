import promptData from "@/data/prompt.json";
import type { PromptChallenge } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/ui/Reveal";

const challenge = (promptData.current as PromptChallenge | null) ?? null;

export const metadata = {
  title: "Prompt of the Week — Westwood AI Club",
};

export default function PromptPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
              Weekly thing
            </p>
            <h1
              className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              Prompt of the Week
            </h1>
            <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
              Officer posts a prompt challenge. Send in your best one, vote on
              everyone else&apos;s, rack up points.
            </p>
          </div>
        </Reveal>

        {challenge === null ? (
          <Reveal delay={0.1}>
            <EmptyState
              title="Nothing live yet"
              description="First prompt drops at the kickoff meeting. Page stays empty till then — no filler."
            />
          </Reveal>
        ) : (
          <div>{/* challenge renders here */}</div>
        )}
      </div>
    </div>
  );
}
