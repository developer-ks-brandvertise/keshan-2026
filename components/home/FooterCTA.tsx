"use client";

import { footerCta, contact } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CopperWave } from "@/components/ui/CopperWave";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { Globe } from "@/components/ui/Globe";

export function FooterCTASection() {
  return (
    <section className="relative overflow-hidden bg-dark-950">
      <CopperWave flip id="footer-cta" className="bg-dark-900" />

      {/* Globe sits behind content, sunk into the section bottom edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full sm:pointer-events-auto sm:w-[48%] lg:w-[42%]">
        <div className="absolute bottom-[-18%] left-1/2 aspect-square w-[min(520px,88%)] -translate-x-1/2 sm:left-auto sm:right-[-2%] sm:translate-x-0 lg:bottom-[-20%] lg:right-0 lg:w-[min(480px,92%)]">
          <Globe />
        </div>
      </div>

      <div className="relative z-10 px-gutter pt-section pb-0">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="relative max-w-xl text-left lg:max-w-lg">
            <Reveal variant="slide">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                  08
                </span>
                <span className="h-px w-6 bg-copper-base/40" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                  Global Supply
                </p>
              </div>
            </Reveal>

            <Reveal variant="slide" delay={0.05}>
              <h2 className="text-h2 text-balance">
                Ready to Source Premium{" "}
                <CopperHighlight>Copper & Brass</CopperHighlight>?
              </h2>
            </Reveal>

            <Reveal variant="fade" delay={0.1}>
              <p className="mt-5 max-w-lg text-body-lg text-text-secondary">
                {footerCta.subheadline}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton href="/contact" variant="primary" size="lg">
                  {footerCta.primaryCta}
                </MagneticButton>
                <MagneticButton href="/products" variant="primary" size="lg">
                  {footerCta.secondaryCta}
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={0.3}>
              <div className="mt-10 flex flex-col gap-2 border-t border-dark-100/10 pt-6 text-sm text-text-secondary sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
                <a
                  href={`tel:${contact.phones[0].replace(/\s/g, "")}`}
                  className="transition-colors hover:text-copper-base"
                >
                  {contact.phones[0]}
                </a>
                <span className="hidden text-dark-100/30 sm:inline" aria-hidden>
                  ·
                </span>
                {contact.emails.map((email, i) => (
                  <span key={email} className="contents">
                    {i > 0 ? (
                      <span
                        className="hidden text-dark-100/30 sm:inline"
                        aria-hidden
                      >
                        |
                      </span>
                    ) : null}
                    <a
                      href={`mailto:${email}`}
                      className="transition-colors hover:text-copper-base"
                    >
                      {email}
                    </a>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Spacer so section height keeps globe visible on the right */}
          <div className="hidden min-h-[280px] lg:block" aria-hidden />
        </div>

        {/* Mobile: reserve space under copy for the globe peek */}
        <div className="h-[160px] sm:h-[180px] lg:hidden" aria-hidden />
      </div>
    </section>
  );
}
