"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Pin, PinOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { MarketRateCards } from "@/components/knowledge/MarketRateCards";

export function LMECopperSidebar() {
  const t = useTranslations("common");
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = isPinned || isHovered;

  return (
    <aside
      className="pointer-events-none fixed right-0 top-1/2 z-40 -translate-y-1/2"
      aria-label={t("marketSidebar")}
    >
      <div
        className={`pointer-events-auto flex items-stretch transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-[calc(100%-44px)]"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={() => setIsPinned((v) => !v)}
          className="group flex w-11 flex-col items-center justify-center gap-2 rounded-l-lg border border-r-0 border-copper-base/35 bg-dark-950/95 px-1 py-3 text-copper-base shadow-[0_0_22px_rgba(184,115,51,0.28)] backdrop-blur-md transition-colors hover:text-copper-bright"
          aria-expanded={isOpen}
          aria-label={isPinned ? t("unpinMarket") : t("pinMarket")}
        >
          {isOpen ? (
            <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          ) : (
            <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
          )}
          <span className="font-heading text-[10px] uppercase tracking-[0.22em] [writing-mode:vertical-rl]">
            {t("copperDesk")}
          </span>
        </button>

        <div className="w-[22rem] rounded-l-none rounded-r-xl border border-copper-base/35 bg-dark-950/95 p-3 backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-copper-base">
              LME · MCX · USD/INR
            </p>
            <button
              type="button"
              onClick={() => setIsPinned((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-copper-base"
            >
              {isPinned ? (
                <>
                  <PinOff className="h-3.5 w-3.5" />
                  {t("unpin")}
                </>
              ) : (
                <>
                  <Pin className="h-3.5 w-3.5" />
                  {t("pin")}
                </>
              )}
            </button>
          </div>

          <MarketRateCards compact />

          <p className="mt-3 px-1 text-[10px] text-text-muted">
            {t("liveQuotes")}
          </p>
        </div>
      </div>
    </aside>
  );
}
