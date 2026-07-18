"use client";

import { motion } from "framer-motion";
import { shouldReduceMotion } from "@/lib/motion";

type CircularVariant = "solid" | "outline" | "muted";

interface CircularStatProps {
  value: string;
  label: string;
  variant?: CircularVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  delay?: number;
}

const sizeMap = {
  sm: "h-28 w-28 md:h-32 md:w-32",
  md: "h-36 w-36 md:h-44 md:w-44",
  lg: "h-44 w-44 md:h-52 md:w-52",
};

const variantMap: Record<CircularVariant, string> = {
  solid:
    "border-transparent bg-copper-base text-dark-900 shadow-copper-glow",
  outline:
    "border-copper-base/50 bg-dark-900/80 text-text-primary backdrop-blur-sm",
  muted:
    "border-dark-100/20 bg-dark-950/90 text-text-primary",
};

export function CircularStat({
  value,
  label,
  variant = "outline",
  size = "md",
  className = "",
  delay = 0,
}: CircularStatProps) {
  const reduce = shouldReduceMotion();

  return (
    <motion.div
      className={`relative flex ${sizeMap[size]} flex-shrink-0 flex-col items-center justify-center rounded-full border ${variantMap[variant]} ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 0.75 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className={`font-heading text-2xl font-medium tracking-tight md:text-3xl ${
          variant === "solid" ? "text-dark-900" : "text-copper-base"
        }`}
      >
        {value}
      </span>
      <span
        className={`mt-1 max-w-[85%] text-center text-[10px] font-semibold uppercase tracking-wider md:text-xs ${
          variant === "solid" ? "text-dark-900/80" : "text-text-secondary"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
