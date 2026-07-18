"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const processImages = [
  "/images/process-img1.jpg",
  "/images/process-img2.jpg",
  "/images/process-img3.jpg",
  "/images/process-img1.jpg",
  "/images/process-img2.jpg",
  "/images/process-img3.jpg",
  "/images/process-img1.jpg",
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion || !sectionRef.current || !trackRef.current || !lineRef.current) {
      return;
    }

    const track = trackRef.current;
    const line = lineRef.current;
    const steps = gsap.utils.toArray<HTMLElement>(".process-step");
    const totalWidth = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: -totalWidth,
      ease: "none",
    });

    tl.to(
      line,
      {
        scaleX: 1,
        ease: "none",
      },
      0,
    );

    steps.forEach((step, index) => {
      const stepStart = index / steps.length;
      const stepEnd = (index + 1) / steps.length;

      tl.fromTo(
        step,
        { opacity: 0.3, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: "power2.out",
        },
        stepStart,
      );

      if (index < steps.length - 1) {
        tl.to(
          step,
          {
            opacity: 0.3,
            y: -20,
            duration: 0.08,
            ease: "power2.in",
          },
          stepEnd,
        );
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section className="bg-dark-900 py-section px-gutter">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Manufacturing Process"
            title="Precision at Every Stage."
            subtitle="From raw material to final dispatch, every step of the Keshan manufacturing process is specification-led and monitored by experienced metallurgists."
            className="mb-16"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="group relative h-full overflow-hidden border border-dark-100/10 bg-dark-950"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={processImages[index]}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-h3 font-display font-bold text-copper-base/40">
                      {step.number}
                    </span>
                    <span className="h-0.5 w-12 bg-copper-base/40" />
                  </div>
                  <h3 className="text-h3 font-display font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-body-sm text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-dark-900"
    >
      <div className="absolute inset-0 flex flex-col justify-center px-gutter">
        <SectionHeading
          eyebrow="Manufacturing Process"
          title="Precision at Every Stage."
          subtitle="From raw material to final dispatch, every step of the Keshan manufacturing process is specification-led and monitored by experienced metallurgists."
          align="center"
          className="mb-8"
        />

        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/10">
            <div
              ref={lineRef}
              className="h-full origin-left bg-copper-base"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div
            ref={trackRef}
            className="flex items-center gap-8 px-[10vw]"
            style={{ width: "max-content" }}
          >
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="process-step relative w-[70vw] max-w-md flex-shrink-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-dark-100/10">
                  <Image
                    src={processImages[index]}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="70vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                </div>
                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-4">
                    <span className="text-h2 font-display font-bold text-copper-base">
                      {step.number}
                    </span>
                    <span className="h-px flex-1 bg-copper-base/30" />
                  </div>
                  <h3 className="text-h3 font-display font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-body text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
