"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { shouldReduceMotion } from "@/lib/motion";

interface NumberedCapabilityProps {
  number: string;
  title: string;
  description: string;
  href: string;
  image: string;
  index?: number;
}

export function NumberedCapability({
  number,
  title,
  description,
  href,
  image,
  index = 0,
}: NumberedCapabilityProps) {
  const reduce = shouldReduceMotion();

  return (
    <motion.article
      className="group relative border-t border-dark-100/10 last:border-b"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)_auto]">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[2/1] lg:aspect-auto lg:min-h-[240px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-dark-950/30" />
        </div>

        <div className="flex flex-col justify-center gap-3 py-7 pr-14 sm:pr-16 lg:px-10 lg:py-10 lg:pr-10">
          <div className="flex items-baseline gap-4">
            <span className="font-heading text-sm font-medium tracking-[0.2em] text-copper-base">
              {number}
            </span>
            <h3 className="text-h3">{title}</h3>
          </div>
          <p className="max-w-xl text-body text-text-secondary">{description}</p>
        </div>

        <div className="absolute bottom-7 right-0 lg:static lg:flex lg:items-center lg:justify-end lg:pr-1">
          <Link
            href={href}
            aria-label={`Explore ${title}`}
            className="flex h-11 w-11 items-center justify-center bg-copper-base text-dark-900 transition-all duration-300 hover:bg-copper-bright hover:shadow-copper-glow sm:h-12 sm:w-12 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
