import type { Metadata } from "next";
import Image from "next/image";
import { mediaCertificates } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopperHighlight from "@/components/ui/CopperHighlight";

export const metadata: Metadata = {
  title: "Media & Certificates | Keshan Industries",
  description:
    "View Keshan Industries certifications and quality credentials. Media gallery coming soon.",
};

export default function MediaCertificatesPage() {
  const { media, certificates } = mediaCertificates;

  return (
    <main>
      <PageHero
        label="Media & Certificates"
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

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {certificates.items.map((cert, index) => (
              <AnimatedSection key={cert.src} delay={index * 0.05}>
                <a
                  href={cert.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-dark-100/10 bg-dark-900 transition-colors hover:border-copper-base/50"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-dark-950">
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02] sm:p-4"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-dark-100/10 px-4 py-3">
                    <span className="font-heading text-xs tracking-[0.18em] text-copper-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted transition-colors group-hover:text-copper-base">
                      View full
                    </span>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
