import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

function deepMerge(base: unknown, overlay: unknown): unknown {
  if (Array.isArray(overlay)) return overlay;
  if (
    base &&
    overlay &&
    typeof base === "object" &&
    typeof overlay === "object" &&
    !Array.isArray(base)
  ) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(overlay as Record<string, unknown>)) {
      out[key] = deepMerge(out[key], value);
    }
    return out;
  }
  return overlay ?? base;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const enMessages =
    locale === "en"
      ? userMessages
      : (await import("../messages/en.json")).default;

  return {
    locale,
    messages: locale === "en" ? enMessages : deepMerge(enMessages, userMessages),
  };
});
