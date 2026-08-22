"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar, Factory, Globe2, ShieldCheck } from "lucide-react";
import { intro } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { IconFeatureCard } from "@/components/ui/IconFeatureCard";

const statCards = [
  { icon: Calendar, highlight: "10+", title: "Years", description: "Years of manufacturing excellence since 2016." },
  { icon: Globe2, highlight: "30+", title: "Countries", description: "On-time delivery to 30+ countries worldwide." },
  { icon: Factory, highlight: "24k+", title: "MT / Year", description: "Annual production capacity across copper and brass." },
  { icon: ShieldCheck, highlight: "100%", title: "QC Tested", description: "Batch-tested quality before every dispatch." },
];

const ABOUT_IMAGE =
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786037495/About-Keshan-Image_kw1bkw.png";

export function ValuePropSection() {
  const t = useTranslations("common");

  return (
    <section className="relative overflow-hidden bg-dark-900">
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(202,94,46,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative px-gutter py-section">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="01"
            eyebrow="About Keshan"
            title={intro.headline}
            highlight="Built for the World"
            align="left"
            className="max-w-4xl"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12 xl:gap-14">
            <div className="relative min-h-[360px] sm:min-h-[420px] lg:col-span-5 lg:min-h-0">
              <Reveal variant="slide" className="absolute inset-0">
                <div className="relative h-full overflow-hidden border border-copper-base/25 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                  <Image
                    src={ABOUT_IMAGE}
                    alt="Keshan manufacturing facility"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col lg:col-span-7">
              <Reveal variant="fade" delay={0.1}>
                <p className="max-w-xl text-body-lg leading-relaxed text-text-secondary">
                  {intro.body}
                </p>
              </Reveal>

              <Reveal variant="fade" delay={0.16}>
                <blockquote className="mt-6 border-l-2 border-copper-base bg-dark-950/50 py-4 pl-5 pr-4">
                  <p className="font-heading text-lg leading-snug text-text-primary sm:text-xl">
                    We are a manufacturing partner, not a commodity supplier —{" "}
                    <CopperHighlight>batch-tested</CopperHighlight> quality on
                    every order.
                  </p>
                </blockquote>
              </Reveal>

              <Reveal variant="fade" delay={0.2}>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {statCards.map((row) => (
                    <IconFeatureCard
                      key={row.title}
                      icon={row.icon}
                      highlight={row.highlight}
                      title={row.title}
                      description={row.description}
                    />
                  ))}
                </div>
              </Reveal>

              <Reveal
                variant="fade"
                delay={0.26}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <MagneticButton href="/about" variant="primary">
                  {t("exploreManufacturing")}
                </MagneticButton>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  ISO · ASTM · EN · JIS
                </span>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
