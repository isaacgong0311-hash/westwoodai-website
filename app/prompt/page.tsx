import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Panel from "@/components/ui/Panel";
import Tag from "@/components/ui/Tag";
import { promptChallenge as challenge } from "@/lib/content";
import { POINTS } from "@/lib/points";
import { daysUntil, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Prompt of the Week",
};

// The deadline countdown is computed at render time.
export const revalidate = 3600;

export default function PromptPage() {
  const days = challenge ? daysUntil(challenge.deadline) : null;
  const closed = days !== null && days < 0;
  const entries = challenge ? [...challenge.entries].sort((a, b) => b.votes - a.votes) : [];

  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="Prompt of the week"
          title="Prompt of the Week"
          description="Each week an officer posts a prompt challenge. Members submit their best attempt and vote on the results."
        />

        {challenge === null ? (
          <EmptyState
            title="Nothing posted yet"
            description="No prompt challenge is active right now. Join the club Discord to hear when the next one is posted."
            cta={{ label: "Join the Discord", href: "https://discord.gg/7QctqCABR", external: true }}
          />
        ) : (
          <>
            <article className="mb-12 rounded-lg border border-rule bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Tag tone={closed ? "muted" : "accent"}>
                  {closed
                    ? "Closed"
                    : days === 0
                      ? "Due today"
                      : days === 1
                        ? "Due tomorrow"
                        : `${days} days left`}
                </Tag>
                <Tag>{challenge.difficulty[0].toUpperCase() + challenge.difficulty.slice(1)}</Tag>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight mb-2">
                {challenge.title}
              </h2>
              <p className="text-sm text-ink-muted mb-6">
                Posted by {challenge.postedBy} &middot; due {formatDate(challenge.deadline)}
              </p>
              <p className="text-base leading-relaxed text-ink mb-6 whitespace-pre-line">{challenge.description}</p>
              {challenge.context && (
                <Panel raised className="p-5 mb-8">
                  <p className="font-mono text-xs text-ink-muted mb-2">The setup</p>
                  <p className="text-sm leading-relaxed text-ink whitespace-pre-line">{challenge.context}</p>
                </Panel>
              )}
              {!closed && (
                <div className="flex flex-wrap items-center gap-6">
                  <Button href="https://discord.gg/7QctqCABR" external variant="primary">
                    Submit in #prompt-of-the-week ↗
                  </Button>
                  <p className="text-sm text-ink-muted">Entries earn {POINTS.promptEntry} points; the top-voted one earns {POINTS.promptWinner}.</p>
                </div>
              )}
            </article>

            {entries.length > 0 && (
              <section>
                <h2 className="font-mono text-xs text-ink-muted border-b border-rule pb-3">
                  {closed ? "Results" : "Top entries so far"}
                </h2>
                <ol className="divide-y divide-rule">
                  {entries.map((entry, i) => (
                    <li key={entry.id} className="py-5 flex gap-4">
                      <span className="text-2xl text-ink-muted w-6 shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed text-ink whitespace-pre-line">{entry.content}</p>
                        <p className="text-xs text-ink-muted mt-2">
                          {entry.author} &middot; {entry.votes} {entry.votes === 1 ? "vote" : "votes"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
