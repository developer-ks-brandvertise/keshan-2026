"use client";

import Image from "next/image";
import { clients } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const partners = [
  { src: "/images/client-img1.png", region: "Belgium" },
  { src: "/images/client-img2.png", region: "Netherlands" },
  { src: "/images/client-img3-1.png", region: "India" },
  { src: "/images/client-img4.png", region: "UAE" },
  { src: "/images/client-img5.png", region: "Germany" },
  { src: "/images/client-img6.png", region: "USA" },
];

function LogoTrack({
  items,
  ariaHidden = false,
}: {
  items: typeof partners;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-stretch"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((partner, i) => (
        <div
          key={`${partner.src}-${i}`}
          className="flex w-[200px] shrink-0 flex-col items-center justify-center gap-3 border-r border-copper-base/20 px-8 py-8 sm:w-[220px]"
        >
          <Image
            src={partner.src}
            alt={ariaHidden ? "" : `${partner.region} partner`}
            width={140}
            height={48}
            className="h-9 w-auto max-w-[140px] object-contain opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            {partner.region}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className="overflow-hidden border-y border-dark-100/10 bg-dark-950 py-section">
      <div className="mx-auto max-w-6xl px-gutter">
        <Reveal variant="fade">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                  06
                </span>
                <span className="h-px w-6 bg-copper-base/40" />
                <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                  Our Partners
                </p>
              </div>
              <h2 className="max-w-xl text-h3 text-text-primary">
                {clients.headline}
              </h2>
            </div>
            <p className="max-w-sm text-body-sm text-text-secondary sm:text-right">
              {clients.caption}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal variant="fade" delay={0.08}>
        <div className="relative border-y border-copper-base/25">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-dark-950 to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-dark-950 to-transparent sm:w-24"
            aria-hidden
          />

          <div className="group flex overflow-hidden">
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              <LogoTrack items={partners} />
              <LogoTrack items={partners} ariaHidden />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
