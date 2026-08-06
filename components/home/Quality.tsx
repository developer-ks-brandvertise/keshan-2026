"use client";

import { quality } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { CopperWave } from "@/components/ui/CopperWave";
import { QualityLogoGrid } from "@/components/ui/QualityLogoGrid";

export function QualitySection() {
  return (
    <section className="relative overflow-hidden bg-dark-950">
      <CopperWave id="quality" className="-mb-px" />

      {/* Static copper atmosphere — no video (keeps scroll smooth) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(184,115,51,0.22),transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(92,58,26,0.35),transparent_50%),linear-gradient(160deg,#080808_0%,#12100e_45%,#0a0a0a_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 px-gutter py-section">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 xl:gap-16">
          <div className="max-w-xl lg:max-w-none">
            <Reveal variant="fade">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                  04
                </span>
                <span className="h-px w-6 bg-copper-base/40" />
                <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                  Quality Assurance
                </p>
              </div>
            </Reveal>

            <Reveal variant="slide">
              <h2 className="text-h2 text-balance">
                Quality is Not a Department at Keshan. It is the{" "}
                <CopperHighlight>Standard</CopperHighlight>.
              </h2>
            </Reveal>

            <Reveal variant="fade" delay={0.12}>
              <p className="mt-5 max-w-lg text-body-lg text-text-secondary">
                {quality.body}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={0.18}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {quality.pillars.map((pillar) => (
                  <li
                    key={pillar}
                    className="border border-copper-base/20 bg-dark-900/60 px-4 py-3 text-body-sm text-text-primary"
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-copper-base align-middle" />
                    {pillar}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade" delay={0.24} className="mt-8">
              <MagneticButton href="/media-certificates" variant="primary">
                {quality.cta}
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={0.14}>
            <div className="relative border border-copper-base/25 bg-dark-900/50 p-5 sm:p-7">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,115,51,0.1),transparent_65%)]"
                aria-hidden
              />
              <p className="relative mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-base">
                Certifications & memberships
              </p>
              <QualityLogoGrid className="relative max-w-none" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
