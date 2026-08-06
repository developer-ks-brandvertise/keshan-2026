"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { knowledge } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

export function KnowledgeSection() {
  return (
    <section className="relative overflow-hidden bg-dark-900 py-section px-gutter">
      <div
        className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.1),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
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

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {knowledge.articles.map((article, index) => (
            <Reveal key={article.title} variant="slide" delay={index * 0.08}>
              <Link
                href="/knowledge-centre"
                className="group relative flex h-full flex-col overflow-hidden border border-copper-base/20 bg-dark-950 transition-all duration-300 hover:border-copper-base/50 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
              >
                <div className="relative h-28 overflow-hidden border-b border-copper-base/15 bg-[linear-gradient(135deg,rgba(184,115,51,0.22),transparent_60%),#111]">
                  <span className="absolute left-5 top-5 font-heading text-5xl text-copper-base/25 transition-colors group-hover:text-copper-base/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
                    {article.category}
                  </span>
                  <span className="absolute bottom-4 right-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    {article.date}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-medium tracking-tight text-text-primary transition-colors group-hover:text-copper-light">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body-sm text-text-secondary">
                    {article.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
