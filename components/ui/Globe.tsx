"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

/** Dark copper globe for Keshan — lighter mesh for scroll performance */
export const COPPER_GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 1,
  phi: 0,
  theta: 0.22,
  dark: 1,
  diffuse: 1.4,
  mapSamples: 8000,
  mapBrightness: 2.8,
  baseColor: [0.18, 0.13, 0.08],
  markerColor: [212 / 255, 165 / 255, 116 / 255],
  glowColor: [184 / 255, 115 / 255, 51 / 255],
  markers: [
    { location: [17.385, 78.4867], size: 0.12 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [28.6139, 77.209], size: 0.06 },
    { location: [25.2048, 55.2708], size: 0.07 },
    { location: [51.5074, -0.1278], size: 0.07 },
    { location: [40.7128, -74.006], size: 0.08 },
    { location: [52.52, 13.405], size: 0.05 },
    { location: [1.3521, 103.8198], size: 0.06 },
    { location: [35.6762, 139.6503], size: 0.06 },
    { location: [-33.8688, 151.2093], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = COPPER_GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [active, setActive] = useState(false);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  // Only init WebGL when near viewport — avoids main-thread freeze on page load
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.0035;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    canvas.style.opacity = "1";

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [active, rs, config]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full",
        className,
      )}
    >
      {active ? (
        <canvas
          ref={canvasRef}
          className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          }}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      ) : null}
    </div>
  );
}
