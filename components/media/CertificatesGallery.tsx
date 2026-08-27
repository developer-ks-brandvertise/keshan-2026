"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export type CertificateItem = {
  src: string;
  alt: string;
};

type CertificatesGalleryProps = {
  items: CertificateItem[];
  label?: string;
};

function shortestOffset(index: number, active: number, count: number) {
  let diff = index - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
}

export function CertificatesGallery({
  items,
  label = "Certificates",
}: CertificatesGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const titleId = useId();

  const count = items.length;
  const active = items[activeIndex] ?? items[0];

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % Math.max(count, 1));
  }, [count]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + count) % Math.max(count, 1));
  }, [count]);

  const close = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(motionMq.matches);
    syncMotion();
    motionMq.addEventListener("change", syncMotion);
    return () => motionMq.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (hovered || reduceMotion || count <= 1 || lightboxOpen) return;
    const timer = window.setInterval(goNext, 4200);
    return () => window.clearInterval(timer);
  }, [count, goNext, hovered, lightboxOpen, reduceMotion]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, close, goNext, goPrev]);

  if (!active || count === 0) return null;

  return (
    <>
      <AnimatedSection className="mt-10">
        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative px-10 sm:px-14 lg:px-16">
            <div
              className="relative mx-auto h-[280px] w-full max-w-5xl sm:h-[320px] lg:h-[360px]"
              style={{ perspective: reduceMotion ? undefined : "1200px" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {items.map((item, index) => {
                  const offset = shortestOffset(index, activeIndex, count);
                  const abs = Math.abs(offset);
                  const visible = abs <= 3;
                  const isActive = offset === 0;

                  const translateX = offset * (reduceMotion ? 72 : 58);
                  const rotateY = reduceMotion ? 0 : offset * -42;
                  const scale = isActive ? 1 : Math.max(0.62, 1 - abs * 0.12);
                  const opacity = !visible ? 0 : isActive ? 1 : Math.max(0.35, 1 - abs * 0.18);

                  return (
                    <button
                      key={item.src}
                      type="button"
                      tabIndex={isActive ? 0 : -1}
                      aria-hidden={!visible}
                      aria-label={isActive ? `Open ${item.alt}` : `Show ${item.alt}`}
                      onClick={() => {
                        if (isActive) setLightboxOpen(true);
                        else setActiveIndex(index);
                      }}
                      className="absolute left-1/2 top-1/2 w-[min(72vw,420px)] origin-center sm:w-[400px] lg:w-[460px]"
                      style={{
                        transform: `translate(-50%, -50%) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
                        zIndex: 20 - abs,
                        opacity,
                        transition: reduceMotion
                          ? "opacity 200ms ease"
                          : "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease",
                        pointerEvents: visible ? "auto" : "none",
                      }}
                    >
                      <div
                        className={`overflow-hidden bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:p-2.5 ${
                          isActive
                            ? "ring-1 ring-copper-base/30"
                            : "brightness-[0.92]"
                        }`}
                      >
                        <div className="relative aspect-[16/10] w-full bg-[#f4f1ec]">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="460px"
                            className="object-contain p-1.5"
                            priority={isActive}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={goPrev}
                className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-copper-base/80 transition-colors hover:text-copper-light sm:-left-1"
                aria-label={`Previous ${label.toLowerCase()}`}
              >
                <ChevronLeft className="h-8 w-8" strokeWidth={1.25} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-copper-base/80 transition-colors hover:text-copper-light sm:-right-1"
                aria-label={`Next ${label.toLowerCase()}`}
              >
                <ChevronRight className="h-8 w-8" strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {lightboxOpen && active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-dark-100/20 bg-dark-900 text-text-primary transition-colors hover:border-copper-base hover:text-copper-base sm:right-8 sm:top-8"
            aria-label={`Close ${label.toLowerCase()} preview`}
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          <div
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <p
              id={titleId}
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-base"
            >
              {active.alt}
            </p>
            <div className="relative mx-auto h-[min(78vh,900px)] w-full overflow-hidden border border-copper-base/25 bg-dark-900">
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain p-3 sm:p-6"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-8 w-8 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label={`Previous ${label.toLowerCase()}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-8 w-8 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label={`Next ${label.toLowerCase()}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
