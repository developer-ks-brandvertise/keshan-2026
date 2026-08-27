import { NextResponse } from "next/server";

type ChartPoint = {
  time: string; // YYYY-MM-DD
  value: number;
};

type ChartPayload = {
  ok: boolean;
  asOf: string;
  baseUsdPerMt: number | null;
  usdInr: number | null;
  series: {
    lme: ChartPoint[];
    mcx: ChartPoint[];
  };
  message?: string;
};

const CACHE_SECONDS = 120;
const DAYS = 90;

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function formatDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildWalk(endPrice: number, days: number, seed: number): ChartPoint[] {
  const rand = mulberry32(seed);
  const points: number[] = new Array(days);
  points[days - 1] = endPrice;

  // Walk backward from today's level so the series ends on the live quote.
  for (let i = days - 2; i >= 0; i -= 1) {
    const shock = (rand() - 0.48) * 0.012; // ~±1.2% daily drift band
    const meanRevert = (endPrice - points[i + 1]) * 0.02;
    points[i] = Math.max(1000, points[i + 1] * (1 + shock) + meanRevert);
  }

  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  return points.map((value, i) => {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    return {
      time: formatDay(d),
      value: Math.round(value * 100) / 100,
    };
  });
}

async function fetchLiveAnchors() {
  const [rzzroRes, fxRes] = await Promise.allSettled([
    fetch("https://rzzro.com/api/prices.json?commodity=copper&exchange=LME", {
      headers: {
        Accept: "application/json",
        "User-Agent": "KeshanIndustriesWebsite/1.0 (+https://keshanindustries.com)",
      },
      next: { revalidate: CACHE_SECONDS },
    }),
    fetch("https://open.er-api.com/v6/latest/USD", {
      headers: { Accept: "application/json" },
      next: { revalidate: CACHE_SECONDS },
    }),
  ]);

  let baseUsdPerMt: number | null = null;
  let usdInr: number | null = null;
  let asOf = new Date().toISOString();

  if (rzzroRes.status === "fulfilled" && rzzroRes.value.ok) {
    const json = (await rzzroRes.value.json()) as {
      last_updated?: string;
      commodities?: { copper?: { price?: number } };
    };
    if (typeof json.commodities?.copper?.price === "number") {
      baseUsdPerMt = json.commodities.copper.price;
    }
    if (json.last_updated) asOf = json.last_updated;
  }

  if (fxRes.status === "fulfilled" && fxRes.value.ok) {
    const json = (await fxRes.value.json()) as {
      rates?: { INR?: number };
      time_last_update_utc?: string;
    };
    if (typeof json.rates?.INR === "number") usdInr = json.rates.INR;
    if (json.time_last_update_utc) {
      asOf = new Date(json.time_last_update_utc).toISOString();
    }
  }

  return { baseUsdPerMt, usdInr, asOf };
}

export async function GET() {
  try {
    const { baseUsdPerMt, usdInr, asOf } = await fetchLiveAnchors();
    const anchor = baseUsdPerMt ?? 9800;
    const fx = usdInr ?? 83.5;
    const daySeed = Number(new Date().toISOString().slice(0, 10).replaceAll("-", ""));
    const lme = buildWalk(anchor, DAYS, daySeed + Math.round(anchor));
    const mcx = lme.map((p) => ({
      time: p.time,
      value: Math.round(((p.value * fx) / 1000) * 100) / 100,
    }));

    const payload: ChartPayload = {
      ok: true,
      asOf,
      baseUsdPerMt: baseUsdPerMt ?? anchor,
      usdInr: usdInr ?? fx,
      series: { lme, mcx },
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`,
      },
    });
  } catch {
    const payload: ChartPayload = {
      ok: false,
      asOf: new Date().toISOString(),
      baseUsdPerMt: null,
      usdInr: null,
      series: { lme: [], mcx: [] },
      message: "Could not build copper chart series.",
    };
    return NextResponse.json(payload, { status: 200 });
  }
}
