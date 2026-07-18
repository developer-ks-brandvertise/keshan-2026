import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  description,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  return (
    <AnimatedSection className={className}>
      <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
        {label && (
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-copper-base">
            {label}
          </span>
        )}
        <h2 className="text-h2">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-body-lg text-text-secondary">
            {description}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}
