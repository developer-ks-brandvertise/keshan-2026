"use client";

import { useTranslations } from "next-intl";
import { StoryVideoSection } from "@/components/sections/StoryVideoSection";

export function AboutStorySection() {
  const t = useTranslations("aboutPage");
  const tc = useTranslations("common");
  const lead = t("body").split("\n\n")[0] ?? t("body");

  return (
    <StoryVideoSection
      sectionTitle={t("sectionTitle")}
      subheading={t("storyTitle")}
      body={lead}
      ctaLabel={tc("discoverMore")}
      ctaHref="/contact"
      videoTitle={t("videoTitle")}
    />
  );
}
