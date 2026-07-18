import type { Metadata } from "next";
import Link from "next/link";
import { knowledge } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Knowledge Centre | Keshan Industries | Copper Insights & Technical Guides",
  description:
    "Copper market updates, technical guides, and industry insights from Keshan’s team of metallurgists and industry specialists.",
};

export default function KnowledgePage() {
  return (
    <main>
      <PageHero
        label="Knowledge Centre"
        title="Copper Insights From Keshan Specialists."
        highlight="Copper Insights"
        description={knowledge.subheadline}
      />

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-body text-text-secondary">
              Technical notes and market context from the people who melt, roll, and certify the metal.
            </p>
            <MagneticButton href="/contact" variant="primary" className="shrink-0">
              Ask Our Metallurgists
            </MagneticButton>
          </AnimatedSection>

          <div className="border-t border-copper-base/30">
            {knowledge.articles.map((article, index) => (
              <AnimatedSection key={article.title} delay={index * 0.06}>
                <Link
                  href="/knowledge-centre"
                  className="group grid grid-cols-[48px_1fr] gap-4 border-b border-dark-100/10 py-8 transition-colors hover:bg-copper-base/[0.04] sm:grid-cols-[64px_1fr_auto] sm:gap-8"
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
                    <h2 className="mt-2 text-xl font-medium tracking-tight text-text-primary transition-colors group-hover:text-copper-light sm:text-2xl">
                      {article.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-body-sm text-text-secondary">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="hidden items-center self-center text-[11px] font-bold uppercase tracking-[0.14em] text-copper-base opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
                    Read →
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
