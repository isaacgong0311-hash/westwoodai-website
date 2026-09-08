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
    <div className="border border-dashed border-rule px-6 py-16 text-center">
      <div className="mx-auto max-w-md flex flex-col items-center gap-3">
        <h3 className="text-base text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{description}</p>
        {cta && (
          <Button href={cta.href} external={cta.external} variant="secondary" className="mt-2">
            {cta.label} {cta.external && "↗"}
          </Button>
        )}
      </div>
    </div>
  );
}
