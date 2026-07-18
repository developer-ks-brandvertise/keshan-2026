"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { shouldReduceMotion } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  duration = 0.6,
  className = "",
}: RevealProps) {
  const reduceMotion = shouldReduceMotion();

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={variants[variant]}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
