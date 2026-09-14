"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING, DURATION } from "@/lib/motion";

interface TextRevealProps {
  children: string | React.ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function TextReveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className="overflow-hidden inline-block align-bottom">
      <Component
        initial={{ y: "105%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        transition={{
          duration: DURATION.slow,
          ease: EASING.custom,
          delay,
        }}
        className={className}
      >
        {children}
      </Component>
    </span>
  );
}

