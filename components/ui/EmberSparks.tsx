"use client";

import { useEffect, useMemo, useState } from "react";

type EmberShape = "dot" | "line";

type Ember = {
  id: number;
  side: "left" | "right";
  left: string;
  width: number;
  height: number;
  shape: EmberShape;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  color: string;
  rotate: number;
};

const COLORS = ["#ffe2b0", "#f5c58a", "#e8b87a", "#d4a574", "#b87333", "#ffd493"];

function createEmbers(count: number, side: "left" | "right", idOffset: number): Ember[] {
  return Array.from({ length: count }, (_, i) => {
    const edgePad = 1.2 + Math.random() * 8;
    const isLine = Math.random() > 0.42; // ~58% lines, rest dots
    const size = 0.8 + Math.random() * 1.5;

    return {
      id: idOffset + i,
      side,
      left: side === "left" ? `${edgePad}%` : `${100 - edgePad}%`,
      shape: isLine ? "line" : "dot",
      width: isLine ? 0.7 + Math.random() * 1.1 : size,
      height: isLine ? 6 + Math.random() * 14 : size,
      duration: 7 + Math.random() * 12,
      delay: Math.random() * -22,
      drift: (Math.random() - 0.5) * 32,
      opacity: 0.28 + Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: isLine ? -8 + Math.random() * 16 : 0,
    };
  });
}

export function EmberSparks() {
  const [enabled, setEnabled] = useState(false);

  const embers = useMemo(
    () => [
      ...createEmbers(34, "left", 0),
      ...createEmbers(34, "right", 2000),
    ],
    [],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[15] overflow-hidden"
      aria-hidden
    >
      {embers.map((ember) => (
        <span
          key={ember.id}
          className={`ember-spark absolute bottom-[-5%] ${
            ember.shape === "dot" ? "rounded-full" : "rounded-full ember-streak"
          }`}
          style={{
            left: ember.left,
            width: ember.width,
            height: ember.height,
            opacity: ember.opacity,
            background:
              ember.shape === "line"
                ? `linear-gradient(to top, transparent 0%, ${ember.color} 35%, #ffe2b0 70%, transparent 100%)`
                : ember.color,
            boxShadow:
              ember.shape === "dot"
                ? `0 0 ${ember.width * 3}px ${ember.color}, 0 0 ${ember.width * 6}px rgba(184,115,51,0.35)`
                : `0 0 6px ${ember.color}`,
            ["--ember-drift" as string]: `${ember.drift}px`,
            ["--ember-duration" as string]: `${ember.duration}s`,
            ["--ember-delay" as string]: `${ember.delay}s`,
            ["--ember-rotate" as string]: `${ember.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
