"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type QuoteCard = {
  id: "lme" | "mcx" | "usdinr";
  label: string;
  display: string;
  unit: string;
  changePct: number | null;
  source: string;
  note: string;
};

type MarketRatesResponse = {
  ok: boolean;
  asOf: string;
  cards: QuoteCard[];
  message?: string;
};

const EXTERNAL_LINKS: Partial<
  Record<QuoteCard["id"], { href: string; label: string }>
> = {
  lme: {
    href: "https://www.lme.com/metals/non-ferrous/lme-copper#Overview",
    label: "View on LME",
  },
  mcx: {
    href: "https://www.moneycontrol.com/commodity/mcx-copper-price/?type=futures&exp=2026-08-31",
    label: "View on Moneycontrol",
  },
};

function ChangeBadge({ changePct }: { changePct: number | null }) {
  if (changePct === null || Number.isNaN(changePct)) {
    return <span className="text-[11px] text-text-muted">—</span>;
  }
  const up = changePct >= 0;
  return (
    <span
      className={`text-[11px] font-semibold tabular-nums ${
        up ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {up ? "▲" : "▼"} {Math.abs(changePct).toFixed(2)}%
    </span>
  );
}

export function MarketRateCards({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [data, setData] = useState<MarketRatesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/market-rates", { cache: "no-store" });
        const json = (await res.json()) as MarketRatesResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          setData({
            ok: false,
            asOf: new Date().toISOString(),
            cards: [],
            message: "Could not load market rates.",
          });
        }
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

  const placeholders: QuoteCard[] = [
    {
      id: "lme",
      label: "LME Copper",
      display: "—",
      unit: "/ MT",
      changePct: null,
      source: "LME 3M",
      note: "Rzzro",
    },
    {
      id: "mcx",
      label: "MCX Copper",
      display: "—",
      unit: "/ KG",
      changePct: null,
      source: "MCX",
      note: "Reference",
    },
    {
      id: "usdinr",
      label: "USD / INR",
      display: "—",
      unit: "",
      changePct: null,
      source: "FX Rate",
      note: "FX",
    },
  ];

  const cards =
    data?.cards && data.cards.length > 0
      ? placeholders.map((p) => data.cards.find((c) => c.id === p.id) ?? p)
      : placeholders;

  return (
    <div className="overflow-hidden border border-copper-base/25 bg-dark-950">
      <div className="flex items-center justify-between border-b border-copper-base/20 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
            Live market desk
          </p>
          {!compact ? (
            <p className="mt-1 text-sm text-text-secondary">
              LME · MCX · USD/INR
            </p>
          ) : null}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-400">
          {loading ? "Loading" : "Live"}
        </span>
      </div>

      <div
        className={`grid divide-y divide-copper-base/15 sm:divide-y-0 ${
          compact
            ? "sm:grid-cols-1 sm:divide-y sm:divide-copper-base/15"
            : "sm:grid-cols-3 sm:divide-x sm:divide-copper-base/15"
        }`}
      >
        {cards.map((card) => {
          const external = EXTERNAL_LINKS[card.id];
          return (
            <div key={card.id} className="flex flex-col px-4 py-5 sm:px-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                {card.label}
              </p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <p className="font-heading text-2xl tracking-wide text-text-primary sm:text-[1.65rem]">
                  {card.display}
                </p>
                {card.unit ? (
                  <span className="text-[11px] uppercase tracking-[0.12em] text-text-muted">
                    {card.unit}
                  </span>
                ) : null}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <ChangeBadge changePct={card.changePct} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper-base">
                  {card.source}
                </span>
              </div>
              {external ? (
                <a
                  href={external.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-copper-base"
                >
                  {external.label}
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
                </a>
              ) : null}
            </div>
          );
        })}
      </div>

      {compact ? (
        <p className="border-t border-copper-base/15 px-4 py-3 text-[10px] leading-relaxed text-text-muted">
          For current live market data, view the original source on{" "}
          <a
            href="https://www.lme.com/metals/non-ferrous/lme-copper#Overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-copper-base transition-colors hover:text-copper-light"
          >
            LME
          </a>{" "}
          /{" "}
          <a
            href="https://www.moneycontrol.com/commodity/mcx-copper-price/?type=futures&exp=2026-08-31"
            target="_blank"
            rel="noopener noreferrer"
            className="text-copper-base transition-colors hover:text-copper-light"
          >
            Moneycontrol
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
