import { NextResponse } from "next/server";

type MetalsApiResponse = {
  success?: boolean;
  timestamp?: number;
  date?: string;
  rates?: Record<string, number>;
  error?: {
    code?: number;
    type?: string;
    info?: string;
  };
};

const OUNCE_TO_METRIC_TON = 32150.746568627;

function toUsdPerMetricTon(valuePerOunce?: number) {
  if (typeof valuePerOunce !== "number" || Number.isNaN(valuePerOunce)) {
    return null;
  }
  return valuePerOunce * OUNCE_TO_METRIC_TON;
}

function formatUsd(value: number | null) {
  if (value === null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export async function GET() {
  const accessKey = process.env.METALS_API_KEY;

  if (!accessKey) {
    return NextResponse.json(
      {
        ok: false,
        reason: "missing_api_key",
        message: "Add METALS_API_KEY to enable live LME copper data.",
      },
      { status: 200 },
    );
  }

  try {
    const url = new URL("https://www.metals-api.com/api/latest");
    url.searchParams.set("access_key", accessKey);
    url.searchParams.set("base", "USD");
    // LME-XCU = settlement; XCU3M = 3-month contract
    url.searchParams.set("symbols", "LME-XCU,XCU3M");

    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          reason: "provider_http_error",
          message: `Metals API returned ${response.status}.`,
        },
        { status: 200 },
      );
    }

    const data = (await response.json()) as MetalsApiResponse;
    if (!data.success || !data.rates) {
      return NextResponse.json(
        {
          ok: false,
          reason: "provider_payload_error",
          message: data.error?.info ?? "Metals API returned an invalid payload.",
        },
        { status: 200 },
      );
    }

    const settlementPerTon = toUsdPerMetricTon(data.rates["LME-XCU"]);
    const threeMonthPerTon = toUsdPerMetricTon(data.rates["XCU3M"]);
    const lastUpdatedIso = data.timestamp
      ? new Date(data.timestamp * 1000).toISOString()
      : new Date().toISOString();

    return NextResponse.json(
      {
        ok: true,
        provider: "metals-api",
        unit: "USD/MT",
        settlementPerTon,
        settlementDisplay: formatUsd(settlementPerTon),
        threeMonthPerTon,
        threeMonthDisplay: formatUsd(threeMonthPerTon),
        asOf: lastUpdatedIso,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        reason: "network_error",
        message: "Could not fetch LME copper data right now.",
      },
      { status: 200 },
    );
  }
}
