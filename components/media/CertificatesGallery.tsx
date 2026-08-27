"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export type CertificateItem = {
  src: string;
  alt: string;
};

type CertificatesGalleryProps = {
  items: CertificateItem[];
  label?: string;
};

export function CertificatesGallery({
  items,
  label = "Certificates",
}: CertificatesGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const titleId = useId();

  const count = items.length;
  const active = items[activeIndex] ?? items[0];
  const prevIndex = count > 0 ? (activeIndex - 1 + count) % count : 0;
  const nextIndex = count > 0 ? (activeIndex + 1) % count : 0;
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

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
    if (!isPlaying || hovered || reduceMotion || count <= 1) return;
    const timer = window.setInterval(goNext, 4500);
    return () => window.clearInterval(timer);
  }, [count, goNext, hovered, isPlaying, reduceMotion]);

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
          className="overflow-hidden border border-copper-base/25 bg-dark-900"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex items-center justify-between border-b border-dark-100/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="font-heading text-xs tracking-[0.18em] text-copper-base">
                {label}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {activeIndex + 1} / {count}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center border border-copper-base/30 text-copper-base transition-colors hover:border-copper-base"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-9 w-9 items-center justify-center border border-copper-base/30 text-copper-base transition-colors hover:border-copper-base"
                aria-label={`Previous ${label.toLowerCase()}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-9 w-9 items-center justify-center border border-copper-base/30 text-copper-base transition-colors hover:border-copper-base"
                aria-label={`Next ${label.toLowerCase()}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main single-image stage */}
          <div className="relative bg-dark-950">
            <button
              type="button"
              className="group relative block h-[min(62vh,560px)] w-full"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open ${active.alt}`}
            >
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className={`object-contain p-4 sm:p-8 ${
                  reduceMotion ? "" : "animate-fade-in"
                }`}
                priority
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-950/80 to-transparent px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
                {active.alt}
              </span>
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-copper-base/40 bg-dark-950/80 text-copper-base backdrop-blur-sm transition-colors hover:border-copper-base hover:bg-dark-900 sm:inline-flex"
              aria-label={`Previous ${label.toLowerCase()}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-copper-base/40 bg-dark-950/80 text-copper-base backdrop-blur-sm transition-colors hover:border-copper-base hover:bg-dark-900 sm:inline-flex"
              aria-label={`Next ${label.toLowerCase()}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Previous + next previews below */}
          {count > 1 && prevItem && nextItem ? (
            <div className="grid grid-cols-2 gap-px border-t border-copper-base/20 bg-copper-base/20">
              <button
                type="button"
                onClick={goPrev}
                className="group relative bg-dark-950 p-3 text-left transition-colors hover:bg-dark-900 sm:p-4"
                aria-label={`Show previous: ${prevItem.alt}`}
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Previous
                </p>
                <div className="relative h-28 w-full overflow-hidden border border-copper-base/15 sm:h-36">
                  <Image
                    src={prevItem.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 480px"
                    className="object-contain p-2 opacity-80 transition-opacity group-hover:opacity-100 sm:p-3"
                  />
                </div>
              </button>
              <button
                type="button"
                onClick={goNext}
                className="group relative bg-dark-950 p-3 text-left transition-colors hover:bg-dark-900 sm:p-4"
                aria-label={`Show next: ${nextItem.alt}`}
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Next
                </p>
                <div className="relative h-28 w-full overflow-hidden border border-copper-base/15 sm:h-36">
                  <Image
                    src={nextItem.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 480px"
                    className="object-contain p-2 opacity-80 transition-opacity group-hover:opacity-100 sm:p-3"
                  />
                </div>
              </button>
            </div>
          ) : null}
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
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                {activeIndex + 1} / {count}
              </span>
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
