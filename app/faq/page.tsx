import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How to join the Westwood AI Club, what you need to know beforehand (nothing), and why we use Python and Google Colab.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <PageHeader
        eyebrow="FAQ"
        title="Questions people ask before their first meeting"
        description="Short version: anyone at Westwood can join, it's free, and you don't need to know how to code."
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_16rem]">
        <dl className="border-t border-rule">
          {faq.map((item) => (
            <div key={item.question} className="border-b border-rule py-6">
              <dt className="text-lg font-semibold tracking-tight text-ink">{item.question}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                {item.answer}
                {item.link && (
                  <>
                    {" "}
                    <a
                      href={item.link.href}
                      {...(item.link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-accent hover:underline"
                    >
                      {item.link.label}
                    </a>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm leading-relaxed text-ink-muted">
            To join, fill out the{" "}
            <a href="https://forms.gle/m1a5LrzEBHhacpbg6" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">interest form</a>{" "}
            and come to the next meeting on the <Link href="/calendar" className="text-accent hover:underline">calendar</Link>. If you want a feel
            for what we cover first, try the <Link href="/playground" className="text-accent hover:underline">playground</Link>.
          </p>
        </aside>
      </div>
    </div>
  );
}
