import { NextResponse } from "next/server";

type QuoteCard = {
  id: "lme" | "mcx" | "usdinr";
  label: string;
  display: string;
  unit: string;
  changePct: number | null;
  source: string;
  note: string;
};

type MarketRatesPayload = {
  ok: boolean;
  asOf: string;
  cards: QuoteCard[];
  reason?: string;
  message?: string;
};

type RzzroResponse = {
  commodities?: {
    copper?: {
      price?: number;
      change_pct?: number;
      exchange?: string;
      contract?: string;
    };
  };
  last_updated?: string;
  metadata?: {
    attribution?: string;
  };
};

type FxResponse = {
  result?: string;
  rates?: Record<string, number>;
  time_last_update_utc?: string;
};

const CACHE_SECONDS = 120;

function formatUsdPerMt(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatInrPerKg(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatFx(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

async function fetchRzzroCopper() {
  const response = await fetch(
    "https://rzzro.com/api/prices.json?commodity=copper&exchange=LME",
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "KeshanIndustriesWebsite/1.0 (+https://keshanindustries.com)",
      },
      next: { revalidate: CACHE_SECONDS },
    },
  );
  if (!response.ok) throw new Error(`Rzzro HTTP ${response.status}`);
  return (await response.json()) as RzzroResponse;
}

async function fetchUsdInr() {
  const response = await fetch("https://open.er-api.com/v6/latest/USD", {
    headers: { Accept: "application/json" },
    next: { revalidate: CACHE_SECONDS },
  });
  if (!response.ok) throw new Error(`FX HTTP ${response.status}`);
  return (await response.json()) as FxResponse;
}

export async function GET() {
  try {
    const [rzzroResult, fxResult] = await Promise.allSettled([
      fetchRzzroCopper(),
      fetchUsdInr(),
    ]);

    const cards: QuoteCard[] = [];
    let asOf = new Date().toISOString();

    const copper =
      rzzroResult.status === "fulfilled"
        ? rzzroResult.value.commodities?.copper
        : undefined;
    const fx =
      fxResult.status === "fulfilled" ? fxResult.value.rates?.INR : undefined;

    if (rzzroResult.status === "fulfilled" && rzzroResult.value.last_updated) {
      asOf = rzzroResult.value.last_updated;
    }

    if (typeof copper?.price === "number") {
      cards.push({
        id: "lme",
        label: "LME Copper",
        display: formatUsdPerMt(copper.price),
        unit: "/ MT",
        changePct:
          typeof copper.change_pct === "number" ? copper.change_pct : null,
        source: copper.contract ? `LME ${copper.contract}` : "LME 3M",
        note: "Rzzro",
      });
    }

    if (typeof copper?.price === "number" && typeof fx === "number") {
      // MCX-style reference: LME USD/MT × USDINR ÷ 1000 → INR/kg
      const inrPerKg = (copper.price * fx) / 1000;
      cards.push({
        id: "mcx",
        label: "MCX Copper",
        display: formatInrPerKg(inrPerKg),
        unit: "/ KG",
        changePct:
          typeof copper.change_pct === "number" ? copper.change_pct : null,
        source: "MCX",
        note: "Reference",
      });
    }

    if (typeof fx === "number") {
      cards.push({
        id: "usdinr",
        label: "USD / INR",
        display: formatFx(fx),
        unit: "",
        changePct: null,
        source: "FX Rate",
        note: "open.er-api.com",
      });
      if (fxResult.status === "fulfilled" && fxResult.value.time_last_update_utc) {
        asOf = new Date(fxResult.value.time_last_update_utc).toISOString();
      }
    }

    if (cards.length === 0) {
      const payload: MarketRatesPayload = {
        ok: false,
        asOf,
        cards: [],
        reason: "upstream_unavailable",
        message: "Market feeds are temporarily unavailable.",
      };
      return NextResponse.json(payload, {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`,
        },
      });
    }

    const payload: MarketRatesPayload = {
      ok: true,
      asOf,
      cards,
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`,
      },
    });
  } catch {
    const payload: MarketRatesPayload = {
      ok: false,
      asOf: new Date().toISOString(),
      cards: [],
      reason: "network_error",
      message: "Could not fetch market rates right now.",
    };
    return NextResponse.json(payload, { status: 200 });
  }
}
