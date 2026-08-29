"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/ui/Reveal";
import { CorporateFilmEmbed } from "@/components/ui/CorporateFilmEmbed";

type StoryVideoSectionProps = {
  sectionTitle: string;
  subheading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  videoTitle: string;
};

export function StoryVideoSection({
  sectionTitle,
  subheading,
  body,
  ctaLabel,
  ctaHref,
  videoTitle,
}: StoryVideoSectionProps) {
  return (
    <section className="relative overflow-hidden bg-dark-900">
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(202,94,46,0.1),transparent_70%)]"
        aria-hidden
      />

      <div className="relative px-gutter py-section">
        <div className="mx-auto max-w-6xl">
          <Reveal variant="fade">
            <h2
              className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary"
              style={{ letterSpacing: "-1.5px" }}
            >
              {sectionTitle}
              <span
                className="ml-2 inline-block h-3 w-3 translate-y-[-0.15em] bg-copper-base align-middle sm:h-3.5 sm:w-3.5"
                aria-hidden
              />
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-xl">
              <Reveal variant="fade" delay={0.08}>
                <h3 className="text-xl font-bold leading-snug text-text-primary sm:text-2xl lg:text-[1.75rem] lg:leading-[1.35]">
                  {subheading}
                </h3>
              </Reveal>

              <Reveal variant="fade" delay={0.14}>
                <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-[1.05rem] sm:leading-[1.75]">
                  {body}
                </p>
              </Reveal>

              <Reveal variant="fade" delay={0.2}>
                <Link
                  href={ctaHref as "/"}
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-copper-gradient py-2 pl-6 pr-2 text-sm font-semibold text-[#0a0a0a] shadow-[0_8px_28px_rgba(202,94,46,0.28)] transition-transform hover:scale-[1.02]"
                >
                  <span>{ctaLabel}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0a0a] text-copper-light transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </Link>
              </Reveal>
            </div>

            <div className="w-full min-w-0">
              <Reveal variant="fade" delay={0.12} className="w-full">
                <CorporateFilmEmbed title={videoTitle} variant="hero" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
