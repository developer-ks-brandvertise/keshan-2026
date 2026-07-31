"use client";

import Image from "next/image";
import { clients } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const partnerLogos = [
  "/images/Clients/Keshan-Clients-01.png",
  "/images/Clients/Keshan-Clients-03.png",
  "/images/Clients/Keshan-Clients-04.png",
  "/images/Clients/Keshan-Clients-05.png",
  "/images/Clients/Keshan-Clients-06.png",
  "/images/Clients/Keshan-Clients-07.png",
  "/images/Clients/Keshan-Clients-08.png",
  "/images/Clients/Keshan-Clients-09.png",
  "/images/Clients/Keshan-Clients-10.png",
  "/images/Clients/Keshan-Clients-11.png",
  "/images/Clients/Keshan-Clients-12.png",
  "/images/Clients/Keshan-Clients-13.png",
  "/images/Clients/Keshan-Clients-14.png",
  "/images/Clients/Keshan-Clients-15.png",
  "/images/Clients/Keshan-Clients-16.png",
  "/images/Clients/Keshan-Clients-17.png",
  "/images/Clients/Keshan-Clients-18.png",
  "/images/Clients/Keshan-Clients-19.png",
];

const rowOne = partnerLogos.filter((_, i) => i % 2 === 0);
const rowTwo = partnerLogos.filter((_, i) => i % 2 === 1);

function LogoTrack({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="group relative overflow-hidden border-y border-copper-base/20">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-dark-950 to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-dark-950 to-transparent sm:w-20"
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
            className="flex w-[240px] shrink-0 items-center justify-center border-r border-copper-base/15 px-7 py-8 sm:w-[280px] sm:px-10 sm:py-10"
            aria-hidden={i >= items.length || undefined}
          >
            <Image
              src={src}
              alt={i < items.length ? `Client logo ${i + 1}` : ""}
              width={220}
              height={90}
              className="h-14 w-auto max-w-[200px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-16 sm:max-w-[220px]"
            />
          </div>
        ))}
      </div>
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
        <div className="space-y-0">
          <LogoTrack items={rowOne} />
          <LogoTrack items={rowTwo} reverse />
        </div>
      </Reveal>
    </section>
  );
}
