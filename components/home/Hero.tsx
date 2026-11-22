import Image from "next/image";
import Button from "@/components/ui/Button";
import { LINKS } from "@/lib/site";

interface HeroProps {
  founded: number;
}

export default function Hero({ founded }: HeroProps) {
  return (
    <section className="px-4 sm:px-6 pt-16 pb-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-6 mb-7">
          <Image
            src="/logo.png"
            alt="Westwood AI Club logo: a blue and orange swirl around the letters WW AI"
            width={76}
            height={76}
            priority
            className="rounded-full flex-shrink-0"
          />
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-muted mb-2">
              Westwood High School &middot; Austin, TX
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl font-normal tracking-tight text-ink leading-[1.02]">
              Westwood AI Club
            </h1>
          </div>
        </div>

        <div className="border-t border-rule pt-6 flex flex-col sm:flex-row gap-8 sm:gap-16">
          <p className="text-sm text-ink-muted">
            Room E1307 &middot; Est. {founded}
          </p>
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-ink mb-4">
              The official site of Westwood High School&rsquo;s student-run AI
              club. We teach artificial intelligence and machine learning from
              the ground up, enter AI and data science competitions, and host
              guest speakers who work in the field.
            </p>
            <p className="text-base leading-relaxed text-ink mb-7">
              No coding experience required and no membership fees. Anyone
              can join at any point in the year.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href={LINKS.interestForm} external variant="primary">
                Fill out the club interest form
              </Button>
              <Button href={LINKS.discord} external variant="secondary">
                Join our Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
