"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EASING, DURATION } from "@/lib/motion";
import { useLocale } from "@/lib/i18n/client";

interface IntroSectionProps {
  title?: string;
  description?: string;
  statement?: string;
  paragraph?: string;
  metrics?: { value: string; label: string; desc: string }[];
}

export default function IntroSection({
  title = "Engineered Clarity.",
  description = "Complexity is natural in modern software. Clarity is the deliberate, uncompromising discipline of design engineering.",
  statement = "We turn complex business challenges and multi-system workflows into intuitive, high-velocity digital experiences.",
  paragraph = "Most software house projects suffer from generic templates and fragmented handoffs. We operate as an elite product partner embedded with leadership—bridging raw engineering depth with editorial art direction to deliver software that proves its value on day one.",
  metrics = [
    {
      value: "100%",
      label: "In-House Engineering",
      desc: "Zero third-party outsourcing. Every line of code and pixel crafted by senior studio architects.",
    },
    {
      value: "60 FPS",
      label: "Fluid Motion Target",
      desc: "Hardware-accelerated CSS and GSAP timelines calibrated for instantaneous user feedback.",
    },
    {
      value: "Zero",
      label: "Template Compromise",
      desc: "Bespoke component architectures designed uniquely around each client’s strategic position.",
    },
  ],
}: IntroSectionProps) {
  const { locale } = useLocale();

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Monospace Index & Manifesto */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          <div>
            <span className="mono-eyebrow mb-3 block">
              {locale === "id" ? "[ 01 // MANIFESTO & FILOSOFI ]" : "[ 01 // MANIFESTO & PHILOSOPHY ]"}
            </span>
            <h2 className="heading-m mb-4 font-semibold tracking-[-0.03em] text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          <div className="hidden lg:block pt-16">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground hover:text-accent transition-colors font-semibold"
            >
              <span>{locale === "id" ? "PELAJARI FILOSOFI KAMI" : "DISCOVER OUR PHILOSOPHY"}</span>
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
            <p className="heading-l text-foreground font-medium tracking-tight leading-tight mb-8">
              {statement}
            </p>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-normal max-w-3xl mb-12">
              {paragraph}
            </p>
          </motion.div>

          {/* Value Metric Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border">
            {metrics.map((m, idx) => (
              <div
                key={m.label}
                className={idx < metrics.length - 1 ? "sm:pr-6 sm:border-r border-border" : ""}
              >
                <span className="display-xl text-3xl sm:text-4xl text-foreground font-bold block mb-1 tabular-nums">
                  {m.value}
                </span>
                <span className="font-mono text-xs uppercase text-foreground tracking-wider block font-semibold">
                  {m.label}
                </span>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
