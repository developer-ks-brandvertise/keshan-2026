"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type RollingTextItem = {
  id: string;
  label: ReactNode;
  detail?: ReactNode;
};

type RollingText3DProps = {
  items: RollingTextItem[];
  /** Optional header rendered above the roller inside the sticky stage */
  header?: ReactNode;
  /** Degrees between faces on the cylinder */
  angleStep?: number;
  /** Cylinder radius in px */
  radius?: number;
  /** Perspective distance in px */
  perspective?: number;
  className?: string;
};

/**
 * 3D circular rolling text driven by scroll — Skiper88-style cylinder on X axis.
 * Uses GSAP ScrollTrigger (synced with Lenis) for reliable scrub.
 */
export function RollingText3D({
  items,
  header,
  angleStep = 24,
  radius = 200,
  perspective = 600,
  className = "",
}: RollingText3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLUListElement>(null);
  const detailRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    // Negative child angles place later steps *below* the front face.
    // Positive parent rotation then rolls them up into view on scroll-down.
    const endRotation = (items.length - 1) * angleStep;
    const faces = Array.from(stage.querySelectorAll<HTMLElement>("[data-face]"));

    const setActiveDetail = (progress: number) => {
      const index = Math.min(
        Math.max(Math.round(progress * (items.length - 1)), 0),
        items.length - 1,
      );
      detailRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === index ? "1" : "0";
        el.style.transform = i === index ? "translateY(0px)" : "translateY(10px)";
      });
    };

    const ctx = gsap.context(() => {
      faces.forEach((face, i) => {
        face.style.transform = `rotateX(${-i * angleStep}deg) translateZ(${radius}px)`;
      });

      const apply = (progress: number) => {
        const rot = endRotation * progress;
        stage.style.transform = `rotateX(${rot}deg)`;
        faces.forEach((face, i) => {
          // Front when parent (rot) + child (−i·step) ≈ 0 → rot ≈ i·step
          const fromFront = rot - i * angleStep;
          const dist = Math.abs(((fromFront + 180) % 360) - 180);
          face.style.opacity =
            dist > 70 ? "0" : String(Math.max(0.2, 1 - dist / 50));
        });
        setActiveDetail(progress);
      };

      apply(0);

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
      });
    }, container);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [angleStep, items.length, perspective, radius, shouldReduce]);

  if (shouldReduce) {
    return (
      <div className={className}>
        {header}
        <ol className="mt-8 space-y-8">
          {items.map((item) => (
            <li key={item.id} className="border-b border-dark-100/10 pb-8 last:border-0">
              <div className="text-copper-shimmer font-heading text-2xl tracking-[-7px] md:text-3xl">
                {item.label}
              </div>
              {item.detail ? (
                <p className="mt-3 max-w-xl text-body text-text-secondary">{item.detail}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  // Shorter scrub distance — avoids mid-page scroll feeling trapped
  const scrollHeight = `${Math.max(items.length * 22, 140)}vh`;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: scrollHeight }}
    >
      {/* Pack content toward the top so heading + roller sit close together */}
      <div
        className="sticky top-0 flex min-h-screen flex-col justify-start pt-28 md:pt-32 lg:pt-36"
        style={{ perspective: `${perspective}px` }}
      >
        {header ? <div className="mb-10 w-full md:mb-12">{header}</div> : null}

        <div
          className="relative flex h-[min(42vh,340px)] w-full items-center justify-center"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
          }}
        >
          <ul
            ref={stageRef}
            className="relative h-24 w-full md:h-28"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item) => (
              <li
                key={item.id}
                data-face
                className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center [backface-visibility:hidden]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-copper-shimmer text-center font-heading text-4xl font-semibold tracking-[-7px] md:text-6xl lg:text-7xl">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto mt-10 min-h-[4.5rem] w-full max-w-lg px-4 text-center md:mt-12">
          {items.map((item, i) => (
            <p
              key={item.id}
              ref={(el) => {
                detailRefs.current[i] = el;
              }}
              className="absolute inset-x-0 top-0 text-body text-text-secondary transition-[opacity,transform] duration-300"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {item.detail}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
