"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import RekaButton from "@/components/ui/RekaButton";
import { EASING, DURATION } from "@/lib/motion";

export default function HeroSection() {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#e2e0d8] bg-white shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
          </span>
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-wide">
            AVAILABLE FOR Q2/Q3 2026 ENGAGEMENTS
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-[#7a7870]">
          <span className="text-[#0a0a0a] font-medium">JAKARTA [UTC+7]</span>
          <span>●</span>
          <span className="tabular-nums font-semibold text-[#0a0a0a]">{time || "12:00:00"}</span>
          <span>●</span>
          <span>6.2088° S, 106.8456° E</span>
        </div>
      </motion.div>

      {/* Main Editorial Display Typography (Semantic Single H1) */}
      <div className="my-auto py-12 sm:py-16">
        <h1 className="display-2xl text-[#0a0a0a] tracking-tight flex flex-col">
          {/* Headline Line 1 */}
          <span className="overflow-hidden block">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.15,
              }}
              className="block"
            >
              WE BUILD
            </motion.span>
          </span>

          {/* Headline Line 2 */}
          <span className="overflow-hidden block">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.25,
              }}
              className="block"
            >
              DIGITAL PRODUCTS
            </motion.span>
          </span>

          {/* Headline Line 3 with Accent Tension */}
          <span className="overflow-hidden flex flex-wrap items-baseline gap-x-6">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.35,
              }}
              className="text-[#7a7870]"
            >
              FOR AMBITIOUS
            </motion.span>
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: DURATION.slow,
                ease: EASING.custom,
                delay: 0.45,
              }}
              className="text-[#0a0a0a]"
            >
              BUSINESSES.
            </motion.span>
          </span>
        </h1>
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
