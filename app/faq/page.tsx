import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — Westwood AI Club",
  description: "How to join, what you need (nothing!), and why we use Python and Google Colab.",
};

export default function FaqPage() {
  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="New here?"
          title="Frequently asked questions"
          description="Short answers to what people ask before their first meeting."
        />
        <div className="space-y-4">
          {faq.map((item) => (
            <section key={item.question} className="rounded-3xl border border-rule bg-white p-6 shadow-[0_14px_34px_rgba(17,26,51,.05)] sm:p-7">
              <h2 className="text-xl font-black tracking-tight text-ink">{item.question}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  {...(item.link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="mt-4 inline-block text-sm font-bold text-accent underline decoration-accent/30 underline-offset-4 hover:text-ink"
                >
                  {item.link.label}{item.link.href.startsWith("http") && " ↗"}
                </a>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
