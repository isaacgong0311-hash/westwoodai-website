"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import promptData from "@/data/prompt.json";
import type { PromptChallenge, PromptEntry } from "@/lib/types";
import { formatShortDate, timeAgo } from "@/lib/utils";
import { difficultyColor } from "@/lib/utils";

const challenge = promptData.current as PromptChallenge;

export default function PromptPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("");
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(challenge.entries.map((e) => [e.id, e.votes]))
  );
  const [voted, setVoted] = useState<Set<string>>(new Set());

  const entries = [...challenge.entries].sort(
    (a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0)
  );

  function upvote(id: string) {
    if (voted.has(id)) return;
    setVotes((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }));
    setVoted((s) => new Set([...s, id]));
  }

  function handleSubmit() {
    if (!text.trim()) return;
    setSubmitted(true);
    setModalOpen(false);
    setText("");
  }

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest mb-2">
            Weekly Challenge
          </p>
          <h1
            className="font-serif italic text-4xl sm:text-5xl text-[#e8e8f0]"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Prompt of the Week
          </h1>
        </div>

        {/* Featured challenge card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_50%,rgba(182,155,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] live-dot" />
                <span className="font-mono text-[10px] text-[#55556a] uppercase tracking-widest">
                  Active Challenge
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="default"
                  className={difficultyColor(challenge.difficulty)}
                >
                  {challenge.difficulty}
                </Badge>
                <span className="font-mono text-[10px] text-[#55556a]">
                  Closes {formatShortDate(challenge.deadline)}
                </span>
              </div>
            </div>

            <h2
              className="font-serif italic text-2xl sm:text-3xl text-[#e8e8f0] mb-3"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              {challenge.title}
            </h2>
            <p className="font-sans text-sm text-[#8888aa] leading-relaxed mb-4">
              {challenge.description}
            </p>

            <div className="bg-[#0a0a0f] rounded-lg p-4 mb-5 border border-[#1e1e2e]">
              <p className="font-mono text-[10px] text-[#55556a] uppercase tracking-wide mb-2">
                Context from {challenge.postedBy}
              </p>
              <p className="font-sans text-sm text-[#8888aa] italic leading-relaxed">
                &ldquo;{challenge.context}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="font-mono text-xs text-[#55556a]">
                Posted {formatShortDate(challenge.postedDate)} ·{" "}
                {challenge.entries.length} entries
              </p>
              {submitted ? (
                <span className="font-mono text-xs text-[#00ff88] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                  Submitted!
                </span>
              ) : (
                <button
                  onClick={() => setModalOpen(true)}
                  className="font-mono text-sm px-5 py-2 rounded-lg bg-[#b69bff] text-[#0a0a0f] hover:bg-[#c9b0ff] transition-colors font-medium"
                >
                  Submit Entry
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Top entries */}
        <div>
          <h2
            className="font-serif italic text-2xl text-[#e8e8f0] mb-4"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Top Entries
          </h2>
          <div className="flex flex-col gap-4">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 card-glow"
              >
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] flex items-center justify-center font-mono text-xs text-[#55556a]">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <span className="font-mono text-xs text-[#b69bff]">
                          {entry.author}
                        </span>
                        <span className="font-mono text-[10px] text-[#55556a] ml-2">
                          {timeAgo(entry.submittedAt)}
                        </span>
                      </div>
                      <button
                        onClick={() => upvote(entry.id)}
                        className={`flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          voted.has(entry.id)
                            ? "border-[#b69bff]/30 bg-[#b69bff]/10 text-[#b69bff]"
                            : "border-[#2e2e45] text-[#8888aa] hover:border-[#b69bff]/30 hover:text-[#b69bff]"
                        }`}
                      >
                        ▲ {votes[entry.id]}
                      </button>
                    </div>
                    <pre className="font-mono text-xs text-[#e8e8f0] bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {entry.content}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Submit Your Entry"
      >
        <div className="flex flex-col gap-4">
          <p className="font-sans text-sm text-[#8888aa]">
            Write your system prompt or solution below. Markdown and code
            formatting are welcome.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="You are an expert in..."
            className="w-full font-mono text-xs bg-[#0a0a0f] border border-[#2e2e45] rounded-lg p-4 text-[#e8e8f0] placeholder-[#55556a] resize-none focus:outline-none focus:border-[#b69bff]/50 transition-colors"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="font-mono text-xs px-4 py-2 rounded-lg border border-[#2e2e45] text-[#8888aa] hover:text-[#e8e8f0] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="font-mono text-xs px-4 py-2 rounded-lg bg-[#b69bff] text-[#0a0a0f] hover:bg-[#c9b0ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
