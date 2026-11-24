import Image from "next/image";
import Button from "@/components/ui/Button";
import { photos } from "@/lib/content";
import { LINKS } from "@/lib/site";

// The group photo leads; two meeting shots sit under it. Picked by alt text
// so reordering photos.json doesn't silently swap them.
const byAlt = (text: string) => photos.club.find((p) => p.alt.includes(text)) ?? photos.club[0];
const lead = byAlt("pose together");
const side = [byAlt("explain AI agents"), byAlt("working at classroom computers")];

const FACTS = ["Mon or Wed, 4:30 to 5:30 PM", "Room E1307", "Free, no experience needed"];

export default function Hero() {
  return (
    <section className="border-b border-rule bg-peach-soft/60">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-rule bg-white px-3 py-1 text-xs font-medium text-ink-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-warm" />
            Westwood High School, Austin TX · since 2019
          </p>
          <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Hey! We&apos;re Westwood&apos;s AI club.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            We&apos;re students who like figuring out how AI actually works. At each meeting we learn one new idea, try it out on
            real code, and sometimes hear from people who build AI for a living. You don&apos;t need to know how to code, and
            it&apos;s free.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2 text-sm">
            {FACTS.map((f) => (
              <li key={f} className="rounded-full border border-rule bg-white px-3 py-1.5 text-ink">
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={LINKS.interestForm} external>Join the club</Button>
            <Button href={LINKS.discord} external variant="secondary">Say hi on Discord</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Image
            src={lead.src}
            alt={lead.alt}
            width={lead.width}
            height={lead.height}
            priority
            sizes="(min-width: 1024px) 540px, 100vw"
            className="col-span-2 aspect-[16/10] w-full rounded-lg border border-rule object-cover object-[50%_35%]"
          />
          {side.map((p) => (
            <Image
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 1024px) 270px, 50vw"
              className="aspect-[4/3] w-full rounded-lg border border-rule object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
