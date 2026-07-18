import { Variants } from "framer-motion";

// Timing constants (in ms)
export const DURATIONS = {
  fast: 200,
  normal: 350,
  slow: 600,
  verySlow: 1000,
};

// Custom easing functions
export const EASING: Record<string, [number, number, number, number]> = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  outBack: [0.175, 0.885, 0.32, 1.275],
  metal: [0.34, 1.56, 0.64, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};

// Stagger settings
export const STAGGER = {
  normal: 0.05,
  medium: 0.1,
  slow: 0.15,
};

// Reveal/scroll-triggered variants
export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal / 1000,
      ease: EASING.smooth,
    },
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.slow / 1000,
      ease: EASING.smooth,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.slow / 1000,
      ease: EASING.smooth,
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal / 1000,
      ease: EASING.smooth,
    },
  },
};

// Hover/tap variants for buttons
export const buttonHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: EASING.smooth },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Container stagger for lists
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal / 1000,
      ease: EASING.smooth,
    },
  },
};

// Card hover lift
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 0 20px rgba(232, 166, 89, 0.1)",
  },
  hover: {
    y: -8,
    boxShadow: "0 0 40px rgba(232, 166, 89, 0.3)",
    transition: {
      duration: DURATIONS.normal / 1000,
      ease: EASING.metal,
    },
  },
};

// Reduce motion check
export const shouldReduceMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Safe variant wrapper — returns disabled variant if prefers-reduced-motion
export const safeVariants = (
  variant: Variants,
  disabledVariant?: Variants,
): Variants => {
  if (shouldReduceMotion()) {
    return (
      disabledVariant || {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    );
  }
  return variant;
};
