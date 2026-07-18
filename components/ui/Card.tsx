"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cardHoverVariants } from "@/lib/motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'gradient';
  withGlow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  withGlow = true,
  onClick,
  style,
}: CardProps) {
  const variantStyles = {
    default:
      "bg-dark-900 border border-dark-100/10 hover:border-copper-base/30",
    dark: "bg-dark-950 border border-dark-100/5 hover:border-copper-base/20",
    gradient:
      "bg-gradient-to-br from-dark-900 to-dark-950 border border-copper-base/10 hover:border-copper-base/40",
  };

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className={`
        rounded-lg p-6 backdrop-blur-md transition-all duration-300
        ${variantStyles[variant]}
        ${withGlow ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      style={style}
    >
      {children}
    </motion.div>
  );
}
