"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, type Locale } from "@/i18n/routing";
import { localeFlags } from "@/lib/locale-flags";

function Flag({ code }: { code: Locale }) {
  const flag = localeFlags[code];
  return (
    <img
      src={flag.src}
      alt=""
      width={20}
      height={15}
      className="h-3.5 w-5 shrink-0 object-cover"
    />
  );
}

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const selectLocale = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 items-center gap-2 border border-dark-100/15 bg-transparent px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-secondary outline-none transition-colors hover:border-copper-base hover:text-copper-base"
      >
        <Flag code={locale} />
        <span>{t(locale)}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2.25}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute end-0 z-50 mt-1 min-w-[11.5rem] border border-dark-100/15 bg-dark-900 py-1 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
        >
          {locales.map((code) => {
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => selectLocale(code)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    active
                      ? "bg-copper-base/10 text-copper-base"
                      : "text-text-secondary hover:bg-copper-base/[0.06] hover:text-copper-base"
                  }`}
                >
                  <Flag code={code} />
                  <span>{t(code)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
