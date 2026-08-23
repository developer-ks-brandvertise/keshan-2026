"use client";

import { useTranslations } from "next-intl";
import { processKeys } from "@/lib/i18n-keys";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RollingText3D } from "@/components/ui/RollingText3D";

export function ProcessSection() {
  const t = useTranslations("home.process");

  const rollingItems = processKeys.map((key) => ({
    id: key,
    label: (
      <>
        <span className="mr-3 align-middle font-heading text-base tracking-[0.22em] md:mr-5 md:text-lg">
          {key}
        </span>
        <span className="align-middle">{t(`steps.${key}.title`)}</span>
      </>
    ),
    detail: t(`steps.${key}.description`),
  }));

  return (
    <section className="relative overflow-x-clip bg-dark-900">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(184,115,51,0.16),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-base/40 to-transparent"
        aria-hidden
      />

      <RollingText3D
        items={rollingItems}
        angleStep={24}
        radius={200}
        perspective={600}
        className="mx-auto max-w-6xl px-gutter"
        header={
          <SectionHeading
            index="04"
            eyebrow={t("eyebrow")}
            title={t("headline")}
            highlight={t("highlight")}
            subtitle={t("subtitle")}
            align="left"
            className="max-w-3xl"
          />
        }
      />

      <div className="relative mx-auto max-w-6xl px-gutter pb-section">
        <p className="border-t border-copper-base/20 pt-8 text-center font-heading text-[10px] uppercase tracking-[0.3em] text-text-muted">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
