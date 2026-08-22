"use client";

import { useState } from "react";
import { copperChartSymbols, tradingViewChartSrc } from "@/lib/market-symbols";

export function CopperMarketChart() {
  const [activeId, setActiveId] = useState(copperChartSymbols[0].id);
  const active =
    copperChartSymbols.find((item) => item.id === activeId) ?? copperChartSymbols[0];

  return (
    <div className="overflow-hidden border border-copper-base/25 bg-dark-950">
      <div className="flex flex-col gap-3 border-b border-copper-base/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
            Copper chart
          </p>
          <p className="mt-1 text-sm text-text-primary">{active.note}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {copperChartSymbols.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                item.id === activeId
                  ? "bg-copper-gradient text-dark-900"
                  : "border border-copper-base/30 text-text-muted hover:text-copper-base"
              }`}
            >
              {item.label} · {item.currency}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[360px] w-full sm:h-[420px]">
        <iframe
          key={active.symbol}
          title={`${active.label} copper chart`}
          src={tradingViewChartSrc(active.symbol)}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
