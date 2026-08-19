"use client";

import { useEffect, useState } from "react";

type LmeApiResponse = {
  ok: boolean;
  message?: string;
  settlementDisplay?: string | null;
  threeMonthDisplay?: string | null;
  settlementPerTon?: number | null;
  threeMonthPerTon?: number | null;
  asOf?: string;
};

type RateRow = {
  name: string;
  last: string;
  note: string;
  tone: "up" | "down" | "flat";
};

export function LiveRatesPanel() {
  const [rows, setRows] = useState<RateRow[]>([
    { name: "LME Copper Cash", last: "—", note: "Loading", tone: "flat" },
    { name: "LME Copper 3M", last: "—", note: "Loading", tone: "flat" },
  ]);
  const [asOf, setAsOf] = useState<string | null>(null);
  const [status, setStatus] = useState("Connecting…");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/lme-copper", { cache: "no-store" });
        const data = (await res.json()) as LmeApiResponse;
        if (cancelled) return;

        if (!data.ok) {
          setStatus(data.message ?? "Live feed unavailable");
          setRows([
            { name: "LME Copper Cash", last: "—", note: "Indicative", tone: "flat" },
            { name: "LME Copper 3M", last: "—", note: "Indicative", tone: "flat" },
            { name: "Brass mill premium", last: "On enquiry", note: "Alloy-linked", tone: "flat" },
          ]);
          return;
        }

        const cash = data.settlementDisplay ? `${data.settlementDisplay}` : "—";
        const threeM = data.threeMonthDisplay ? `${data.threeMonthDisplay}` : "—";
        const spread =
          typeof data.settlementPerTon === "number" &&
          typeof data.threeMonthPerTon === "number"
            ? data.threeMonthPerTon - data.settlementPerTon
            : null;

        setAsOf(data.asOf ?? null);
        setStatus("Live");
        setRows([
          {
            name: "LME Copper Cash",
            last: cash === "—" ? "—" : `${cash} / MT`,
            note: "Settlement",
            tone: "flat",
          },
          {
            name: "LME Copper 3M",
            last: threeM === "—" ? "—" : `${threeM} / MT`,
            note: spread === null ? "Forward" : spread >= 0 ? "Contango" : "Backwardation",
            tone: spread === null ? "flat" : spread >= 0 ? "up" : "down",
          },
          {
            name: "Brass mill premium",
            last: "On enquiry",
            note: "Vs copper + alloy",
            tone: "flat",
          },
        ]);
      } catch {
        if (!cancelled) {
          setStatus("Unavailable");
          setRows([
            { name: "LME Copper Cash", last: "—", note: "Unavailable", tone: "flat" },
            { name: "LME Copper 3M", last: "—", note: "Unavailable", tone: "flat" },
            { name: "Brass mill premium", last: "On enquiry", note: "Alloy-linked", tone: "flat" },
          ]);
        }
      }
    };

    void load();
    const id = window.setInterval(load, 120000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <aside className="border border-copper-base/25 bg-dark-950">
      <div className="flex items-center justify-between border-b border-copper-base/20 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
          Live rates
        </p>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
            status === "Live" ? "text-emerald-400" : "text-text-muted"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-copper-base/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
        <span>Name</span>
        <span className="text-right">Last</span>
        <span className="text-right">Note</span>
      </div>
      <ul>
        {rows.map((row) => (
          <li
            key={row.name}
            className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-3 border-b border-dark-100/10 px-4 py-3 last:border-b-0"
          >
            <span className="text-sm text-text-primary">{row.name}</span>
            <span
              className={`text-right font-heading text-sm ${
                row.tone === "up"
                  ? "text-emerald-400"
                  : row.tone === "down"
                    ? "text-red-400"
                    : "text-text-primary"
              }`}
            >
              {row.last}
            </span>
            <span className="min-w-[5.5rem] text-right text-[11px] text-text-muted">
              {row.note}
            </span>
          </li>
        ))}
      </ul>
      <p className="px-4 py-3 text-[10px] leading-relaxed text-text-muted">
        {asOf
          ? `As of ${new Date(asOf).toLocaleString()}. Indicative only — not an offer.`
          : "Indicative LME snapshot for buyers. Brass is quoted against copper plus alloy premium."}
      </p>
    </aside>
  );
}
