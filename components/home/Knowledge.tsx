"use client";

import Link from "next/link";
import { knowledge } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function KnowledgeSection() {
  return (
    <section className="bg-dark-900 py-section px-gutter">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
          <SectionHeading
            index="07"
            eyebrow="Knowledge Centre"
            title={knowledge.headline}
            highlight="Knowledge Centre"
            subtitle={knowledge.subheadline}
            align="left"
            className="max-w-2xl"
          />
          <MagneticButton href="/knowledge-centre" variant="primary" className="shrink-0">
            {knowledge.cta}
          </MagneticButton>
        </div>

        {/* Numbered editorial index */}
        <div className="border-t border-copper-base/30">
          {knowledge.articles.map((article, index) => (
            <Reveal key={article.title} variant="fade" delay={index * 0.06}>
              <Link
                href="/knowledge-centre"
                className="group grid grid-cols-[48px_1fr] gap-4 border-b border-dark-100/10 py-7 transition-colors hover:bg-copper-base/[0.04] sm:grid-cols-[64px_1fr_auto] sm:gap-8 sm:py-8"
              >
                <span className="pt-1 font-heading text-sm tracking-[0.2em] text-copper-base">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    <span className="text-copper-base">{article.category}</span>
                    <span aria-hidden>·</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-medium tracking-tight text-text-primary transition-colors group-hover:text-copper-light sm:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-body-sm text-text-secondary line-clamp-2 sm:opacity-0 sm:max-h-0 sm:mt-0 sm:overflow-hidden sm:transition-all sm:duration-300 group-hover:sm:mt-2 group-hover:sm:max-h-20 group-hover:sm:opacity-100">
                    {article.excerpt}
                  </p>
                </div>

                <span className="hidden items-center self-center text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
                  Read →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
