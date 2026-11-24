import Button from "@/components/ui/Button";
import { LINKS } from "@/lib/site";

/** The closing call to action, signed the way the club signs its emails. */
export default function SeeYouThere() {
  return (
    <section aria-labelledby="see-you" className="bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div>
          <h2 id="see-you" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            See you at the next meeting!
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/80">
            Fill out the interest form to get meeting reminders by email, or just show up to Room E1307 after school. Questions?
            Email us at{" "}
            <a href="mailto:wwhs.aiexploration@gmail.com" className="font-medium text-white underline underline-offset-4">
              wwhs.aiexploration@gmail.com
            </a>
            .
          </p>
          <p className="mt-6 text-sm text-white/80">Your Westwood AI Club Officers</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button href={LINKS.interestForm} external className="!bg-white !text-ink hover:!bg-peach-soft">
            Join the club
          </Button>
          <Button href={LINKS.discord} external className="border border-white/40 !bg-transparent hover:!bg-white/10">
            Discord
          </Button>
          <Button href={LINKS.instagram} external className="border border-white/40 !bg-transparent hover:!bg-white/10">
            Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}
