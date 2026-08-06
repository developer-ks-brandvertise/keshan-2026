"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { quality } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import CopperHighlight from "@/components/ui/CopperHighlight";
import { CopperWave } from "@/components/ui/CopperWave";

const qualityIcons = [
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027947/Certification_Logos-02_o7uxzn.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027951/Certification_Logos-03_dwyjco.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027951/Certification_Logos-01_f1cbcx.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027953/Certification_Logos-05_w1gy3s.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027951/Certification_Logos-08_ebcx72.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027951/Certification_Logos-04_wujy6u.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027949/Certification_Logos-07_tbdxyh.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027954/Certification_Logos-06_jv1jae.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027956/Certification_Logos-11_zb6kbm.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027959/Certification_Logos-09_i4sovh.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786027960/Certification_Logos-10_vgilpn.png",
  "https://res.cloudinary.com/p4nrvzvp/image/upload/v1786028395/Certification_Logos_xhtn9h.png",
];

/** Optimized loop — pause when off-screen to avoid scroll jank */
const QUALITY_VIDEO =
  "https://res.cloudinary.com/p4nrvzvp/video/upload/q_auto,w_1280,c_limit/v1784295716/0_Abstract_Particles_1920x1080_zbif19.mp4";

function QualityBackgroundVideo({ enabled }: { enabled: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

    const root = video.closest("section");
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(184,115,51,0.28),transparent_55%),linear-gradient(120deg,#0a0a0a_0%,#1a120c_45%,#0a0a0a_100%)]"
        aria-hidden
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={QUALITY_VIDEO}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

export function QualitySection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#080808]">
      <CopperWave id="quality" className="-mb-px" />

      <div className="relative min-h-[64vh] lg:min-h-[72vh]">
        <QualityBackgroundVideo enabled={!shouldReduce} />

        {/* Hardcoded dark overlays so light theme tokens don't wash the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/45" />

        <div className="relative z-10 flex min-h-[64vh] items-end px-gutter pb-10 pt-24 lg:min-h-[72vh] lg:items-center lg:pb-16 lg:pt-28">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 xl:gap-16">
            <div className="max-w-xl lg:max-w-none lg:pr-4">
              <Reveal variant="fade">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-heading text-xs tracking-[0.25em] text-copper-base">
                    04
                  </span>
                  <span className="h-px w-6 bg-copper-base/40" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-copper-base">
                    Quality Assurance
                  </p>
                </div>
              </Reveal>

              <Reveal variant="slide">
                <h2 className="text-h2 text-balance text-white [background-image:none] [-webkit-text-fill-color:#f5f5f5]">
                  Quality is Not a Department at Keshan. It is the{" "}
                  <CopperHighlight>Standard</CopperHighlight>.
                </h2>
              </Reveal>

              <Reveal variant="fade" delay={0.12}>
                <p className="mt-5 max-w-lg text-body-lg text-white/80">
                  {quality.body}
                </p>
              </Reveal>

              <Reveal variant="fade" delay={0.2} className="mt-8">
                <MagneticButton href="/contact" variant="primary">
                  {quality.cta}
                </MagneticButton>
              </Reveal>
            </div>

            <Reveal variant="fade" delay={0.14} className="lg:justify-self-end">
              <ul
                className="mx-auto grid w-full max-w-[420px] grid-cols-4 gap-3 sm:max-w-[520px] sm:grid-cols-6 sm:gap-3.5 md:max-w-[560px] lg:mx-0 lg:w-[520px] lg:max-w-none lg:gap-3.5"
                aria-label="Quality certifications"
              >
                {qualityIcons.map((src) => (
                  <li key={src} className="aspect-square w-full">
                    <div className="relative h-full w-full overflow-hidden rounded-full border border-copper-base/35 bg-black/60 p-[2px]">
                      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0a0a0a]">
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-contain p-1.5"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
