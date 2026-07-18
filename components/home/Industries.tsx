"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

const iconMap: Record<string, LucideIcon> = {
  Zap,
  PanelTop,
  Sun,
  BatteryCharging,
  Cable,
  Building2,
};

export function IndustriesSection() {
  const [active, setActive] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = (index: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    // Short debounce prevents flicker when the open panel shifts layout under the cursor
    hoverTimer.current = setTimeout(() => setActive(index), 40);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-copper-base/10 to-transparent lg:block"
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

        <div className="border-t border-copper-base/30">
          {industries.featured.map((item, index) => {
            const isOpen = active === index;
            const Icon = iconMap[item.icon] ?? Zap;

            return (
              <div
                key={item.name}
                className={`group relative border-b border-dark-100/10 transition-colors duration-300 ${
                  isOpen ? "bg-copper-base/[0.06]" : "hover:bg-dark-950/60"
                }`}
                onMouseEnter={() => activate(index)}
              >
                <button
                  type="button"
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="relative flex w-full gap-4 py-5 text-left sm:gap-5 sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-[2px] origin-top transition-transform duration-500 ${
                      isOpen
                        ? "scale-y-100 bg-copper-base"
                        : "scale-y-0 bg-copper-base/40"
                    }`}
                    aria-hidden
                  />

                  <span
                    className={`ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:ml-4 ${
                      isOpen
                        ? "border-copper-base bg-copper-base/15 text-copper-light shadow-[0_0_24px_rgba(184,115,51,0.25)]"
                        : "border-dark-100/25 text-text-muted group-hover:border-copper-base/40 group-hover:text-copper-base"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>

                  <span className="min-w-0 flex-1 pr-3 pt-1.5 sm:pr-4">
                    <span
                      className={`block text-lg font-medium tracking-tight transition-colors sm:text-xl ${
                        isOpen
                          ? "text-copper-light"
                          : "text-text-primary group-hover:text-copper-light/90"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`mt-1.5 block text-body-sm text-text-secondary transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {item.application}
                    </span>
                  </span>

                  <span
                    className={`hidden shrink-0 pt-2 font-heading text-[10px] tracking-[0.2em] sm:block ${
                      isOpen ? "text-copper-base" : "text-text-muted/50"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>

                {/* CSS grid expand — stable under hover, no AnimatePresence thrash */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-3 pb-6 sm:px-4 sm:pb-8 sm:pl-[4.75rem]">
                      <div
                        className={`relative aspect-[16/9] w-full overflow-hidden border border-copper-base/25 transition-opacity duration-300 sm:aspect-[21/9] ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <motion.div
                          key={`${item.name}-${isOpen ? "open" : "closed"}`}
                          className="absolute inset-0"
                          initial={false}
                          animate={
                            isOpen
                              ? { scale: 1, y: 0, opacity: 1 }
                              : { scale: 1.06, y: 12, opacity: 0 }
                          }
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={isOpen ? item.name : ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 960px"
                            priority={index === 0}
                          />
                        </motion.div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/15 to-transparent" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-copper-base/15 via-transparent to-transparent" />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
                          <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-copper-base">
                            Sector {String(index + 1).padStart(2, "0")} /{" "}
                            {String(industries.featured.length).padStart(2, "0")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
