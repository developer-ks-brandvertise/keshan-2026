"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

export function ThemeToggle({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "onLight";
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("theme");

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className={`inline-flex h-9 w-9 items-center justify-center border ${
          tone === "onLight" ? "border-[#cfc4b6]" : "border-dark-100/15"
        } ${className}`}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`inline-flex h-9 w-9 items-center justify-center border transition-colors ${
        tone === "onLight"
          ? "border-[#cfc4b6] text-[#3d342a] hover:border-copper-dark hover:text-copper-dark"
          : "border-dark-100/15 text-text-secondary hover:border-copper-base hover:text-copper-base"
      } ${className}`}
      aria-label={t("toggle")}
      title={isDark ? t("light") : t("dark")}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
