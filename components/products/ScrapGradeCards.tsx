"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { ScrapGradeItem } from "@/lib/products";

type ScrapGradeCardsProps = {
  items: ScrapGradeItem[];
};

export function ScrapGradeCards({ items }: ScrapGradeCardsProps) {
  const [active, setActive] = useState<ScrapGradeItem | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => {
          const isLong = item.description.length > 220;
          const preview = isLong
            ? `${item.description.slice(0, 220).trimEnd()}...`
            : item.description;

          return (
            <article
              key={item.grade}
              className="overflow-hidden border border-copper-base/25 bg-dark-950"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.grade}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <span className="absolute left-3 top-3 border border-copper-base/50 bg-dark-950/85 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-copper-base">
                  {item.grade}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
                <p className="mt-2 text-body-sm text-text-secondary">{preview}</p>
                {isLong ? (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-copper-base"
                  >
                    Read more
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-dark-950/92 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-2xl overflow-auto border border-copper-base/30 bg-dark-900 p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center border border-copper-base/40 text-copper-base"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-base">
              {active.grade}
            </p>
            <h4 className="mt-2 text-xl text-text-primary">{active.title}</h4>
            <p className="mt-4 whitespace-pre-line text-body text-text-secondary">
              {active.description}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
