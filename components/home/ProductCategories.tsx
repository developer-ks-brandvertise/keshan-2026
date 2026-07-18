"use client";

import Image from "next/image";
import Link from "next/link";
import { productCategories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

const images = ["/images/service1.jpg", "/images/service2.jpg"];
const specs = [
  "Cu-ETP · Cu-OF · Busbars · CCR · Sheets · Cathodes",
  "Ingots · Sheets · Plates · Strips · Circles · Alloys",
];

export function ProductCategoriesSection() {
  return (
    <section className="bg-dark-950">
      <div className="px-gutter pt-section pb-8 lg:pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="02"
            eyebrow="Product Range"
            title={productCategories.headline}
            highlight="Every Grade"
            subtitle={productCategories.subheadline}
            align="left"
            className="max-w-3xl"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {productCategories.categories.map((category, index) => {
          const reverse = index % 2 === 1;
          return (
            <Reveal key={category.title} variant="fade" delay={index * 0.08}>
              <article
                className={`group relative grid min-h-[340px] lg:min-h-[420px] lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[240px] overflow-hidden lg:min-h-0">
                  <Image
                    src={images[index] ?? images[0]}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 ${
                      reverse
                        ? "bg-gradient-to-l from-dark-950 via-dark-950/40 to-transparent"
                        : "bg-gradient-to-r from-dark-950 via-dark-950/40 to-transparent"
                    } max-lg:bg-gradient-to-t max-lg:from-dark-950 max-lg:via-dark-950/50 max-lg:to-transparent`}
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
                    {specs[index]}
                  </p>
                  <Link
                    href={category.href}
                    className={`mt-7 inline-flex items-center gap-2 border-b border-copper-base pb-1 text-xs font-bold uppercase tracking-[0.14em] text-copper-base transition-colors hover:text-copper-bright ${
                      reverse ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    Explore range
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
