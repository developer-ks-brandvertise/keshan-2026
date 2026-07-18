"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { hero } from "@/lib/data";
import Beams from "@/components/ui/beams";
import Container from "@/components/ui/Container";

export default function Hero() {
  const shouldReduce = useReducedMotion();

  const fadeUp = shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 };

  return (
    <section className="relative flex min-h-[calc(100vh-7rem)] items-start overflow-hidden bg-[#000000] pt-[8vh] lg:pt-[10vh]">
      {/* Beams background */}
      <div className="pointer-events-none absolute inset-0">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          color="#b87333"
          lightColor="#f5c58a"
          backgroundColor="#000000"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* Copper glow accents */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-copper/10 blur-[160px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[500px] w-[500px] rounded-full bg-copper-dark/10 blur-[140px]" />

      <Container className="relative z-10 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-heading text-4xl font-medium leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Every Great Innovation Begins with Copper.
          </motion.h1>

          <motion.p
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={fadeUp}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
