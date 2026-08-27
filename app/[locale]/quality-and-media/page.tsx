import { getTranslations, setRequestLocale } from "next-intl/server";
import { mediaCertificates, qualityMediaHeaderImage } from "@/lib/data";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { CertificatesGallery } from "@/components/media/CertificatesGallery";
import { QualityLogoMarquee } from "@/components/media/QualityLogoMarquee";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.quality" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function QualityAndMediaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("qualityPage");
  const { media, certificates } = mediaCertificates;

  return (
    <main>
      <PageHero
        label={t("label")}
        title={t("title")}
        highlight={t("highlight")}
        description={t("subheadline")}
        backgroundImage={qualityMediaHeaderImage}
        backgroundPriority
      />

      <section className="overflow-hidden border-b border-dark-100/10 bg-dark-950 py-section">
        <div className="mx-auto max-w-6xl px-gutter">
          <AnimatedSection>
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-base">
              {t("certifiedEyebrow")}
            </p>
            <h2 className="mt-3 text-center text-h3 text-text-primary">
              {t("certifiedTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-body-sm text-text-secondary">
              {t("certifiedBody")}
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.08} className="mt-10">
          <QualityLogoMarquee fadeFrom="from-dark-950" />
        </AnimatedSection>
      </section>

      <section className="overflow-x-clip border-b border-dark-100/10 bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl overflow-x-clip">
          <AnimatedSection>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                02
              </span>
              <span className="h-px w-6 bg-copper-base/40" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                {t("mediaEyebrow")}
              </p>
            </div>
            <h2 className="text-h2 max-w-2xl text-balance">
              <CopperHighlight>{t("mediaTitle")}</CopperHighlight>
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
              {t("mediaBody")}
            </p>
          </AnimatedSection>

          <CertificatesGallery items={media.items} label={t("mediaTitle")} />
        </div>
      </section>

      <section className="overflow-x-clip bg-dark-950 py-section px-gutter">
        <div className="mx-auto max-w-6xl overflow-x-clip">
          <AnimatedSection>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                03
              </span>
              <span className="h-px w-6 bg-copper-base/40" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                {t("certsEyebrow")}
              </p>
            </div>
            <h2 className="text-h2 max-w-2xl text-balance">{t("certsTitle")}</h2>
            <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
              {t("certsBody")}
            </p>
          </AnimatedSection>

          <CertificatesGallery
            items={certificates.items}
            label={t("certsTitle")}
          />
        </div>
      </section>
    </main>
  );
}
