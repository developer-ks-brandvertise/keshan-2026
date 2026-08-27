import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { knowledge, knowledgeCentreHeaderImage } from "@/lib/data";
import { articleKeys } from "@/lib/i18n-keys";
import { Link } from "@/i18n/routing";
import PageHero from "@/components/ui/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MarketRateCards } from "@/components/knowledge/MarketRateCards";
import { CopperPriceChart } from "@/components/knowledge/CopperPriceChart";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.knowledge" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function KnowledgePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("knowledgePage");
  const th = await getTranslations("home.knowledge");

  return (
    <main>
      <PageHero
        label={t("label")}
        title={t("title")}
        highlight={t("highlight")}
        description={th("subheadline")}
        backgroundImage={knowledgeCentreHeaderImage}
        backgroundPriority
      />

      <section className="bg-dark-900 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 space-y-6">
            <MarketRateCards />
            <CopperPriceChart />
            <p className="text-[11px] leading-relaxed text-text-muted">
              {t.rich("chartsNote", {
                lme: (chunks) => (
                  <a
                    href="https://www.lme.com/metals/non-ferrous/lme-copper#Overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-copper-base transition-colors hover:text-copper-light"
                  >
                    {chunks}
                  </a>
                ),
                mcx: (chunks) => (
                  <a
                    href="https://www.moneycontrol.com/commodity/mcx-copper-price/?type=futures&exp=2026-08-31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-copper-base transition-colors hover:text-copper-light"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
                {t("news")}
              </p>
              <h2 className="mt-2 text-h3">{t("latest")}</h2>
            </div>
            <MagneticButton href="/contact" variant="primary" className="shrink-0">
              {t("ask")}
            </MagneticButton>
          </AnimatedSection>

          <div className="grid gap-0 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
            {knowledge.articles.map((article, index) => {
              const key = articleKeys[index];
              return (
                <AnimatedSection key={key} delay={Math.min(index * 0.04, 0.2)}>
                  <Link
                    href="/knowledge-centre"
                    className="group grid grid-cols-[1fr_92px] items-start gap-4 border-b border-dark-100/10 py-5 sm:grid-cols-[1fr_108px]"
                  >
                    <div className="min-w-0">
                      <h3 className="text-lg leading-snug text-text-primary transition-colors group-hover:text-copper-light">
                        {t(`articles.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-text-muted">
                        <span className="text-copper-base">{article.source}</span>
                        <span aria-hidden> · </span>
                        <span>{article.date}</span>
                        <span aria-hidden> · </span>
                        <span>{t(`categories.${article.category}`)}</span>
                      </p>
                    </div>
                    <div className="relative h-[72px] w-[92px] shrink-0 overflow-hidden border border-copper-base/20 sm:h-[80px] sm:w-[108px]">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="108px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
