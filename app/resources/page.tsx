import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import GoogleEmbed from "@/components/content/GoogleEmbed";
import ExternalLink from "@/components/ui/ExternalLink";
import { LINKS } from "@/lib/site";

export const metadata = {
  title: "Resources — Westwood AI Club",
  description: "AI tools, tutorials, and articles collected by the Westwood AI Club.",
};

export default function ResourcesPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          eyebrow="Cool links"
          title="Resources"
          description="A running list of AI tools, resources, and tutorials, split into technical and non-technical reads. It includes links from past meeting slides."
        />

        <GoogleEmbed
          src={`${LINKS.resourcesDoc}/preview`}
          href={`${LINKS.resourcesDoc}/edit`}
          title="AI tools and resources document"
          linkLabel="Open the AI tools and resources document in Google Docs"
          aspect="h-[70vh]"
        />

        <section aria-labelledby="more-heading" className="mt-14">
          <h2 id="more-heading" className="font-serif text-2xl font-normal text-ink border-b border-rule pb-3 mb-4">
            More places to learn
          </h2>
          <ul className="space-y-2 text-base">
            <li>
              <Link href="/meetings/archive" className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                Every past lesson&rsquo;s slides and Colab notebooks
              </Link>
            </li>
            <li>
              <ExternalLink href={LINKS.github} className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                Demo code on the club&rsquo;s GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={LINKS.codecademyPython} className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
                Codecademy&rsquo;s free Python 3 course
              </ExternalLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
