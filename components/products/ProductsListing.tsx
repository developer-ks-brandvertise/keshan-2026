"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { products } from "@/lib/products";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";

const copperProducts = products.filter((p) => p.category === "copper");
const brassProducts = products.filter((p) => p.category === "brass");

export function ProductsListing() {
  const t = useTranslations("productsPage");
  const tc = useTranslations();
  const [activeTab, setActiveTab] = useState<"copper" | "brass">("copper");
  const activeProducts = activeTab === "copper" ? copperProducts : brassProducts;

  const tabs = [
    { id: "copper" as const, label: t("copper"), count: copperProducts.length },
    { id: "brass" as const, label: t("brass"), count: brassProducts.length },
  ];

  return (
    <section className="bg-dark-900 py-section px-gutter">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              {t("selectCategory")}
            </p>
            <div
              className="inline-flex rounded-none border border-copper-base/30 bg-dark-950 p-1.5"
              role="tablist"
              aria-label={t("selectCategory")}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 sm:px-8 ${
                      isActive
                        ? "bg-copper-gradient text-dark-900 shadow-[0_0_24px_rgba(232,166,89,0.25)]"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`border px-1.5 py-0.5 text-[10px] ${
                        isActive
                          ? "border-dark-900/30 text-dark-900"
                          : "border-current"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {activeProducts.map((product, index) => {
            const name = tc(`catalog.${product.slug}.name`);
            const headline = tc(`catalog.${product.slug}.headline`);
            return (
              <AnimatedSection
                key={product.slug}
                delay={Math.min(index * 0.04, 0.24)}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-copper-base/20 bg-dark-950 transition-all duration-300 hover:border-copper-base/50 hover:bg-copper-base/[0.04] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-dark-900">
                    {product.imageSrc ? (
                      <Image
                        src={product.imageSrc}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : null}
                    <span className="absolute left-4 top-4 font-heading text-[10px] tracking-[0.22em] text-copper-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-copper-base text-dark-900 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper-base">
                      {product.category === "copper" ? t("copperLabel") : t("brassLabel")}
                    </p>
                    <h2 className="mt-2 text-lg text-text-primary transition-colors group-hover:text-copper-light sm:text-xl">
                      {name}
                    </h2>
                    <p className="mt-2 line-clamp-2 flex-1 text-body-sm text-text-secondary">
                      {headline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted transition-colors group-hover:text-copper-base">
                      {t("viewProduct")}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
