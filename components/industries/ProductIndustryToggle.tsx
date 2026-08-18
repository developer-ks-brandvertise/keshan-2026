"use client";

import { useMemo, useState } from "react";

const copperProductIndustries = [
  ["Copper Ingots", "Electronics & PCB, Construction, Automotive & Industrial"],
  ["Copper Busbars", "Electrical & Power, Switchgear & Panels, Renewable Energy, Rail"],
  ["Copper Strips", "Switchgear & Panels, Electronics & PCB, Rail"],
  ["Copper Sheet, Plates & Circles", "Construction, Defense & Aerospace, Heat Exchangers"],
  ["Copper Upcast Rod", "Cable, Electrical & Power"],
  ["Bare Copper Wire", "Cable, Electrical & Power, Telecommunications"],
  ["Copper Rod", "Cable, Automotive & Industrial"],
  ["Copper Hex, Square, Round Rods", "Switchgear & Panels, Automotive & Industrial, Defense & Aerospace"],
  ["Enamel Copper Wire", "EV Charging, Electrical & Power, Automotive (motor windings)"],
  ["Paper Insulated Copper Conductors (PICC) Strips", "Rail, Power Transmission / Electrical & Power"],
  ["Copper Foils", "Electronics & PCB, Telecommunications"],
  ["Copper Bar 1kg & 5kg", "Foundries, Automotive & Industrial, Small-scale manufacturing"],
];

const brassProductIndustries = [
  ["Brass Ingots", "Foundries & Die-Casting, Plumbing & Sanitaryware, Automotive & Industrial"],
  ["Brass Sheets & Plates", "Architectural & Decorative Hardware, Construction"],
  ["Brass Strips", "Electrical & Electronics, Switchgear & Electrical Accessories, Telecommunications"],
  ["Brass Circles", "Plumbing & Sanitaryware, Foundries & Die-Casting"],
];

export function ProductIndustryToggle() {
  const [activeTab, setActiveTab] = useState<"copper" | "brass">("copper");

  const rows = useMemo(
    () => (activeTab === "copper" ? copperProductIndustries : brassProductIndustries),
    [activeTab],
  );

  return (
    <section className="mt-16">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-h3">Product-wise Industries</h2>
        <div className="inline-flex rounded-none border border-copper-base/30 bg-dark-950 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("copper")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] ${
              activeTab === "copper"
                ? "bg-copper-gradient text-dark-900"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Copper
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("brass")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] ${
              activeTab === "brass"
                ? "bg-copper-gradient text-dark-900"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Brass
          </button>
        </div>
      </div>

      <div className="overflow-hidden border border-copper-base/25">
        {rows.map(([product, sector]) => (
          <div
            key={product}
            className="grid gap-3 border-b border-dark-100/10 px-4 py-4 last:border-b-0 sm:grid-cols-[260px_1fr]"
          >
            <p className="text-sm font-semibold text-text-primary">{product}</p>
            <p className="text-body-sm text-text-secondary">{sector}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
