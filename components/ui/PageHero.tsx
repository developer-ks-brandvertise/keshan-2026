import AnimatedSection from "./AnimatedSection";
import Container from "./Container";
import CopperHighlight from "./CopperHighlight";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  highlight?: string;
  className?: string;
}

export default function PageHero({
  label,
  title,
  description,
  highlight,
  className = "",
}: PageHeroProps) {
  const highlighted = highlight ? title.replace(highlight, `{{${highlight}}}`) : title;
  const parts = highlighted.split(/\{\{|\}\}/).filter(Boolean);

  return (
    <section
      className={`relative overflow-hidden border-b border-dark-100/10 bg-dark-900 pt-24 pb-16 lg:pt-32 lg:pb-24 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url('/images/bg-page-title1.jpg')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/85 to-dark-900/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px hairline-copper" />

      <Container className="relative z-10">
        <AnimatedSection>
          {label && (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-copper-base" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                {label}
              </span>
            </div>
          )}
          <h1 className="max-w-4xl text-h1 text-balance">
            {highlight
              ? parts.map((part, i) =>
                  i % 2 === 1 ? (
                    <CopperHighlight key={i}>{part}</CopperHighlight>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )
              : title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-body-lg text-text-secondary">
              {description}
            </p>
          )}
        </AnimatedSection>
      </Container>
    </section>
  );
}
