"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/routing";

interface LogoProps {
  className?: string;
}

/** Bump when logo assets are replaced so browsers/CDN skip stale cache. */
const LOGO_VERSION = "20260827-1632";
const LOGO_DARK = `/images/Keshan-Industries-Logo-Latest.png?v=${LOGO_VERSION}`;
const LOGO_LIGHT = `/images/Keshan-Industries-Logo-Latest-Light.png?v=${LOGO_VERSION}`;

export default function Logo({ className = "" }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";
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
