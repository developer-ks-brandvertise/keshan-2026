"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { productCategories } from "@/lib/data";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export function ProductCategoriesSection() {
  const t = useTranslations("home.range");

  const cards = [
    {
      title: t("copperTitle"),
      description: t("copperBody"),
      specs: t("copperSpecs"),
      href: "/products#copper" as const,
      image: productCategories.categories[0].image,
    },
    {
      title: t("brassTitle"),
      description: t("brassBody"),
      specs: t("brassSpecs"),
      href: "/products#brass" as const,
      image: productCategories.categories[1].image,
    },
  ];

  return (
    <section className="bg-dark-950">
      <div className="px-gutter pt-section pb-8 lg:pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="03"
            eyebrow={t("eyebrow")}
            title={t("headline")}
            highlight={t("highlight")}
            subtitle={t("subheadline")}
            align="left"
            className="max-w-3xl"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {cards.map((category, index) => {
          const reverse = index % 2 === 1;
          return (
            <Reveal key={category.href} variant="fade" delay={index * 0.08}>
              <article
                className={`group relative grid min-h-[340px] lg:min-h-[420px] lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[240px] overflow-hidden lg:min-h-0">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div
                  className={`relative flex flex-col justify-center px-gutter py-10 lg:px-12 xl:px-16 ${
                    reverse ? "lg:items-end lg:text-right" : ""
                  }`}
                >
                  <span className="font-heading text-xs tracking-[0.28em] text-copper-base">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-h2">{category.title}</h3>
                  <p
                    className={`mt-4 max-w-md text-body text-text-secondary ${
                      reverse ? "lg:ml-auto" : ""
                    }`}
                  >
                    {category.description}
                  </p>
                  <p
                    className={`mt-5 max-w-md text-[11px] font-medium uppercase tracking-[0.14em] text-copper-light/80 ${
                      reverse ? "lg:ml-auto" : ""
                    }`}
                  >
                    {category.specs}
                  </p>
                  <Link
                    href={category.href}
                    className={`mt-7 inline-flex items-center gap-2 border-b border-copper-base pb-1 text-xs font-bold uppercase tracking-[0.14em] text-copper-base transition-colors hover:text-copper-bright ${
                      reverse ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {t("explore")}
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
