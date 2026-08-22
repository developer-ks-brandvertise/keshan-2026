"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { industries } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function IndustriesSection() {
  const [active, setActive] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const activate = (index: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
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
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-copper-base/8 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="06"
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

        <div
          className="hidden h-[520px] gap-2 md:flex lg:h-[560px] lg:gap-2.5"
          onMouseLeave={() => activate(0)}
        >
          {industries.featured.map((item, index) => {
            const isOpen = active === index;

            return (
              <button
                key={item.name}
                type="button"
                onMouseEnter={() => activate(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-expanded={isOpen}
                className={`group relative h-full overflow-hidden border text-left outline-none transition-[flex] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-copper-base focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 ${
                  reduceMotion ? "duration-0" : "duration-500"
                } ${
                  isOpen
                    ? "flex-[3.2] border-copper-base/50"
                    : "flex-[0.72] border-copper-base/20 hover:border-copper-base/40"
                }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isOpen ? "scale-105" : "scale-100"
                  }`}
                  sizes={isOpen ? "45vw" : "12vw"}
                  aria-hidden
                />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isOpen
                      ? "bg-gradient-to-t from-dark-950 via-dark-950/55 to-dark-950/20"
                      : "bg-dark-950/75"
                  }`}
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center px-3 py-6 transition-opacity duration-300 ${
                    isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span
                    className="max-h-[80%] overflow-hidden text-sm font-medium text-text-primary"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {item.name}
                  </span>
                </div>

                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 lg:p-8 ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <h3 className="max-w-md text-h2 text-text-primary">{item.name}</h3>
                  <p className="mt-4 max-w-md text-body text-text-secondary">
                    {item.application}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          {industries.featured.map((item, index) => {
            const isOpen = active === index;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(index)}
                aria-expanded={isOpen}
                className={`relative overflow-hidden border text-left transition-[min-height] duration-500 ${
                  isOpen
                    ? "min-h-[280px] border-copper-base/50"
                    : "min-h-[72px] border-copper-base/20"
                }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  aria-hidden
                />
                <div
                  className={`absolute inset-0 ${
                    isOpen
                      ? "bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/30"
                      : "bg-dark-950/80"
                  }`}
                />
                <div className="relative z-10 px-4 py-5">
                  <span className="block text-lg text-text-primary">{item.name}</span>
                </div>
                {isOpen ? (
                  <div className="relative z-10 px-4 pb-6">
                    <p className="text-body-sm text-text-secondary">
                      {item.application}
                    </p>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
