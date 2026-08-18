import type { LucideIcon } from "lucide-react";

type IconFeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  highlight?: string;
};

export function IconFeatureCard({
  icon: Icon,
  title,
  description,
  index,
  highlight,
}: IconFeatureCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-copper-base/20 bg-dark-900 p-5 transition-colors hover:border-copper-base/45 sm:p-6">
      {index !== undefined ? (
        <span
          className="pointer-events-none absolute -right-2 -top-4 font-heading text-7xl text-copper-base/[0.07] transition-colors group-hover:text-copper-base/15"
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <div className="mb-4 h-1 w-10 bg-copper-gradient" aria-hidden />
      <div className="mb-4 flex h-11 w-11 items-center justify-center border border-copper-base/40 bg-copper-base/10 text-copper-base">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      {highlight ? (
        <p className="font-heading text-2xl text-copper-base">{highlight}</p>
      ) : null}
      <h3 className={`text-sm font-semibold uppercase tracking-[0.12em] text-text-primary ${highlight ? "mt-1" : ""}`}>
        {title}
      </h3>
      <p className="mt-2 flex-1 text-body-sm text-text-secondary">{description}</p>
    </article>
  );
}
