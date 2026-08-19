"use client";

import Image from "next/image";
import { qualityCertificationLogos } from "@/lib/quality-logos";

const rowOne = qualityCertificationLogos.filter((_, i) => i % 2 === 0);
const rowTwo = qualityCertificationLogos.filter((_, i) => i % 2 === 1);

function LogoTrack({
  items,
  reverse = false,
  fadeFrom = "from-dark-950",
}: {
  items: readonly string[];
  reverse?: boolean;
  fadeFrom?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className="group relative overflow-hidden border-y border-copper-base/20">
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r ${fadeFrom} to-transparent sm:w-20`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l ${fadeFrom} to-transparent sm:w-20`}
        aria-hidden
      />

      <div
        className={`flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {loop.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex w-[168px] shrink-0 items-center justify-center border-r border-copper-base/15 px-5 py-6 sm:w-[200px] sm:px-7 sm:py-8"
            aria-hidden={i >= items.length || undefined}
          >
            <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full bg-copper-gradient p-[3px] shadow-[0_0_20px_rgba(202,94,46,0.2)] sm:h-[104px] sm:w-[104px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-dark-900 p-2">
                <Image
                  src={src}
                  alt={i < items.length ? `Certification logo ${i + 1}` : ""}
                  fill
                  sizes="104px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QualityLogoMarquee({
  fadeFrom = "from-dark-950",
}: {
  fadeFrom?: string;
}) {
  return (
    <div className="space-y-0" aria-label="Quality certifications">
      <LogoTrack items={rowOne} fadeFrom={fadeFrom} />
      <LogoTrack items={rowTwo} reverse fadeFrom={fadeFrom} />
    </div>
  );
}
