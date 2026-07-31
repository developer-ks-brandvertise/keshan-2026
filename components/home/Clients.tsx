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
  "/images/Clients/Keshan-Clients_Artboard 1 copy.png",
];

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
        <div className="mx-auto max-w-6xl px-gutter">
          <div className="overflow-hidden rounded-2xl border border-copper-base/20 bg-dark-900/45 p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {partnerLogos.map((src, i) => (
                <div
                  key={src}
                  className="flex h-20 items-center justify-center rounded-xl border border-copper-base/10 bg-dark-950/55 px-4 sm:h-24"
                >
                  <Image
                    src={src}
                    alt={`Client logo ${i + 1}`}
                    width={170}
                    height={70}
                    className="h-10 w-auto max-w-[170px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
