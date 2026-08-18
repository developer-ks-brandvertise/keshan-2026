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
};

export function CertificatesGallery({ items }: CertificatesGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const titleId = useId();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = items[activeIndex];

  const close = useCallback(() => setLightboxOpen(false), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % items.length),
    [items.length],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(next, 4500);
    return () => window.clearInterval(timer);
  }, [isPlaying, next]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, close, next, prev]);

  return (
    <>
      <AnimatedSection className="mt-10">
        <div className="overflow-hidden border border-copper-base/25 bg-dark-900">
          <div className="flex items-center justify-between border-b border-dark-100/10 px-4 py-3">
            <span className="font-heading text-xs tracking-[0.18em] text-copper-base">
              CERTIFICATE {String(activeIndex + 1).padStart(2, "0")}
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
                aria-label="Previous certificate"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-9 w-9 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label="Next certificate"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="relative block h-[72vh] w-full bg-dark-950"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain p-4 sm:p-6"
              priority
            />
          </button>
          <div className="grid grid-cols-4 gap-2 border-t border-dark-100/10 p-3 sm:grid-cols-7">
            {items.map((cert, index) => (
              <button
                key={cert.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-[3/4] overflow-hidden border ${
                  index === activeIndex ? "border-copper-base" : "border-dark-100/20"
                }`}
                aria-label={`View certificate ${index + 1}`}
              >
                <Image src={cert.src} alt={cert.alt} fill className="object-contain bg-dark-950 p-1" />
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {lightboxOpen ? (
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
            aria-label="Close certificate preview"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          <div
            className="relative flex max-h-[88vh] w-full max-w-4xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-base">
              Certificate {String(activeIndex + 1).padStart(2, "0")}
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
                onClick={prev}
                className="inline-flex h-8 w-8 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-8 w-8 items-center justify-center border border-copper-base/30 text-copper-base"
                aria-label="Next certificate"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              Esc to close · arrows to browse
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
