"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export type CertificateItem = {
  src: string;
  alt: string;
};

type CertificatesGalleryProps = {
  items: CertificateItem[];
};

export function CertificatesGallery({ items }: CertificatesGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const titleId = useId();
  const active = activeIndex === null ? null : items[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? i : (i + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? i : (i - 1 + items.length) % items.length,
        );
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, items.length]);

  return (
    <>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((cert, index) => (
          <AnimatedSection key={cert.src} delay={index * 0.05}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group block w-full border border-dark-100/10 bg-dark-900 text-left transition-colors hover:border-copper-base/50"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-dark-950">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02] sm:p-4"
                />
              </div>
              <div className="flex items-center justify-between border-t border-dark-100/10 px-4 py-3">
                <span className="font-heading text-xs tracking-[0.18em] text-copper-base">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted transition-colors group-hover:text-copper-base">
                  View full
                </span>
              </div>
            </button>
          </AnimatedSection>
        ))}
      </div>

      {active ? (
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
            <p
              id={titleId}
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-base"
            >
              Certificate{" "}
              {activeIndex !== null
                ? String(activeIndex + 1).padStart(2, "0")
                : ""}
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
            <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              Esc to close · arrows to browse
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
