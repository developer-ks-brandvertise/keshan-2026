"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });

const BRAND_COPPER = "#ca5e2e";

export function ProductsSilkBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      {!reduce && visible ? (
        <Silk
          speed={5}
          scale={1}
          color={BRAND_COPPER}
          noiseIntensity={1.5}
          rotation={0}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(202,94,46,0.42),transparent_68%)]" />
      )}
    </div>
  );
}
