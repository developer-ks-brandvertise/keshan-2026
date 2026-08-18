"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { qualityCertificationLogos } from "@/lib/quality-logos";

type QualityLogoGridProps = {
  className?: string;
  size?: "default" | "large";
};

export function QualityLogoGrid({ className = "", size = "default" }: QualityLogoGridProps) {
  const reduceMotion = useReducedMotion();
  const isLarge = size === "large";

  return (
    <ul
      className={`mx-auto grid w-full grid-cols-4 gap-4 sm:gap-5 ${isLarge ? "max-w-[560px]" : ""} ${className}`}
      aria-label="Quality certifications"
    >
      {qualityCertificationLogos.map((src, i) => (
        <li key={src} className="w-full">
          <div
            className={`relative w-full overflow-hidden rounded-full bg-copper-gradient shadow-[0_0_24px_rgba(202,94,46,0.2)] ${isLarge ? "p-[3px]" : "border border-copper-base/40 p-[2px]"}`}
            style={{ aspectRatio: "1 / 1" }}
          >
            {!reduceMotion && !isLarge ? (
              <span
                className="pointer-events-none absolute inset-[-40%] z-0 animate-[copper-ring-shine_2.5s_linear_infinite]"
                style={
                  {
                    "--shine-delay": `${i * 0.18}s`,
                    animationDelay: `${i * 0.18}s`,
                    background:
                      "conic-gradient(from 0deg, transparent 0%, transparent 68%, rgba(255,218,154,0.4) 74%, #ffda9a 80%, #ca5e2e 86%, #b24e1f 90%, transparent 96%, transparent 100%)",
                  } as CSSProperties
                }
                aria-hidden
              />
            ) : null}

            <div className={`relative z-[1] h-full w-full overflow-hidden rounded-full bg-dark-900 ${isLarge ? "p-2.5 sm:p-3" : "p-1.5 sm:p-2"}`}>
              <Image
                src={src}
                alt={`Certification logo ${i + 1}`}
                fill
                sizes={isLarge ? "120px" : "80px"}
                className="object-contain"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
