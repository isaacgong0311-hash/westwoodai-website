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
    <div className="border border-[#1e1e2e] border-dashed rounded-xl px-6 py-16 text-center">
      <div className="mx-auto max-w-md flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-[#1e1e2e] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#55556a]" />
        </div>
        <h3 className="font-sans text-base text-[#e8e8f0]">{title}</h3>
        <p className="font-sans text-sm text-[#8888aa] leading-relaxed">
          {description}
        </p>
        {cta && (
          <a
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="mt-2 font-mono text-xs px-4 py-2 rounded-lg border border-[#2e2e45] text-[#e8e8f0] hover:border-[#7ea3d8]/50 hover:bg-[#7ea3d8]/5 hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            {cta.label} {cta.external && "↗"}
          </a>
        )}
      </div>
    </div>
  );
}
