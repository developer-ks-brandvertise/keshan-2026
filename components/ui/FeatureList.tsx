import { Check } from "lucide-react";

interface FeatureListProps {
  items: string[];
  className?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export default function FeatureList({
  items,
  className = "",
  icon: Icon = Check,
}: FeatureListProps) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-body text-text-secondary">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper-base/10 text-copper-base">
            <Icon className="h-3 w-3" strokeWidth={2.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
