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
    <div className="rounded-lg border border-dashed border-rule bg-white px-6 py-12 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        {cta && (
          <Button href={cta.href} external={cta.external} className="mt-3">
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );
}
