"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

type ProductModelViewerProps = {
  src: string;
  label?: string;
};

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function ModelScene({ src }: { src: string }) {
  return (
    <>
      <ambientLight intensity={0.35} color="#d4a574" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.35}
        color="#ffe2b0"
        castShadow
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.55} color="#b87333" />
      <pointLight position={[0, 3, 2]} intensity={0.45} color="#e8a659" />
      <Suspense fallback={null}>
        <Model src={src} />
        <Environment preset="city" environmentIntensity={0.35} />
      </Suspense>
      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.45}
        scale={8}
        blur={2.4}
        far={4}
        color="#1a120c"
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  );
}

function ViewerCanvas({ src }: { src: string }) {
  return (
    <Canvas
      className="h-full w-full touch-none"
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.6, 3.4], fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ModelScene src={src} />
    </Canvas>
  );
}

const DynamicViewerCanvas = dynamic(() => Promise.resolve(ViewerCanvas), {
  ssr: false,
});

export function ProductModelViewer({
  src,
  label = "3D product view",
}: ProductModelViewerProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useGLTF.preload(src);
    setReady(true);
  }, [src]);

  return (
    <div className="relative overflow-hidden border border-copper-base/20 bg-dark-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(184,115,51,0.22),transparent_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-950 to-transparent"
        aria-hidden
      />

      <div className="relative aspect-[16/11] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
        {ready ? (
          <DynamicViewerCanvas src={src} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(184,115,51,0.3),transparent_70%)]" />
          </div>
        )}
      </div>

      <p className="pointer-events-none absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label} · drag to rotate
      </p>
    </div>
  );
}
