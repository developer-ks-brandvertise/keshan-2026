"use client";

import Image from "next/image";
import { intro } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CopperWave } from "@/components/ui/CopperWave";

const datasheet = [
  { label: "Control", value: "Metallurgical control on every batch" },
  { label: "Testing", value: "Batch-tested quality before dispatch" },
  { label: "Reach", value: "On-time delivery to 30+ countries" },
  { label: "Certs", value: "ISO 9001:2015 & ISO 14001:2015" },
];

const millStats = [
  { value: "10+", unit: "Years" },
  { value: "30+", unit: "Countries" },
  { value: "20k+", unit: "MT / yr" },
  { value: "100%", unit: "QC tested" },
];

export function ValuePropSection() {
  return (
    <section className="relative overflow-hidden bg-dark-900">
      <CopperWave flip id="value" className="-mt-px" />

      <div className="px-gutter py-section">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-5">
            <Reveal variant="slide">
              <div className="relative overflow-hidden">
                <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4]">
                  <Image
                    src="/images/img-about1.jpg"
                    alt="Keshan manufacturing facility"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                </div>

                {/* Mill certificate strip */}
                <div className="absolute inset-x-0 bottom-0 border-t border-copper-base/40 bg-dark-950/90 backdrop-blur-sm">
                  <div className="flex items-stretch">
                    {millStats.map((stat, i) => (
                      <div
                        key={stat.unit}
                        className={`flex flex-1 flex-col items-center justify-center px-2 py-3.5 ${
                          i > 0 ? "border-l border-copper-base/25" : ""
                        }`}
                      >
                        <span className="font-heading text-lg text-copper-base md:text-xl">
                          {stat.value}
                        </span>
                        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                          {stat.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex h-1.5 w-full overflow-hidden">
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

          <div className="flex flex-col justify-center lg:col-span-7 lg:pl-4 xl:pl-10">
            <SectionHeading
              index="01"
              eyebrow="About Keshan"
              title={intro.headline}
              highlight="Built for the World"
              align="left"
            />

            <Reveal variant="fade" delay={0.12}>
              <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-text-secondary">
                {intro.body}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={0.18}>
              <div className="mt-8 border-t border-copper-base/30">
                {datasheet.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[88px_1fr] gap-4 border-b border-dark-100/10 py-3.5 sm:grid-cols-[110px_1fr]"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-base">
                      {row.label}
                    </span>
                    <span className="text-body-sm text-text-primary">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="fade" delay={0.24} className="mt-8">
              <MagneticButton href="/about" variant="primary">
                Explore Our Manufacturing
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
