"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { intro } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CopperWave } from "@/components/ui/CopperWave";
import CopperHighlight from "@/components/ui/CopperHighlight";

const datasheet = [
  { label: "Control", value: "Metallurgical control on every batch" },
  { label: "Testing", value: "Batch-tested quality before dispatch" },
  { label: "Reach", value: "On-time delivery to 30+ countries" },
  { label: "Certs", value: "ISO 9001 · 14001 · 45001" },
];

const millStats = [
  { value: "7+", unit: "Years" },
  { value: "30+", unit: "Countries" },
  { value: "20k+", unit: "MT / yr" },
  { value: "100%", unit: "QC tested" },
];

const ABOUT_IMAGE =
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786037495/About-Keshan-Image_kw1bkw.png";

export function ValuePropSection() {
  const t = useTranslations("common");

  return (
    <section className="relative overflow-hidden bg-dark-900">
      <CopperWave flip id="value" className="-mt-px" />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative px-gutter py-section">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-14 xl:gap-16">
          <div className="relative lg:col-span-5">
            <Reveal variant="slide">
              <div className="relative h-full min-h-[420px] overflow-hidden border border-copper-base/25 shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:min-h-[480px] lg:min-h-[600px]">
                {/* Full-bleed image */}
                <Image
                  src={ABOUT_IMAGE}
                  alt="Keshan manufacturing facility"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/25 to-transparent" />

                <div className="absolute bottom-[5.5rem] left-5 right-5 sm:bottom-24 sm:left-6">
                  <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-copper-base">
                    Since 2019
                  </p>
                  <p className="mt-1 text-lg text-text-primary sm:text-xl">
                    Precision copper. Made in India.
                  </p>
                </div>

                {/* Stats overlay — sits on the image */}
                <div className="absolute inset-x-0 bottom-0 border-t border-copper-base/35 bg-dark-950/90 backdrop-blur-sm">
                  <div className="flex items-stretch">
                    {millStats.map((stat, i) => (
                      <div
                        key={stat.unit}
                        className={`flex flex-1 flex-col items-center justify-center px-2 py-4 ${
                          i > 0 ? "border-l border-copper-base/25" : ""
                        }`}
                      >
                        <span className="font-heading text-xl text-copper-base md:text-2xl">
                          {stat.value}
                        </span>
                        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                          {stat.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex h-1 w-full overflow-hidden">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-full flex-1 ${
                          i % 4 === 0 ? "bg-copper-base/50" : "bg-copper-base/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7 lg:pl-2 xl:pl-6">
            <SectionHeading
              index="01"
              eyebrow="About Keshan"
              title={intro.headline}
              highlight="Built for the World"
              align="left"
            />

            <Reveal variant="fade" delay={0.1}>
              <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-text-secondary">
                {intro.body}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={0.16}>
              <blockquote className="mt-8 border-l-2 border-copper-base bg-dark-950/50 py-4 pl-5 pr-4">
                <p className="font-heading text-lg leading-snug text-text-primary sm:text-xl">
                  We are a manufacturing partner, not a commodity supplier —{" "}
                  <CopperHighlight>batch-tested</CopperHighlight> quality on
                  every order.
                </p>
              </blockquote>
            </Reveal>

            <Reveal variant="fade" delay={0.2}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {datasheet.map((row) => (
                  <div
                    key={row.label}
                    className="group relative overflow-hidden border border-copper-base/20 bg-dark-950/70 p-4 transition-colors hover:border-copper-base/45"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
                      {row.label}
                    </span>
                    <p className="mt-2 text-body-sm text-text-primary">
                      {row.value}
                    </p>
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-copper-gradient transition-transform duration-500 group-hover:scale-x-100"
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal
              variant="fade"
              delay={0.26}
              className="mt-9 flex flex-wrap items-center gap-4"
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
    </section>
  );
}
