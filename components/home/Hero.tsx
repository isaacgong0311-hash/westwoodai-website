import Button from "@/components/ui/Button";
import HeroArt from "@/components/home/HeroArt";

export default function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div>
          <p className="mb-5 font-mono text-xs text-ink-muted">Westwood High School, Austin TX · since 2019</p>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl">Westwood AI Club</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            We&apos;re a student-run club that learns how machine learning actually works, from linear regression to transformers. Guest
            speakers from industry visit a few times a year. You don&apos;t need to know how to code, and there&apos;s no fee.
          </p>
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-y-4 border-y border-rule py-5 text-sm">
            <div>
              <dt className="font-mono text-xs text-ink-muted">When</dt>
              <dd className="mt-1 text-ink">Mon or Wed, 4:30 PM</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-ink-muted">Where</dt>
              <dd className="mt-1 text-ink">Room E1307, Mr. Kluge</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="https://forms.gle/m1a5LrzEBHhacpbg6" external>Join the mailing list</Button>
            <Button href="/calendar" variant="secondary">See the calendar</Button>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}
