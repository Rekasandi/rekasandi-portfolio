import type { Transition, Variants } from "framer-motion";

export const EASING = {
  custom: [0.16, 1, 0.3, 1] as const,
  cinematic: [0.22, 1, 0.36, 1] as const,
  snappy: [0.25, 1, 0.5, 1] as const,
};

export const DURATION = {
  micro: 0.2,
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
};

export const TRANSITION = {
  smooth: {
    duration: DURATION.base,
    ease: EASING.custom,
  } as Transition,
  fast: {
    duration: DURATION.fast,
    ease: EASING.snappy,
  } as Transition,
  cinematic: {
    duration: DURATION.slow,
    ease: EASING.cinematic,
  } as Transition,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION.smooth,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION.smooth,
  },
};

export const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASING.custom,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
