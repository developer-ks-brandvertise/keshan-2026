"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, PerspectiveCamera, Vector3, MeshBasicMaterial } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: any;
  }
}

// Top-level extend moved to client-only useEffect in World for stability

const RING_PROPAGATION_SPEED = 3;
const aspect = 1;
// Closer camera ≈ 25% larger sphere (near plane stays at 1 to avoid face clipping)
const cameraZ = 240;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (globeRef.current) {
      _buildData();
      _buildMaterial();
    }
  }, [globeRef.current]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;

    // MeshBasicMaterial ignores lights — Phong was leaving a dark “shadow hemisphere”
    // that read as a black hole on the sphere face / rim.
    const material = new MeshBasicMaterial({
      color: new Color(defaultProps.globeColor),
      transparent: false,
      depthWrite: true,
    });
    globeRef.current.globeMaterial(material);
  };

  const _buildData = () => {
    const arcs = data;
    let points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = (arc.color ? hexToRgb(arc.color) : { r: 0, g: 0, b: 0 }) as {
        r: number;
        g: number;
        b: number;
      };
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2: any) =>
          ["lat", "lng"].every((k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]),
        ) === i,
    );

    setGlobeData(filteredPoints);
  };

  useEffect(() => {
    if (globeRef.current && globeData) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.55)
        .hexPolygonAltitude(0.01)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);
      startAnimation();
    }
  }, [globeData]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .arcsData(data)
      .arcStartLat((d: any) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d: any) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d: any) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d: any) => (d as { endLng: number }).endLng * 1)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e: any) => {
        return (e as { arcAlt: number }).arcAlt * 1;
      })
      .arcStroke((e: any) => {
        return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
      })
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e: any) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime((e: any) => defaultProps.arcTime);

    globeRef.current
      .pointsData(data)
      .pointColor((e: any) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor((e: any) => (t: any) => e.color(t))
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings);
  };

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    const interval = setInterval(() => {
      if (!globeRef.current || !globeData) return;
      numbersOfRings = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));

      globeRef.current.ringsData(globeData.filter((d, i) => numbersOfRings.includes(i)));
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [globeRef.current, globeData]);

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
  }, []);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  // No fog — keeps the canvas transparent so the page background shows through
  scene.fog = null;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Dynamically extend here to ensure it only happens on client
    extend({ ThreeGlobe });
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      className="h-full w-full !bg-transparent"
      style={{ background: "transparent" }}
      scene={scene}
      camera={new PerspectiveCamera(50, aspect, 1, 2000)}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
    >
      <WebGLRendererConfig />
      {/* Even lighting for hex/arc layers (globe shell itself is MeshBasic) */}
      <ambientLight color="#f0d4b0" intensity={2.2} />
      <hemisphereLight args={["#ffe8c8", "#4a3018", 1.4]} />
      <directionalLight
        color="#ffffff"
        position={new Vector3(0, 0, 400)}
        intensity={1.6}
      />
      <directionalLight
        color="#ffe2b0"
        position={new Vector3(-200, 300, 200)}
        intensity={1.0}
      />
      <directionalLight
        color="#d4a574"
        position={new Vector3(200, -100, 300)}
        intensity={0.9}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 0.5}
        autoRotate={globeConfig.autoRotate ?? true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
