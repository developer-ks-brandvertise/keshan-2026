"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar, Factory, Globe2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { IconFeatureCard } from "@/components/ui/IconFeatureCard";

const ABOUT_IMAGE =
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786037495/About-Keshan-Image_kw1bkw.png";

const statIcons = [Calendar, Globe2, Factory, ShieldCheck];
const statKeys = ["years", "countries", "capacity", "qc"] as const;

export function ValuePropSection() {
  const t = useTranslations("home.about");
  const tc = useTranslations("common");

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
            eyebrow={t("eyebrow")}
            title={t("headline")}
            highlight={t("highlight")}
            align="left"
            className="max-w-4xl"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12 xl:gap-14">
            <div className="relative min-h-[360px] sm:min-h-[420px] lg:col-span-5 lg:min-h-0">
              <Reveal variant="slide" className="absolute inset-0">
                <div className="relative h-full overflow-hidden border border-copper-base/25 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                  <Image
                    src={ABOUT_IMAGE}
                    alt={t("imageAlt")}
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
                  {t("body")}
                </p>
              </Reveal>

              <Reveal variant="fade" delay={0.16}>
                <blockquote className="mt-6 border-l-2 border-copper-base bg-dark-950/50 py-4 pl-5 pr-4">
                  <p className="font-heading text-lg leading-snug text-text-primary sm:text-xl">
                    {t("quote")}{" "}
                    <CopperHighlight>{t("quoteHighlight")}</CopperHighlight>{" "}
                    {t("quoteEnd")}
                  </p>
                </blockquote>
              </Reveal>

              <Reveal variant="fade" delay={0.2}>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {statKeys.map((key, i) => (
                    <IconFeatureCard
                      key={key}
                      icon={statIcons[i]}
                      highlight={["7+", "30+", "25k+", "100%"][i]}
                      title={t(`stats.${key}Title`)}
                      description={t(`stats.${key}Body`)}
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
                  {tc("exploreManufacturing")}
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
