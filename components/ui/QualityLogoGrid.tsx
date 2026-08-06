"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { qualityCertificationLogos } from "@/lib/quality-logos";

type QualityLogoGridProps = {
  className?: string;
};

export function QualityLogoGrid({ className = "" }: QualityLogoGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul
      className={`mx-auto grid w-full grid-cols-4 gap-3 sm:gap-4 ${className}`}
      aria-label="Quality certifications"
    >
      {qualityCertificationLogos.map((src, i) => (
        <li key={src} className="w-full">
          {/* Explicit square box — do not rely on percentage height chains */}
          <div
            className="relative w-full overflow-hidden rounded-full border border-copper-base/40 bg-dark-950 shadow-[inset_0_0_0_1px_rgba(184,115,51,0.15)]"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* Shine ring */}
            {!reduceMotion ? (
              <span
                className="pointer-events-none absolute inset-[-40%] z-0 animate-[copper-ring-shine_2.5s_linear_infinite]"
                style={
                  {
                    "--shine-delay": `${i * 0.18}s`,
                    animationDelay: `${i * 0.18}s`,
                    background:
                      "conic-gradient(from 0deg, transparent 0%, transparent 68%, rgba(245,197,138,0.4) 74%, #f5c58a 80%, #b87333 86%, #8a5a2b 90%, transparent 96%, transparent 100%)",
                  } as CSSProperties
                }
                aria-hidden
              />
            ) : null}

            {/* Logo plate */}
            <div className="absolute inset-[3px] z-[1] overflow-hidden rounded-full bg-dark-900">
              <Image
                src={src}
                alt={`Certification logo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 22vw, 100px"
                className="object-contain p-2 sm:p-2.5"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
