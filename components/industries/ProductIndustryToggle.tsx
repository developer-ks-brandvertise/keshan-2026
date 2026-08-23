"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { productIndustryMapSlugs } from "@/lib/i18n-keys";

export function ProductIndustryToggle() {
  const t = useTranslations("industriesPage");
  const tc = useTranslations();
  const tp = useTranslations("productsPage");
  const [activeTab, setActiveTab] = useState<"copper" | "brass">("copper");

  const rows = useMemo(
    () =>
      activeTab === "copper"
        ? productIndustryMapSlugs.copper
        : productIndustryMapSlugs.brass,
    [activeTab],
  );

  return (
    <section className="mt-16">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-h3">{t("productWiseTitle")}</h2>
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
            {tp("copperLabel")}
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
            {tp("brassLabel")}
          </button>
        </div>
      </div>

      <div className="overflow-hidden border border-copper-base/25">
        {rows.map((slug) => (
          <div
            key={slug}
            className="grid gap-3 border-b border-dark-100/10 px-4 py-4 last:border-b-0 sm:grid-cols-[260px_1fr]"
          >
            <p className="text-sm font-semibold text-text-primary">
              {tc(`catalog.${slug}.name`)}
            </p>
            <p className="text-body-sm text-text-secondary">{t(`map.${slug}`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
