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
  const [offset, setOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const titleId = useId();
  const [reduceMotion, setReduceMotion] = useState(false);

  const visible = isDesktop ? 2 : 1;
  const maxOffset = Math.max(0, items.length - visible);
  const active = items[lightboxIndex] ?? items[0];

  const next = useCallback(() => {
    setOffset((i) => (i >= maxOffset ? 0 : i + 1));
  }, [maxOffset]);

  const prev = useCallback(() => {
    setOffset((i) => (i <= 0 ? maxOffset : i - 1));
  }, [maxOffset]);

  const close = useCallback(() => setLightboxOpen(false), []);
  const lightboxNext = useCallback(
    () => setLightboxIndex((i) => (i + 1) % items.length),
    [items.length],
  );
  const lightboxPrev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 768px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncDesktop = () => setIsDesktop(desktopMq.matches);
    const syncMotion = () => setReduceMotion(motionMq.matches);
    syncDesktop();
    syncMotion();
    desktopMq.addEventListener("change", syncDesktop);
    motionMq.addEventListener("change", syncMotion);
    return () => {
      desktopMq.removeEventListener("change", syncDesktop);
      motionMq.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    setOffset((i) => Math.min(i, maxOffset));
  }, [maxOffset]);

  useEffect(() => {
    if (!isPlaying || hovered || reduceMotion || items.length <= visible) return;
    const timer = window.setInterval(next, 4500);
    return () => window.clearInterval(timer);
  }, [hovered, isPlaying, items.length, next, reduceMotion, visible]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") lightboxNext();
      if (event.key === "ArrowLeft") lightboxPrev();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, close, lightboxNext, lightboxPrev]);

  return (
    <>
      <AnimatedSection className="mt-10">
        <div
          className="overflow-hidden border border-copper-base/25 bg-dark-900"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex items-center justify-between border-b border-dark-100/10 px-4 py-3">
            <span className="font-heading text-xs tracking-[0.18em] text-copper-base">
              {label}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-9 w-9 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label={`Previous ${label.toLowerCase()}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-9 w-9 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label={`Next ${label.toLowerCase()}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden bg-dark-950">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${offset * (100 / visible)}%)` }}
            >
              {items.map((cert, index) => (
                <button
                  key={cert.src}
                  type="button"
                  className="relative h-[70vh] shrink-0 border-r border-dark-100/10 last:border-r-0"
                  style={{ width: `${100 / visible}%` }}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={cert.src}
                    alt={cert.alt}
                    fill
                    sizes={isDesktop ? "50vw" : "100vw"}
                    className="object-contain p-4 sm:p-6"
                  />
                </button>
              ))}
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
                onClick={lightboxPrev}
                className="inline-flex h-8 w-8 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label={`Previous ${label.toLowerCase()}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={lightboxNext}
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
