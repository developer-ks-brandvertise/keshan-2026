"use client";

import { useEffect, useRef } from "react";

export function CopperMarketChart() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget h-full w-full";
    host.appendChild(widget);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";
    script.text = JSON.stringify({
      autosize: true,
      symbol: "COMEX:HG1!",
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(10, 10, 10, 1)",
      gridColor: "rgba(202, 94, 46, 0.12)",
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });
    host.appendChild(script);

    return () => {
      host.replaceChildren();
    };
  }, []);

  return (
    <div className="overflow-hidden border border-copper-base/25 bg-dark-950">
      <div className="flex items-center justify-between border-b border-copper-base/20 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
            Copper chart
          </p>
          <p className="mt-1 text-sm text-text-primary">COMEX High Grade Copper</p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Daily</p>
      </div>
      <div className="h-[360px] w-full sm:h-[420px]">
        <div ref={hostRef} className="tradingview-widget-container h-full w-full" />
      </div>
    </div>
  );
}
