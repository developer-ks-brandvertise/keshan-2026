"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";

const copperProducts = products.filter((p) => p.category === "copper");
const brassProducts = products.filter((p) => p.category === "brass");

const productImages: Record<string, string> = {
  "copper-ingots": "/images/inner-img1.jpg",
  "copper-busbars": "/images/inner-img2.jpg",
  "copper-strips": "/images/inner-img3.jpg",
  "copper-sheets-plates": "/images/cmrcn-img1.jpg",
  "copper-upcast-rod": "/images/cmrcn-img2.jpg",
  "bare-copper-wire": "/images/project-img1.jpg",
  "copper-rod": "/images/project-img1.jpg",
  "copper-hex-square-round-rods": "/images/project-img2.jpg",
  "enamel-copper-wire": "/images/project-img1.jpg",
  "copper-blister": "/images/inner-img1.jpg",
  "paper-insulated-copper-conductors-strips": "/images/inner-img3.jpg",
  "copper-foils": "/images/cmrcn-img1.jpg",
  "phosphorous-copper-bar": "/images/service-img2.jpg",
  "phosphorous-copper-nuggets": "/images/project-img2.jpg",
  "copper-5kg-biscuits": "/images/service-img2.jpg",
  "copper-1kg-bars": "/images/service-img2.jpg",
  "copper-anodes": "/images/service-img4.jpg",
  "copper-cathodes": "/images/service1.jpg",
  "copper-scrap": "/images/inner-img2.jpg",
  "brass-ingots": "/images/service2.jpg",
  "brass-sheets-plates": "/images/service3.jpg",
  "brass-strips": "/images/service5.jpg",
  "brass-circles": "/images/service-img4.jpg",
  "brass-scrap": "/images/service3.jpg",
};

const tabs = [
  { id: "copper" as const, label: "Copper Products", count: copperProducts.length },
  { id: "brass" as const, label: "Brass Products", count: brassProducts.length },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"copper" | "brass">("copper");
  const activeProducts = activeTab === "copper" ? copperProducts : brassProducts;

  return (
    <main>
      <PageHero
        label="Product Range"
        title="Copper & Brass. Precision-Engineered."
        highlight="Precision-Engineered"
        description="From high-conductivity copper busbars for power distribution to precision brass strips for component manufacturing — Keshan manufactures every form, every grade, to the standards your application demands."
      />

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="mb-10 flex flex-wrap gap-0 border-b border-copper-base/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-3 border-b-2 px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                    activeTab === tab.id
                      ? "border-copper-base text-copper-base"
                      : "border-transparent text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                  <span className="border border-current px-1.5 py-0.5 text-[10px]">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div>
            {activeProducts.map((product, index) => (
              <AnimatedSection key={product.slug} delay={Math.min(index * 0.03, 0.2)}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group grid items-stretch border-b border-dark-100/10 transition-colors hover:bg-copper-base/[0.04] lg:grid-cols-[200px_1fr_auto]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[140px]">
                    <Image
                      src={productImages[product.slug] || "/images/bg-header01.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 200px"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2 px-0 py-6 lg:px-8">
                    <div className="flex items-baseline gap-4">
                      <span className="font-heading text-xs tracking-[0.2em] text-copper-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl text-text-primary transition-colors group-hover:text-copper-light sm:text-2xl">
                        {product.name}
                      </h2>
                    </div>
                    <p className="max-w-2xl text-body-sm text-text-secondary">
                      {product.headline}
                    </p>
                  </div>
                  <div className="flex items-center justify-end pb-6 lg:pb-0 lg:pr-2">
                    <span className="flex h-11 w-11 items-center justify-center bg-copper-base text-dark-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
