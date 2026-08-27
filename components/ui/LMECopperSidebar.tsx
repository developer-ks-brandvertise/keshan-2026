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
        className="pointer-events-auto relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={() => setIsPinned((v) => !v)}
          className="relative z-10 flex w-10 flex-col items-center justify-center gap-2 rounded-l-lg border border-border bg-card py-4 text-copper-base shadow-[-4px_0_18px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors hover:text-copper-light"
          aria-expanded={isOpen}
          aria-label={isPinned ? t("unpinMarket") : t("pinMarket")}
        >
          {isOpen ? (
            <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
          )}
          <span className="font-heading text-[10px] uppercase tracking-[0.22em] whitespace-nowrap [writing-mode:vertical-rl]">
            {t("copperDesk")}
          </span>
        </button>

        <div
          className={`absolute right-full top-1/2 z-0 w-[20rem] -translate-y-1/2 border border-r-0 border-border bg-card p-2.5 shadow-[-8px_0_28px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 sm:w-[21rem] ${
            isOpen
              ? "visible translate-x-0 opacity-100"
              : "invisible translate-x-2 opacity-0 pointer-events-none"
          }`}
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-copper-base">
              LME · MCX · USD/INR
            </p>
            <button
              type="button"
              onClick={() => setIsPinned((v) => !v)}
              className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-copper-base"
            >
              {isPinned ? (
                <>
                  <PinOff className="h-3 w-3" />
                  {t("unpin")}
                </>
              ) : (
                <>
                  <Pin className="h-3 w-3" />
                  {t("pin")}
                </>
              )}
            </button>
          </div>

          <MarketRateCards compact />
        </div>
      </div>
    </aside>
  );
}
