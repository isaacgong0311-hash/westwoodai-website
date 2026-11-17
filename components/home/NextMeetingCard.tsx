import type { SiteConfig } from "@/lib/types";
import { formatDate, daysUntil } from "@/lib/utils";
import Panel from "@/components/ui/Panel";

interface NextMeetingCardProps {
  config: SiteConfig["nextMeeting"];
}

export default function NextMeetingCard({ config }: NextMeetingCardProps) {
  const hasMeeting = config.date !== null;
  const days = hasMeeting ? daysUntil(config.date!) : null;

  return (
    <Panel raised className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs uppercase tracking-wider text-ink-muted">Up next</h2>
        {hasMeeting && days !== null && days >= 0 && (
          <span className="text-xs text-accent">
            {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days} days`}
          </span>
        )}
      </div>

      {hasMeeting ? (
        <div className="space-y-2">
          <p className="text-base text-ink leading-snug">{config.topic ?? "Topic TBD"}</p>
          <p className="text-sm text-ink-muted">
            <time dateTime={config.date!}>{formatDate(config.date!)}</time> &middot; {config.time}
          </p>
          <p className="text-sm text-ink-muted">
            Room {config.room} &middot; {config.teacher}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-base text-ink leading-snug">Schedule TBD</p>
          {config.note && (
            <p className="text-sm leading-relaxed text-ink-muted">{config.note}</p>
          )}
          <div className="pt-2 border-t border-rule">
            <p className="text-sm text-ink-muted">
              {config.time} &middot; Room {config.room}
            </p>
            <p className="text-sm text-ink-muted mt-0.5">{config.teacher}&rsquo;s room</p>
          </div>
        </div>
      )}
    </Panel>
  );
}
