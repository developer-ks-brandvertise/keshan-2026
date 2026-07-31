"use client";

import dynamic from "next/dynamic";
import type { GlobeConfig } from "@/components/ui/github-globe";

const World = dynamic(
  () => import("@/components/ui/github-globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-40 w-40 rounded-full border border-copper-base/40" />
      </div>
    ),
  },
);

const copperColors = ["#b87333", "#d4a574", "#e8a659", "#f5c58a"];

type Arc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

function arc(
  order: number,
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  arcAlt: number,
  colorIndex: number,
): Arc {
  return {
    order,
    startLat,
    startLng,
    endLat,
    endLng,
    arcAlt,
    color: copperColors[colorIndex % copperColors.length]!,
  };
}

const sampleArcs: Arc[] = [
  arc(1, -19.885592, -43.951191, -22.9068, -43.1729, 0.1, 0),
  arc(1, 28.6139, 77.209, 3.139, 101.6869, 0.2, 1),
  arc(1, -19.885592, -43.951191, -1.303396, 36.852443, 0.5, 2),
  arc(2, 1.3521, 103.8198, 35.6762, 139.6503, 0.2, 0),
  arc(2, 51.5072, -0.1276, 3.139, 101.6869, 0.3, 3),
  arc(2, -15.785493, -47.909029, 36.162809, -115.119411, 0.3, 1),
  arc(3, -33.8688, 151.2093, 22.3193, 114.1694, 0.3, 2),
  arc(3, 21.3099, -157.8581, 40.7128, -74.006, 0.3, 0),
  arc(3, -6.2088, 106.8456, 51.5072, -0.1276, 0.3, 1),
  arc(4, 11.986597, 8.571831, -15.595412, -56.05918, 0.5, 3),
  arc(4, -34.6037, -58.3816, 22.3193, 114.1694, 0.7, 0),
  arc(4, 51.5072, -0.1276, 48.8566, 2.3522, 0.1, 2),
  arc(5, 14.5995, 120.9842, 51.5072, -0.1276, 0.3, 1),
  arc(5, 1.3521, 103.8198, -33.8688, 151.2093, 0.2, 0),
  arc(5, 34.0522, -118.2437, 48.8566, 2.3522, 0.2, 3),
  arc(6, 37.5665, 126.978, 35.6762, 139.6503, 0.1, 2),
  arc(6, 22.3193, 114.1694, 51.5072, -0.1276, 0.3, 1),
  arc(7, 48.8566, 2.3522, 52.52, 13.405, 0.1, 0),
  arc(7, 52.52, 13.405, 34.0522, -118.2437, 0.2, 3),
  arc(8, 1.3521, 103.8198, 40.7128, -74.006, 0.5, 2),
  arc(9, 51.5072, -0.1276, 34.0522, -118.2437, 0.2, 1),
  arc(9, 22.3193, 114.1694, -22.9068, -43.1729, 0.7, 0),
  arc(10, -22.9068, -43.1729, 28.6139, 77.209, 0.7, 3),
  arc(10, 34.0522, -118.2437, 31.2304, 121.4737, 0.3, 2),
  arc(11, 22.3193, 114.1694, 1.3521, 103.8198, 0.2, 1),
  arc(12, 35.6762, 139.6503, 22.3193, 114.1694, 0.2, 0),
  arc(13, 52.52, 13.405, 22.3193, 114.1694, 0.3, 3),
];

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#050505",
  showAtmosphere: true,
  atmosphereColor: "#c9893f",
  atmosphereAltitude: 0.028,
  emissive: "#0a0a0a",
  emissiveIntensity: 0.06,
  shininess: 0.65,
  polygonColor: "rgba(245, 197, 138, 0.65)",
  ambientLight: "#d4a574",
  directionalLeftLight: "#ffe2b0",
  directionalTopLight: "#ffffff",
  pointLight: "#e8a659",
  arcTime: 1800,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 17.385, lng: 78.4867 },
  autoRotate: true,
  autoRotateSpeed: 0.45,
};

export function GlobeDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
      {/* Transparent stage — no boxed black background */}
      <div
        className="relative w-full overflow-hidden bg-transparent"
        style={{ paddingBottom: "78%" }}
      >
        <div className="absolute left-1/2 top-0 aspect-square w-[108%] -translate-x-1/2">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-dark-950 to-transparent"
        aria-hidden
      />
    </div>
  );
}
