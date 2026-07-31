"use client";

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Box3, Group, Vector3 } from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

type ProductModelViewerProps = {
  src: string;
  label?: string;
};

/** Target max dimension in scene units so any GLB fits in frame */
const TARGET_SIZE = 2.2;

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<Group>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.scale.setScalar(1);
    group.position.set(0, 0, 0);

    const box = new Box3().setFromObject(group);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.0001);
    const scale = TARGET_SIZE / maxDim;

    group.scale.setScalar(scale);
    group.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function CameraFit() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.position.set(0, 0.85, 5.2);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function ModelScene({ src }: { src: string }) {
  return (
    <>
      <CameraFit />
      <ambientLight intensity={0.4} color="#d4a574" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.35}
        color="#ffe2b0"
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.55} color="#b87333" />
      <pointLight position={[0, 3, 2]} intensity={0.45} color="#e8a659" />
      <Suspense fallback={null}>
        <Model src={src} />
        <Environment preset="city" environmentIntensity={0.35} />
      </Suspense>
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.4}
        scale={10}
        blur={2.6}
        far={5}
        color="#0a0a0a"
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.7}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
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
      camera={{ position: [0, 0.85, 5.2], fov: 42, near: 0.1, far: 200 }}
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
        {label} · drag to rotate · scroll to zoom
      </p>
    </div>
  );
}
