"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const Beams = dynamic(() => import("@/components/ui/beams"), { ssr: false });

export function VisionBeams() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {!reduce && visible ? (
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={10}
          color="#b87333"
          lightColor="#f5c58a"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(202,94,46,0.16),transparent_62%)]" />
      )}
    </div>
  );
}
