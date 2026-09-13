"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import RekaButton from "@/components/ui/RekaButton";
import { EASING, DURATION } from "@/lib/motion";

export default function HeroSection() {
  const scrollToWork = () => {
    const workSection = document.getElementById("selected-work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between px-6 sm:px-10 md:px-16 pt-12 pb-16 max-w-[1600px] mx-auto overflow-hidden">
      {/* Top Ambient Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, ease: EASING.custom, delay: 0.7 }}
        className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-[#e2e0d8] pb-6"
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#e2e0d8] bg-white shadow-sm">
          <span className="size-2 rounded-full bg-[#d7ff3f] border border-[#0a0a0a]/30 animate-pulse" />
          <span className="font-mono text-xs text-[#55544e] tracking-wide">
            AVAILABLE FOR Q2/Q3 ENGAGEMENTS
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 font-mono text-xs text-[#7a7870]">
          <span>JAKARTA [UTC+7]</span>
          <span>●</span>
          <span>EST. 2024</span>
        </div>
      </motion.div>

      {/* Main Massive Editorial Display Typography */}
      <div className="my-auto py-12 sm:py-16">
        <div className="flex flex-col">
          {/* Headline Line 1 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.15,
              }}
              className="display-2xl text-[#0a0a0a] tracking-tighter"
            >
              WE BUILD
            </motion.h1>
          </div>

          {/* Headline Line 2 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.25,
              }}
              className="display-2xl text-[#0a0a0a] tracking-tighter"
            >
              DIGITAL PRODUCTS
            </motion.h1>
          </div>

          {/* Headline Line 3 with Accent Tension */}
          <div className="overflow-hidden flex flex-wrap items-baseline gap-x-6">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.35,
              }}
              className="display-2xl text-[#7a7870] tracking-tighter"
            >
              FOR AMBITIOUS
            </motion.h1>
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.45,
              }}
              className="display-2xl text-[#0a0a0a] tracking-tighter"
            >
              BUSINESSES.
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Bottom Row: Supporting Description & Magnetic Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: DURATION.slow,
          ease: EASING.custom,
          delay: 0.6,
        }}
        className="pt-8 border-t border-[#e2e0d8] flex flex-col lg:flex-row lg:items-end justify-between gap-8"
      >
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0a0a0a] font-semibold block mb-2">
            [PRODUCT ENGINEERING STUDIO]
          </span>
          <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed font-normal">
            We partner with visionary enterprises and founders to engineer category-defining web experiences, scalable software architectures, and autonomous AI systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <RekaButton
            href="/contact"
            variant="primary"
            size="lg"
            arrow="diagonal"
            magnetic
          >
            START A PROJECT
          </RekaButton>

          <button
            onClick={scrollToWork}
            className="flex items-center gap-2 px-6 py-4 rounded-[4px] border border-[#e2e0d8] bg-white hover:bg-[#f0efe9] text-[#0a0a0a] text-sm font-medium tracking-wide transition-all group cursor-pointer shadow-sm"
          >
            <span>SELECTED WORK</span>
            <ArrowDown className="size-4 text-[#0a0a0a] transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
