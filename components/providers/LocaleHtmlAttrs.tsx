"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/** Syncs <html> lang + dir for locale (esp. Arabic RTL). */
export function LocaleHtmlAttrs() {
  const locale = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
