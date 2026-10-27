import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — Westwood AI Club",
  description: "How to join, what you need (nothing!), and why we use Python and Google Colab.",
};

export default function FaqPage() {
  return (
    <div className="px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          eyebrow="New here?"
          title="Frequently asked questions"
          description="Short answers to what people ask before their first meeting."
        />
        <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-peach-soft p-6">
              <p className="font-serif text-3xl italic leading-tight text-accent-warm">The short version:</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                Anyone can join, it&apos;s free, and you don&apos;t need to know how to code. Fill out the form and come to a meeting.
              </p>
              <Button href="https://forms.gle/m1a5LrzEBHhacpbg6" external className="mt-5 w-full">Join the club ↗</Button>
              <Link href="/playground" className="mt-4 block text-center text-sm font-bold text-accent-warm underline underline-offset-4 hover:text-ink">
                Or try the playground first →
              </Link>
            </div>
          </aside>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <section key={item.question} className="relative rounded-3xl border border-rule bg-white p-6 pl-16 shadow-[0_14px_34px_rgba(17,26,51,.05)] sm:p-7 sm:pl-20">
                <span aria-hidden="true" className="absolute left-5 top-6 font-mono text-sm font-bold text-accent/50 sm:left-7 sm:top-7">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
    </div>
  );
}
