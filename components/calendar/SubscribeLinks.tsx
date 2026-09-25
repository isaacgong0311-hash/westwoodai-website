interface SubscribeLinksProps {
  links: { google: string; ical: string };
}

/** "Subscribe once, stay synced" — both links add the whole club calendar, not a copy. */
export default function SubscribeLinks({ links }: SubscribeLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-rule py-4 mb-10">
      <p className="text-sm text-ink">Get every event on your phone:</p>
      <a
        href={links.google}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-accent hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink"
      >
        Add to Google Calendar ↗
      </a>
      <a
        href={links.ical}
        className="text-sm text-accent hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink"
      >
        Apple / Outlook
      </a>
    </div>
  );
}
