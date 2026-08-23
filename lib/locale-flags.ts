import type { Locale } from "@/i18n/routing";

export const localeFlags: Record<Locale, { src: string; alt: string }> = {
  en: { src: "https://flagcdn.com/w40/gb.png", alt: "United Kingdom" },
  ar: { src: "https://flagcdn.com/w40/sa.png", alt: "Saudi Arabia" },
  zh: { src: "https://flagcdn.com/w40/cn.png", alt: "China" },
  es: { src: "https://flagcdn.com/w40/es.png", alt: "Spain" },
  ja: { src: "https://flagcdn.com/w40/jp.png", alt: "Japan" },
};
