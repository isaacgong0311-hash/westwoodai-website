import promptData from "@/data/prompt.json";
import type { PromptChallenge } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const challenge = (promptData.current as PromptChallenge | null) ?? null;

export const metadata = {
  title: "Prompt of the Week — Westwood AI Club",
};

export default function PromptPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="Prompt of the week"
          title="Prompt of the Week"
          description="Each week an officer posts a prompt challenge. Members submit their best attempt and vote on the results."
        />

        {challenge === null ? (
          <EmptyState
            title="Nothing posted yet"
            description="The first prompt goes up at the kickoff meeting."
          />
        ) : (
          <div>{/* challenge renders here once prompt.json has a current entry */}</div>
        )}
      </div>
    </div>
  );
}
