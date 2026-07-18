"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface StatTileProps {
  value: number | string;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatTile({
  value,
  suffix = "",
  label,
  className = "",
}: StatTileProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView || typeof value !== "number") return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`text-center ${className}`}
    >
      <div className="text-h2 text-copper-base mb-2">
        {typeof value === "string" ? value : `${displayValue}${suffix}`}
      </div>
      <p className="text-body text-text-secondary">{label}</p>
    </motion.div>
  );
}
