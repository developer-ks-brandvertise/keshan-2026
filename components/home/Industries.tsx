"use client";

import Image from "next/image";
import {
  Zap,
  PanelTop,
  Sun,
  BatteryCharging,
  Cable,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  PanelTop,
  Sun,
  BatteryCharging,
  Cable,
  Building2,
};

export function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-copper-base/8 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="05"
            eyebrow="Industries Served"
            title={industries.headline}
            highlight="Critical Industries"
            subtitle={industries.subheadline}
            align="left"
            className="max-w-2xl"
          />
          <MagneticButton href="/industries" variant="primary" className="shrink-0">
            {industries.cta}
          </MagneticButton>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          {industries.featured.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Zap;

            return (
              <Reveal
                key={item.name}
                variant="slide"
                delay={Math.min(index * 0.07, 0.35)}
              >
                <article className="group overflow-hidden border border-copper-base/20 bg-dark-950 transition-colors duration-300 hover:border-copper-base/45 hover:bg-copper-base/[0.04]">
                  <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
                    <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:min-h-[280px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-dark-950/40" />
                      <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center border border-copper-base/50 bg-dark-950/80 text-copper-base backdrop-blur-sm">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                      <span className="absolute bottom-4 left-4 font-heading text-[10px] tracking-[0.28em] text-copper-base">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(industries.featured.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-9 lg:px-10">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-base">
                        Sector {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-xl text-text-primary transition-colors group-hover:text-copper-light sm:text-2xl">
                        {item.name}
                      </h3>
                      <p className="mt-3 max-w-md text-body text-text-secondary">
                        {item.application}
                      </p>
                      <div className="mt-6 h-px w-16 bg-copper-base/40 transition-all duration-500 group-hover:w-24" />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
