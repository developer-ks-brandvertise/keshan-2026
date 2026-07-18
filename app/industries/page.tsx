import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Industries Served | Keshan Industries | Copper & Brass Applications",
  description:
    "Keshan copper and brass serve electrical, power, solar, EV, cable, construction, automotive, electronics, and more. Explore 13 industries we supply.",
};

const featuredApps: Record<string, string> = Object.fromEntries(
  industries.featured.map((f) => [f.name, f.application]),
);

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        label="Industries Served"
        title="Copper at the Core of Critical Industries."
        highlight="Critical Industries"
        description={industries.subheadline}
      />

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-body text-text-secondary">
              Thirteen sectors. One metallurgical standard — specification-led copper and brass, batch after batch.
            </p>
            <MagneticButton href="/contact" variant="primary" className="shrink-0">
              Discuss Your Application
            </MagneticButton>
          </AnimatedSection>

          <div className="border-t border-copper-base/30">
            {industries.all.map((industry, index) => {
              const application =
                featuredApps[industry] ||
                `Precision copper and brass products engineered for ${industry.toLowerCase()}.`;
              return (
                <AnimatedSection key={industry} delay={Math.min(index * 0.03, 0.24)}>
                  <article className="group grid border-b border-dark-100/10 transition-colors hover:bg-copper-base/[0.04] sm:grid-cols-[64px_1fr_1.1fr]">
                    <div className="flex items-center py-6">
                      <span className="font-heading text-xs tracking-[0.2em] text-copper-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 py-6 pr-4">
                      <span className="hidden h-10 w-0.5 bg-copper-base/40 transition-colors group-hover:bg-copper-base sm:block" />
                      <h2 className="text-lg text-text-primary transition-colors group-hover:text-copper-light sm:text-xl">
                        {industry}
                      </h2>
                    </div>
                    <div className="flex items-center border-dark-100/10 pb-6 sm:border-l sm:px-8 sm:py-6 sm:pb-6">
                      <p className="text-body-sm text-text-secondary">{application}</p>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="mt-12 text-center sm:text-left">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-b border-copper-base pb-1 text-xs font-bold uppercase tracking-[0.14em] text-copper-base transition-colors hover:text-copper-bright"
            >
              Browse product range →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
