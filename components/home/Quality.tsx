"use client";

import {
  Award,
  Beaker,
  ClipboardCheck,
  FileBadge,
  ShieldCheck,
} from "lucide-react";
import { quality } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { CertifiedSystems } from "@/components/ui/CertifiedSystems";
import { IconFeatureCard } from "@/components/ui/IconFeatureCard";

const pillarIcons = [Beaker, Award, ClipboardCheck, FileBadge];

const pillarMeta = [
  { title: "Purity", description: "99.9%+ copper purity on all electrolytic grades" },
  { title: "Certified", description: "ISO 9001:2015, ISO 14001:2015, and ISO 45001 certified" },
  { title: "Testing", description: "Chemical composition, conductivity, and tensile testing per batch" },
  { title: "Standards", description: "Compliance with IS, ASTM, DIN, JIS, and BS standards" },
];

export function QualitySection() {
  return (
    <section className="relative overflow-hidden bg-dark-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(202,94,46,0.16),transparent_55%),radial-gradient(ellipse_at_15%_80%,rgba(202,94,46,0.08),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 px-gutter py-section">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 xl:gap-16">
          <div className="max-w-xl lg:max-w-none">
            <Reveal variant="fade">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                  05
                </span>
                <span className="h-px w-6 bg-copper-base/40" />
                <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                  Quality Assurance
                </p>
              </div>
            </Reveal>

            <Reveal variant="slide">
              <h2 className="text-h2 text-balance text-text-primary">
                Quality Assurance Built Into Every{" "}
                <CopperHighlight>Production Stage</CopperHighlight>.
              </h2>
            </Reveal>

            <Reveal variant="fade" delay={0.12}>
              <p className="mt-5 max-w-lg text-body-lg text-text-secondary">
                {quality.body}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={0.18}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {pillarMeta.map((pillar, i) => (
                  <IconFeatureCard
                    key={pillar.title}
                    icon={pillarIcons[i] ?? ShieldCheck}
                    title={pillar.title}
                    description={pillar.description}
                  />
                ))}
              </div>
            </Reveal>

            <Reveal variant="fade" delay={0.24} className="mt-8">
              <MagneticButton href="/media-certificates" variant="primary">
                {quality.cta}
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={0.14}>
            <CertifiedSystems />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
