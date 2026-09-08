import Image from "next/image";
import Button from "@/components/ui/Button";

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
            alt="Westwood AI Club logo"
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
          <p className="text-sm text-ink-muted whitespace-nowrap">
            Room E1307 &middot; Est. {founded}
          </p>
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-ink mb-7">
              A student-run club for anyone curious about how AI actually
              works &mdash; no experience required. We meet every other week
              to build things, hear from people who work in the field, and
              enter the occasional competition.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="https://forms.gle/m1a5LrzEBHhacpbg6" external variant="primary">
                Fill out the interest form
              </Button>
              <Button href="https://discord.gg/7QctqCABR" external variant="secondary">
                Discord ↗
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
