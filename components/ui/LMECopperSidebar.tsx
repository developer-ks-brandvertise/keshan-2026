"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pin, PinOff } from "lucide-react";

type LmeApiResponse = {
  ok: boolean;
  message?: string;
  settlementDisplay?: string | null;
  threeMonthDisplay?: string | null;
  asOf?: string;
};

export function LMECopperSidebar() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<LmeApiResponse | null>(null);

  const isOpen = isPinned || isHovered;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/lme-copper", { cache: "no-store" });
        const data = (await res.json()) as LmeApiResponse;
        if (cancelled) return;

        if (!data.ok) {
          setError(data.message ?? "Live copper data unavailable.");
          setApiData(data);
        } else {
          setError(null);
          setApiData(data);
        }
      } catch {
        if (!cancelled) setError("Could not load live copper data.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    const id = window.setInterval(load, 120000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const lmeItems = useMemo(
    () => [
      {
        label: "Cash Settlement",
        value: apiData?.settlementDisplay
          ? `${apiData.settlementDisplay} / MT`
          : "—",
      },
      {
        label: "3-Month",
        value: apiData?.threeMonthDisplay
          ? `${apiData.threeMonthDisplay} / MT`
          : "—",
      },
      {
        label: "Status",
        value: isLoading ? "Loading..." : error ? "Unavailable" : "Live",
      },
    ],
    [apiData?.settlementDisplay, apiData?.threeMonthDisplay, error, isLoading],
  );

  return (
    <aside
      className="pointer-events-none fixed right-0 top-1/2 z-40 -translate-y-1/2"
      aria-label="LME Copper sidebar"
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
          aria-label={isPinned ? "Unpin LME Copper panel" : "Pin LME Copper panel"}
        >
          {isOpen ? (
            <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          ) : (
            <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
          )}
          <span className="font-heading text-[10px] uppercase tracking-[0.22em] [writing-mode:vertical-rl]">
            LME Copper
          </span>
        </button>

        <div className="w-72 rounded-l-none rounded-r-xl border border-copper-base/35 bg-dark-950/95 p-4 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-heading text-xs uppercase tracking-[0.18em] text-copper-base">
              LME Copper
            </p>
            <button
              type="button"
              onClick={() => setIsPinned((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-copper-base"
            >
              {isPinned ? (
                <>
                  <PinOff className="h-3.5 w-3.5" />
                  Unpin
                </>
              ) : (
                <>
                  <Pin className="h-3.5 w-3.5" />
                  Pin
                </>
              )}
            </button>
          </div>

          <div className="space-y-2">
            {lmeItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-md border border-copper-base/15 bg-dark-900/80 px-3 py-2"
              >
                <span className="text-xs text-text-muted">{item.label}</span>
                <span className="font-heading text-xs text-text-primary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[10px] text-text-muted">
            {error
              ? error
              : apiData?.asOf
                ? `As of ${new Date(apiData.asOf).toLocaleString()}`
                : "Indicative LME snapshot for quick reference."}
          </p>
        </div>
      </div>
    </aside>
  );
}
