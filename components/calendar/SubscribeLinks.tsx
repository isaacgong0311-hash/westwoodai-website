interface SubscribeLinksProps {
  links: { google: string; ical: string };
}

/** "Subscribe once, stay synced" — both links add the whole club calendar, not a copy. */
export default function SubscribeLinks({ links }: SubscribeLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-rule bg-blue-soft p-5 mb-10">
      <p className="mr-auto text-sm font-bold text-ink">Get every event on your phone</p>
      <a
        href={links.google}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-white px-4 py-2 text-xs font-bold text-accent hover:text-ink"
      >
        Add to Google Calendar ↗
      </a>
      <a
        href={links.ical}
        className="rounded-full bg-white px-4 py-2 text-xs font-bold text-accent hover:text-ink"
      >
        Apple / Outlook
      </a>
    </div>
  );
}
