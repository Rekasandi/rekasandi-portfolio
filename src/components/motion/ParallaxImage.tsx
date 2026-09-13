"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  offset?: number; // Shallow offset in percentage (default: 8%)
  viewTransitionName?: string;
}

export default function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className,
  containerClassName,
  offset = 8,
  viewTransitionName,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate subtle, physics-grounded vertical translation (-offset% to +offset%)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${offset}%`, `${offset}%`]
  );

  return (
    <div
      ref={containerRef}
      style={
        viewTransitionName
          ? ({ viewTransitionName } as React.CSSProperties)
          : undefined
      }
      className={cn("relative w-full h-full overflow-hidden", containerClassName)}
    >
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y }}
        className="relative w-full h-full scale-[1.16] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", className)}
        />
      </motion.div>
    </div>
  );
}

