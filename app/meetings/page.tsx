import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeader from "@/components/ui/SectionHeader";
import SlideList from "@/components/content/SlideList";
import ExternalLink from "@/components/ui/ExternalLink";
import GoogleEmbed from "@/components/content/GoogleEmbed";
import { LINKS } from "@/lib/site";
import { embedUrl, slides } from "@/lib/content";

export const metadata = {
  title: "Meeting Slides — Westwood AI Club",
  description: "Slides from every Westwood AI Club meeting this school year.",
};

export default function MeetingsPage() {
  const { year, meetings } = slides.current;
  const latest = meetings[meetings.length - 1];

  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow={`${year} school year`}
          title="Meeting slides"
          description="Missed a meeting? Every slideshow from this year goes up here (and in the Discord server) after the meeting, so you can catch up."
        />

        {latest && (
          <section aria-labelledby="latest-heading" className="mb-14">
            <SectionHeader title="Latest meeting" id="latest-heading" />
            <h3 className="text-base text-ink mt-4 mb-4">
              Meeting {latest.number}: {latest.title}
            </h3>
            <GoogleEmbed
              src={embedUrl(latest.url)}
              href={latest.url}
              title={`Meeting ${latest.number} slides: ${latest.title}`}
              linkLabel={`Open the Meeting ${latest.number} slides in Google Slides`}
            />
          </section>
        )}

        <section aria-labelledby="year-heading" className="mb-10">
          <SectionHeader title={`All ${year} meetings`} id="year-heading" count={`${meetings.length} so far`} />
          <SlideList decks={[...meetings].reverse()} year={year} />
        </section>

        <p className="text-base text-ink leading-relaxed">
          Looking for an older lesson?{" "}
          <Link href="/meetings/archive" className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
            Browse slides and code from every year since 2019
          </Link>
          . You can also find demo code on{" "}
          <ExternalLink href={LINKS.github} className="underline underline-offset-4 decoration-ink-muted hover:decoration-ink">
            the club&rsquo;s GitHub
          </ExternalLink>
          .
        </p>
      </div>
    </div>
  );
}
