import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  PanelTop,
  Sun,
  BatteryCharging,
  Cable,
  Building2,
  Cpu,
  Car,
  Thermometer,
  Shield,
  TrainFront,
  Radio,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Industries Served | Keshan Industries | Copper & Brass Applications",
  description:
    "Keshan copper and brass serve electrical, power, solar, EV, cable, construction, automotive, electronics, and more. Explore 13 industries we supply.",
};

const iconMap: Record<string, LucideIcon> = {
  Zap,
  PanelTop,
  Sun,
  BatteryCharging,
  Cable,
  Building2,
  Cpu,
  Car,
  Thermometer,
  Shield,
  TrainFront,
  Radio,
  Wrench,
};

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        label="Industries Served"
        title="Copper at the Core of Critical Industries."
        highlight="Critical Industries"
        description={industries.subheadline}
      />

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-body text-text-secondary">
              Thirteen sectors. One metallurgical standard — specification-led
              copper and brass, batch after batch.
            </p>
            <MagneticButton href="/contact" variant="primary" className="shrink-0">
              Discuss Your Application
            </MagneticButton>
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.catalog.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Zap;
              return (
                <AnimatedSection
                  key={item.name}
                  delay={Math.min(index * 0.04, 0.28)}
                >
                  <article className="group relative flex h-full flex-col overflow-hidden border border-dark-100/10 bg-dark-950 transition-colors hover:border-copper-base/45">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                      <span className="absolute left-4 top-4 font-heading text-xs tracking-[0.2em] text-copper-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center border border-copper-base/40 bg-dark-950/80 text-copper-base backdrop-blur-sm">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-5">
                      <h2 className="text-lg text-text-primary transition-colors group-hover:text-copper-light">
                        {item.name}
                      </h2>
                      <p className="mt-2 text-body-sm text-text-secondary">
                        {item.application}
                      </p>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="mt-12 text-center sm:text-left">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-b border-copper-base pb-1 text-xs font-bold uppercase tracking-[0.14em] text-copper-base transition-colors hover:text-copper-bright"
            >
              Browse product range →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
