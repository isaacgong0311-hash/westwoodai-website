import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import ExternalLink from "@/components/ui/ExternalLink";
import { faq } from "@/lib/content";
import { LINKS } from "@/lib/site";

export const metadata = {
  title: "FAQ — Westwood AI Club",
  description: "Common questions about joining the Westwood AI Club, what you need, and how meetings work.",
};

export default function FaqPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader eyebrow="Questions" title="Frequently asked questions" />

        <dl className="divide-y divide-rule border-t border-b border-rule">
          {faq.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-serif text-xl text-ink mb-2">{item.q}</dt>
              <dd className="text-base text-ink leading-relaxed">
                {item.a}
                {item.link && (
                  <>
                    {" "}
                    {item.link.external ? (
                      <ExternalLink href={item.link.href} className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                        {item.link.label}
                      </ExternalLink>
                    ) : (
                      <Link href={item.link.href} className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                        {item.link.label}
                      </Link>
                    )}
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-base text-ink mt-10">
          Question not answered here?{" "}
          <a href={`mailto:${LINKS.email}`} className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
            Email us at {LINKS.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
