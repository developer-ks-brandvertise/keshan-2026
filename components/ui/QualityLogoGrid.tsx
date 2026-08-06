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
  const size = compact ? 72 : 96;

  return (
    <ul
      className={`mx-auto grid w-full max-w-[480px] grid-cols-4 gap-3 sm:gap-4 ${className}`}
      aria-label="Quality certifications"
    >
      {qualityCertificationLogos.map((src, i) => (
        <li key={src} className="relative w-full" style={{ aspectRatio: "1" }}>
          <div
            className="copper-circle-shine absolute inset-0"
            style={
              reduceMotion
                ? undefined
                : ({ "--shine-delay": `${i * 0.18}s` } as CSSProperties)
            }
          >
            {!reduceMotion ? (
              <span className="copper-circle-shine__spin" aria-hidden />
            ) : null}
            <div className="copper-circle-shine__media absolute inset-[2px]">
              <Image
                src={src}
                alt=""
                fill
                sizes={`${size}px`}
                className="object-contain p-2"
                aria-hidden
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
