import Button from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export default function EmptyState({ title, description, cta }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-rule bg-white px-6 py-14 text-center shadow-[0_20px_50px_rgba(17,26,51,.05)]">
      <div aria-hidden="true" className="absolute -left-12 -top-12 size-40 rounded-full bg-blue-soft blur-2xl" />
      <div aria-hidden="true" className="absolute -right-10 -bottom-16 size-44 rounded-full bg-peach-soft blur-2xl" />
      <div className="relative mx-auto max-w-md flex flex-col items-center gap-4">
        <div aria-hidden="true" className="club-dots flex size-20 items-center justify-center rounded-3xl border border-accent/20 bg-blue-soft text-xl font-black text-accent rotate-[-7deg]">AI</div>
        <h2 className="text-2xl font-black tracking-tight text-ink">{title}</h2>
        <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        {cta && (
          <Button href={cta.href} external={cta.external} variant="primary" className="mt-3">
            {cta.label} {cta.external && "↗"}
          </Button>
        )}
      </div>
    </div>
  );
}
