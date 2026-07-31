"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { hero } from "@/lib/data";
import Container from "@/components/ui/Container";

const HERO_VIDEOS = [
  "https://res.cloudinary.com/p4nrvzvp/video/upload/q_auto,w_1920,c_limit/v1785508016/5121742-uhd_2560_1440_25fps_n266f1.mp4",
  "https://res.cloudinary.com/p4nrvzvp/video/upload/q_auto,w_1920,c_limit/v1785508014/5121753-uhd_2560_1440_25fps_httqja.mp4",
];

function HeroVideoSlider({ enabled }: { enabled: boolean }) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionVisible = useRef(true);

  useEffect(() => {
    if (!enabled) return;

    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (!videos.length) return;

    const playActive = async () => {
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        if (!video) continue;
        if (i === active && sectionVisible.current) {
          try {
            video.currentTime = 0;
            await video.play();
          } catch {
            // Autoplay may be blocked; muted + playsInline usually works
          }
        } else {
          video.pause();
        }
      }
    };

    void playActive();
  }, [active, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const root = videoRefs.current[0]?.closest("section");
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionVisible.current = Boolean(entry?.isIntersecting);
        const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
        videos.forEach((video, i) => {
          if (i === active && sectionVisible.current) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [active, enabled]);

  if (!enabled) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(184,115,51,0.25),transparent_55%),linear-gradient(180deg,#050505,#0a0a0a)]"
        aria-hidden
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          onEnded={() => setActive((prev) => (prev + 1) % HERO_VIDEOS.length)}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const fadeUp = shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 };

  return (
    <section className="relative flex min-h-[calc(100vh-7rem)] items-start overflow-hidden bg-[#050505] pt-[8vh] lg:pt-[10vh]">
      <HeroVideoSlider enabled={!shouldReduce} />

      {/* Readability overlays */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark-950/55 via-dark-950/35 to-dark-950/75"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_20%,rgba(5,5,5,0.55)_100%)]"
        aria-hidden
      />

      <Container className="relative z-10 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-heading text-4xl font-medium leading-[1.05] tracking-[-7px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Every Great Innovation Begins with Copper.
          </motion.h1>

          <motion.p
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href={hero.primaryHref}
              className="group inline-flex h-14 items-center gap-3 bg-copper-gradient px-7 text-sm font-bold uppercase tracking-wider text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_40px_rgba(184,115,51,0.35)]"
            >
              {hero.primaryCta}
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#0a0a0a]/30 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </Link>

            <Link
              href={hero.secondaryHref}
              className="group inline-flex h-14 items-center gap-3 border border-white/20 px-7 text-sm font-bold uppercase tracking-wider text-[#f5f5f5] transition-all duration-300 hover:border-copper hover:text-copper-light"
            >
              {hero.secondaryCta}
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
