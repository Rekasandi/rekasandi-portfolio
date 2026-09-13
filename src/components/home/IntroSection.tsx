"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EASING, DURATION } from "@/lib/motion";
import { useCursor } from "@/components/motion/CustomCursor";

export default function IntroSection() {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#e2e0d8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Monospace Index */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
                [01]
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
                Studio Manifesto
              </span>
            </div>
            <h3 className="heading-m text-[#0a0a0a] font-medium tracking-tight mb-6">
              Engineered Clarity.
            </h3>
            <p className="text-[#55544e] text-base leading-relaxed max-w-sm">
              Complexity is natural in technology. Clarity is the deliberate discipline of design engineering.
            </p>
          </div>

          <div className="hidden lg:block pt-16">
            <Link
              href="/about"
              onMouseEnter={() => setCursorVariant("pointer")}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#0a0a0a] hover:underline font-semibold"
            >
              <span>DISCOVER OUR PHILOSOPHY</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Monumental Editorial Statement */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: DURATION.slow, ease: EASING.custom }}
          >
            <h2 className="heading-l text-[#0a0a0a] font-medium tracking-tight leading-tight mb-8">
              We turn complex business challenges and multi-system workflows into intuitive, high-velocity digital experiences.
            </h2>
            <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed font-normal max-w-3xl mb-12">
              Most software house projects suffer from generic templates and disconnected communication. We operate as an elite product team embedded with leadership—bridging raw technology with editorial art direction to deliver software that proves its value on day one.
            </p>
          </motion.div>

          {/* Value Metric Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#e2e0d8]">
            <div>
              <span className="display-xl text-3xl sm:text-4xl text-[#0a0a0a] font-bold block mb-1">
                100%
              </span>
              <span className="font-mono text-xs uppercase text-[#7a7870] tracking-wider block font-semibold">
                In-House Engineering
              </span>
              <p className="text-xs text-[#55544e] mt-2">
                No third-party outsourcing. Every line of code and pixel crafted by senior architects.
              </p>
            </div>

            <div>
              <span className="display-xl text-3xl sm:text-4xl text-[#0a0a0a] font-bold block mb-1">
                60 FPS
              </span>
              <span className="font-mono text-xs uppercase text-[#7a7870] tracking-wider block font-semibold">
                Fluid Motion Target
              </span>
              <p className="text-xs text-[#55544e] mt-2">
                Hardware-accelerated CSS and GSAP timelines calibrated for natural human interaction.
              </p>
            </div>

            <div>
              <span className="display-xl text-3xl sm:text-4xl text-[#0a0a0a] font-bold block mb-1">
                Zero
              </span>
              <span className="font-mono text-xs uppercase text-[#7a7870] tracking-wider block font-semibold">
                Template Compromise
              </span>
              <p className="text-xs text-[#55544e] mt-2">
                Bespoke component architectures designed uniquely around each client’s strategic position.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
