import ExternalLink from "@/components/ui/ExternalLink";

interface GoogleEmbedProps {
  /** The /embed, /preview or /htmlembed URL to frame. */
  src: string;
  /** Normal link to the same file, shown under the frame as a text alternative. */
  href: string;
  /** Describes the frame for screen readers, e.g. "Meeting 5 slides: Computer vision". */
  title: string;
  linkLabel: string;
  aspect?: string;
}

/**
 * An embedded Google Slides/Docs/Sheets viewer with a plain link right
 * under it — embedded viewers are hard to use with a keyboard or screen
 * reader, so the direct link is always there as the accessible way in.
 */
export default function GoogleEmbed({ src, href, title, linkLabel, aspect = "aspect-[16/10]" }: GoogleEmbedProps) {
  return (
    <figure>
      <div className={`${aspect} w-full border border-rule bg-paper-raised`}>
        <iframe src={src} title={title} loading="lazy" allowFullScreen className="w-full h-full" />
      </div>
      <figcaption className="mt-3 text-sm">
        <ExternalLink
          href={href}
          className="text-ink-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
        >
          {linkLabel}
        </ExternalLink>
      </figcaption>
    </figure>
  );
}
