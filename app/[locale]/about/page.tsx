import {
  Award,
  Building2,
  Calendar,
  Factory,
  Globe2,
  Layers,
  Shield,
  TrendingUp,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { aboutHeaderImage } from "@/lib/data";
import {
  milestoneYears,
  valueKeys,
} from "@/lib/i18n-keys";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PageHero from "@/components/ui/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AboutStorySection } from "@/components/about/AboutStorySection";
import TeamGrid from "@/components/about/TeamGrid";
import { ClientsSection } from "@/components/home/Clients";
import { VisionBeams } from "@/components/about/VisionBeams";

const milestoneIcons = [Building2, Layers, Award, Factory, Globe2, TrendingUp];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <main>
      <PageHero
        label={t("label")}
        title={t("title")}
        highlight={t("highlight")}
        backgroundImage={aboutHeaderImage}
        backgroundPriority
      />

      <AboutStorySection />

      <section className="bg-dark-950 py-section px-gutter">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              {t("leadershipSection")}
            </span>
            <h2 className="text-h2">{t("leadershipTitle")}</h2>
            <p className="mt-5 text-body-lg text-text-secondary">
              {t("leadershipBody")}
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <TeamGrid />
          </AnimatedSection>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <VisionBeams />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-copper-base/50 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <AnimatedSection className="relative overflow-hidden border border-copper-base/25 bg-dark-900/80 p-8 backdrop-blur-[2px] sm:p-10 lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                {t("visionSection")}
              </span>
              <h2 className="mt-4 text-h2">{t("visionTitle")}</h2>
              <p className="mt-5 text-body-lg text-text-secondary">
                {t("visionBody")}
              </p>
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-copper-gradient opacity-80"
                aria-hidden
              />
            </AnimatedSection>

            <AnimatedSection
              delay={0.08}
              className="relative flex flex-col justify-center overflow-hidden border border-copper-base/25 bg-dark-900/70 p-8 backdrop-blur-[2px] sm:p-10 lg:col-span-7"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
                {t("missionEyebrow")}
              </span>
              <p
                className="mt-6 font-heading text-2xl leading-snug text-text-primary sm:text-3xl lg:text-[2.1rem] lg:leading-[1.25]"
                style={{ letterSpacing: "-1px" }}
              >
                {t("missionBody")}
              </p>
              <div className="mt-8 h-px w-24 bg-copper-base/60" aria-hidden />
            </AnimatedSection>
          </div>

          <AnimatedSection className="mt-10">
            <div className="grid grid-cols-5 border border-copper-base/25 bg-dark-900/75 backdrop-blur-[2px]">
              {valueKeys.map((key, i) => (
                <article
                  key={key}
                  className={`flex flex-col px-2 py-4 sm:px-4 sm:py-6 ${
                    i < valueKeys.length - 1 ? "border-r border-copper-base/20" : ""
                  }`}
                >
                  <span className="font-heading text-[10px] tracking-[0.16em] text-copper-base sm:text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.1em] text-text-primary sm:mt-3 sm:text-xs">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="mt-2 hidden text-[13px] leading-relaxed text-text-secondary sm:block">
                    {t(`values.${key}.description`)}
                  </p>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ClientsSection index="04" tone="dark-900" />

      <section className="relative overflow-hidden bg-dark-950 py-section px-gutter">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-2xl">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-base">
              {t("milestonesSection")}
            </span>
            <h2 className="text-h2">{t("milestonesTitle")}</h2>
          </AnimatedSection>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {milestoneYears.map((year, index) => {
              const Icon = milestoneIcons[index] ?? Building2;
              return (
                <AnimatedSection key={year} delay={index * 0.07}>
                  <li className="group relative flex h-full flex-col border border-copper-base/25 bg-dark-900 p-6 transition-colors hover:border-copper-base/55">
                    <span className="mb-4 inline-flex h-9 w-9 items-center justify-center border border-copper-base bg-dark-950 text-copper-base">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <p className="font-heading text-3xl text-copper-base">{year}</p>
                    <h3 className="mt-3 text-lg text-text-primary">
                      {t(`events.${year}.title`)}
                    </h3>
                    <p className="mt-2 flex-1 text-body-sm text-text-secondary">
                      {t(`events.${year}.description`)}
                    </p>
                  </li>
                </AnimatedSection>
              );
            })}
          </ol>

          <AnimatedSection className="mt-12">
            <MagneticButton href="/contact" variant="primary">
              {t("workWith")}
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
