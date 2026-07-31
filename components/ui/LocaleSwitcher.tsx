"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, type Locale } from "@/i18n/routing";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale");

  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(e) => {
          const next = e.target.value as Locale;
          router.replace(pathname, { locale: next });
        }}
        className="h-9 appearance-none border border-dark-100/15 bg-transparent px-2.5 pr-7 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-secondary outline-none transition-colors hover:border-copper-base hover:text-copper-base"
        aria-label={t("label")}
      >
        {locales.map((code) => (
          <option key={code} value={code} className="bg-dark-900 text-text-primary">
            {t(code)}
          </option>
        ))}
      </select>
    </label>
  );
}
