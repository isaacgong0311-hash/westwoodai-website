import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ExternalLink from "@/components/ui/ExternalLink";
import { LINKS } from "@/lib/site";

export const metadata = {
  title: "Join Us — Westwood AI Club",
  description: "How to join the Westwood AI Club and stay updated: interest form, Discord, Instagram, GitHub, and email.",
};

const channels = [
  {
    name: "Discord",
    href: LINKS.discord,
    linkText: "Join the Westwood AI Club Discord server",
    body: "Get meeting and event reminders, chat with other members, and talk about meetings and projects.",
  },
  {
    name: "Instagram",
    href: LINKS.instagram,
    linkText: "Follow @warriorai on Instagram",
    body: "Meeting reminders and recaps. We follow back!",
  },
  {
    name: "GitHub",
    href: LINKS.github,
    linkText: "See the club's code on GitHub",
    body: "Demos and interactive coding activities from throughout the year.",
  },
];

export default function JoinPage() {
  return (
    <div className="px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          eyebrow="Join us"
          title="Join the club"
          description="Anyone at Westwood can join at any point in the year. There are no membership fees and no coding experience is required."
        />

        <section aria-labelledby="form-heading" className="border border-rule bg-paper-raised p-6 mb-12">
          <h2 id="form-heading" className="font-serif text-2xl font-normal text-ink mb-2">
            Step 1: Fill out the interest form
          </h2>
          <p className="text-base text-ink leading-relaxed mb-5 max-w-xl">
            This is the best way to stay updated. You&rsquo;ll be added to our mailing list and get reminders for
            meetings, guest speakers, competitions, and other opportunities. Filling it out makes you a member.
          </p>
          <Button href={LINKS.interestForm} external>
            Fill out the club interest form
          </Button>
        </section>

        <section aria-labelledby="channels-heading">
          <h2 id="channels-heading" className="font-serif text-2xl font-normal text-ink border-b border-rule pb-3 mb-2">
            Step 2: Stay in the loop
          </h2>
          <ul className="divide-y divide-rule">
            {channels.map((c) => (
              <li key={c.name} className="py-5">
                <h3 className="text-xs uppercase tracking-wider text-ink-muted mb-1">{c.name}</h3>
                <ExternalLink href={c.href} className="text-base text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                  {c.linkText}
                </ExternalLink>
                <p className="text-sm text-ink-muted mt-1">{c.body}</p>
              </li>
            ))}
            <li className="py-5">
              <h3 className="text-xs uppercase tracking-wider text-ink-muted mb-1">Email</h3>
              <a href={`mailto:${LINKS.email}`} className="text-base text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                Email us at {LINKS.email}
              </a>
              <p className="text-sm text-ink-muted mt-1">Questions, concerns, or suggestions about the club.</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
