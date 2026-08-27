import type { ReactNode } from "react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Container from "./Container";
import CopperHighlight from "./CopperHighlight";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  highlight?: string;
  className?: string;
  background?: ReactNode;
  backgroundImage?: string;
  backgroundPriority?: boolean;
}

export default function PageHero({
  label,
  title,
  description,
  highlight,
  className = "",
  background,
  backgroundImage,
  backgroundPriority = false,
}: PageHeroProps) {
  const highlighted = highlight ? title.replace(highlight, `{{${highlight}}}`) : title;
  const parts = highlighted.split(/\{\{|\}\}/).filter(Boolean);

  return (
    <section
      className={`page-hero relative overflow-hidden border-b border-white/10 bg-[#0a0a0a] pt-24 pb-16 text-[#f5f5f5] lg:pt-32 lg:pb-24 ${className}`}
    >
      {background ? (
        <>
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {background}
          </div>
          <div
            className="page-hero-photo-overlay page-hero-silk-overlay pointer-events-none absolute inset-0"
            aria-hidden
          />
        </>
      ) : backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority={backgroundPriority}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="page-hero-photo-overlay pointer-events-none absolute inset-0"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
            style={{ backgroundImage: "url('/images/bg-page-title1.jpg')" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/40" />
        </>
      )}
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
          <h1 className="page-hero-title max-w-4xl text-h1 text-balance">
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
            <p className="mt-6 max-w-2xl text-body-lg text-[#a1a1a1]">
              {description}
            </p>
          )}
        </AnimatedSection>
      </Container>
    </section>
  );
}
