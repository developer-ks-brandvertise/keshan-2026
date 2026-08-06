import type { Metadata } from "next";
import { mediaCertificates } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { CertificatesGallery } from "@/components/media/CertificatesGallery";

export const metadata: Metadata = {
  title: "Quality & Media | Keshan Industries",
  description:
    "View Keshan Industries certifications and quality credentials. Media gallery coming soon.",
};

export default function MediaCertificatesPage() {
  const { media, certificates } = mediaCertificates;

  return (
    <main>
      <PageHero
        label="Quality & Media"
        title={mediaCertificates.headline}
        highlight="Every Batch We Ship"
        description={mediaCertificates.subheadline}
      />

      {/* Media — placeholder until assets are ready */}
      <section className="border-b border-dark-100/10 bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                01
              </span>
              <span className="h-px w-6 bg-copper-base/40" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                Media
              </p>
            </div>
            <h2 className="text-h2 max-w-2xl text-balance">
              <CopperHighlight>{media.headline}</CopperHighlight>
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
              {media.body}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="mt-10">
            <div className="relative overflow-hidden border border-dashed border-copper-base/30 bg-dark-950/60 px-6 py-16 text-center sm:py-20">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,115,51,0.12),transparent_55%)]"
                aria-hidden
              />
              <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-base">
                Coming soon
              </p>
              <p className="relative mx-auto mt-3 max-w-md text-body-sm text-text-secondary">
                Plant, product, and partnership imagery will be published in this
                gallery.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certificates */}
      <section className="bg-dark-950 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                02
              </span>
              <span className="h-px w-6 bg-copper-base/40" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                Certifications
              </p>
            </div>
            <h2 className="text-h2 max-w-2xl text-balance">
              {certificates.headline}
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
              {certificates.body}
            </p>
          </AnimatedSection>

          <CertificatesGallery items={certificates.items} />
        </div>
      </section>
    </main>
  );
}
