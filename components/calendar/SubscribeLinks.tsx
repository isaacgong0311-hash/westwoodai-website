import NewTabNote from "@/components/ui/NewTabNote";

interface SubscribeLinksProps {
  links: { google: string; ical: string };
}

/** "Subscribe once, stay synced" — both links add the whole club calendar, not a copy. */
export default function SubscribeLinks({ links }: SubscribeLinksProps) {
  return (
    <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-rule py-4 text-sm">
      <p className="mr-auto text-ink">Subscribe to get every club event in your own calendar.</p>
      <a href={links.google} target="_blank" rel="noopener noreferrer" className="link">
        Google Calendar
        <NewTabNote />
      </a>
      <a href={links.ical} className="link">
        Apple or Outlook
      </a>
    </div>
  );
}
