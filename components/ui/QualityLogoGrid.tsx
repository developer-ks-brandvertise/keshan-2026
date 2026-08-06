"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { qualityCertificationLogos } from "@/lib/quality-logos";

type QualityLogoGridProps = {
  className?: string;
  compact?: boolean;
};

export function QualityLogoGrid({
  className = "",
  compact = false,
}: QualityLogoGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul
      className={`mx-auto grid w-full max-w-[440px] grid-cols-4 gap-3 sm:max-w-[480px] sm:gap-4 ${className}`}
      aria-label="Quality certifications"
    >
      {qualityCertificationLogos.map((src, i) => (
        <li key={src} className="aspect-square w-full">
          <div
            className="copper-circle-shine h-full w-full"
            style={
              reduceMotion
                ? undefined
                : ({ "--shine-delay": `${i * 0.18}s` } as CSSProperties)
            }
          >
            {!reduceMotion ? (
              <span className="copper-circle-shine__spin" aria-hidden />
            ) : (
              <span
                className="absolute inset-0 rounded-full border border-copper-base/40"
                aria-hidden
              />
            )}
            <div className="copper-circle-shine__media">
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={compact ? "72px" : "96px"}
                  className="object-contain p-1.5 sm:p-2"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
