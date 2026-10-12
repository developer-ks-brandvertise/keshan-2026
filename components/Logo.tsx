"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/routing";

interface LogoProps {
  className?: string;
  /** `onLight` always uses the dark logo, for a white header that does not follow the theme. */
  tone?: "theme" | "onLight";
}

/** Bump when logo assets are replaced so browsers/CDN skip stale cache. */
const LOGO_VERSION = "20260924-1813";
const LOGO_DARK = `/images/Keshan-Industries-Logo-Latest.png?v=${LOGO_VERSION}`;
const LOGO_LIGHT = `/images/Keshan-Industries-Logo-Latest-Light.png?v=${LOGO_VERSION}`;

export default function Logo({ className = "", tone = "theme" }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = tone === "onLight" || (mounted && resolvedTheme === "light");
  const src = isLight ? LOGO_LIGHT : LOGO_DARK;

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Keshan Industries"
    >
      <Image
        key={src}
        src={src}
        alt="Keshan Industries"
        width={280}
        height={72}
        className="h-full w-auto"
        priority
        unoptimized
      />
    </Link>
  );
}
