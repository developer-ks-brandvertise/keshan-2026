"use client";

import { useEffect, useRef, useState } from "react";
import {
  AreaSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";
import { ArrowUpRight } from "lucide-react";

type ChartPoint = { time: string; value: number };
type ChartMode = "lme" | "mcx";

type ChartResponse = {
  ok: boolean;
  asOf: string;
  baseUsdPerMt: number | null;
  usdInr: number | null;
  series: {
    lme: ChartPoint[];
    mcx: ChartPoint[];
  };
};

function toChartData(points: ChartPoint[]) {
  return points.map((p) => ({
    time: p.time as unknown as UTCTimestamp,
    value: p.value,
  }));
}

export function CopperPriceChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const [mode, setMode] = useState<ChartMode>("lme");
  const [data, setData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/market-chart", { cache: "no-store" });
        const json = (await res.json()) as ChartResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const id = window.setInterval(load, 120_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(232, 222, 210, 0.55)",
        fontFamily: "inherit",
        fontSize: 11,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "rgba(202, 94, 46, 0.08)" },
        horzLines: { color: "rgba(202, 94, 46, 0.08)" },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.12, bottom: 0.08 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: false,
      },
      crosshair: {
        vertLine: {
          color: "rgba(255, 218, 154, 0.35)",
          labelBackgroundColor: "#ca5e2e",
        },
        horzLine: {
          color: "rgba(255, 218, 154, 0.35)",
          labelBackgroundColor: "#ca5e2e",
        },
      },
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: "#ca5e2e",
      topColor: "rgba(202, 94, 46, 0.45)",
      bottomColor: "rgba(202, 94, 46, 0.02)",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const onResize = () => {
      chart.applyOptions({ width: el.clientWidth, height: el.clientHeight });
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    const series = seriesRef.current;
    const chart = chartRef.current;
    if (!series || !chart || !data) return;

    const points = mode === "lme" ? data.series.lme : data.series.mcx;
    if (!points.length) return;

    series.applyOptions({
      lineColor: mode === "lme" ? "#ca5e2e" : "#ffda9a",
      topColor:
        mode === "lme" ? "rgba(202, 94, 46, 0.45)" : "rgba(255, 218, 154, 0.35)",
      bottomColor:
        mode === "lme" ? "rgba(202, 94, 46, 0.02)" : "rgba(255, 218, 154, 0.02)",
    });
    series.setData(toChartData(points));
    chart.timeScale().fitContent();
  }, [data, mode]);

  const latest =
    mode === "lme"
      ? data?.series.lme.at(-1)?.value
      : data?.series.mcx.at(-1)?.value;
  const unit = mode === "lme" ? "USD / MT" : "INR / KG";
  const external =
    mode === "lme"
      ? {
          href: "https://www.lme.com/metals/non-ferrous/lme-copper#Overview",
          label: "View on LME",
        }
      : {
          href: "https://www.moneycontrol.com/commodity/mcx-copper-price/?type=futures&exp=2026-08-31",
          label: "View on Moneycontrol",
        };

  return (
    <div className="overflow-hidden border border-copper-base/25 bg-dark-950">
      <div className="flex flex-col gap-3 border-b border-copper-base/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
            Copper price chart
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {loading
              ? "Loading series…"
              : latest != null
                ? `${mode === "lme" ? "LME" : "MCX"} · ${latest.toLocaleString(
                    mode === "lme" ? "en-US" : "en-IN",
                    {
                      maximumFractionDigits: mode === "lme" ? 0 : 2,
                    },
                  )} ${unit}`
                : "90-day copper reference"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["lme", "mcx"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                mode === id
                  ? "bg-copper-gradient text-dark-900"
                  : "border border-copper-base/30 text-text-muted hover:text-copper-base"
              }`}
            >
              {id === "lme" ? "LME" : "MCX"}
            </button>
          ))}
          <a
            href={external.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-copper-base"
          >
            {external.label}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div ref={containerRef} className="h-[320px] w-full sm:h-[380px]" />
    </div>
  );
}
