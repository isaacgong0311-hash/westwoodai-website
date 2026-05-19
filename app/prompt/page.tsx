import promptData from "@/data/prompt.json";
import type { PromptChallenge } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";

const challenge = (promptData.current as PromptChallenge | null) ?? null;

export const metadata = {
  title: "Prompt of the Week — Westwood AI Club",
};

export default function PromptPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Weekly Challenge
          </p>
          <h1
            className="font-serif text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Prompt of the Week
          </h1>
          <p className="font-sans text-[#8888aa] mt-3 text-sm max-w-xl leading-relaxed">
            Each week, an officer drops a prompt-engineering challenge. Submit
            your best, vote on others, earn points.
          </p>
        </div>

        {challenge === null ? (
          <EmptyState
            title="No active challenge"
            description="The first Prompt of the Week launches at our kickoff meeting in August. Until then, the page sits empty by design — no fake content."
          />
        ) : (
          <div>{/* challenge renders here */}</div>
        )}
      </div>
    </div>
  );
}
