"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const APPROACH_STEPS = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "Strategic Alignment & Architecture Audit",
    description:
      "We dissect your existing software topology, commercial drivers, operational bottlenecks, and user heuristics. Before proposing code or layouts, we establish concrete success benchmarks and defensible roadmaps.",
    deliverable: "Technical Blueprint & Architecture Audit",
  },
  {
    number: "02",
    title: "DEFINE",
    subtitle: "Product Scope & Core System Schemas",
    description:
      "We translate high-level business goals into concrete technical specifications: relational data models, API contracts, entity schemas, and user journeys stripped of non-essential bloat.",
    deliverable: "Schema Contracts & Scope Matrix",
  },
  {
    number: "03",
    title: "DESIGN",
    subtitle: "Editorial UI & Tactile Micro-Interactions",
    description:
      "We forge an unmistakable visual identity: bespoke typography, tokenized color palettes, and motion choreographies tested on actual screens rather than theoretical Figma canvases.",
    deliverable: "Figma Tokens, Design System & Interactive Prototypes",
  },
  {
    number: "04",
    title: "BUILD",
    subtitle: "Next.js App Router & Type-Safe Engineering",
    description:
      "We write clean, modular, production-hardened TypeScript code. Every component is optimized for sub-second server rendering, zero Cumulative Layout Shift, and full keyboard accessibility.",
    deliverable: "Clean Git Repository & Staging Deployments",
  },
  {
    number: "05",
    title: "LAUNCH",
    subtitle: "Performance Hardening & Zero-Downtime Deployment",
    description:
      "We execute thorough production validation: Core Web Vitals audits, edge CDN caching strategies, automated SEO indexing, and end-to-end security penetration checks.",
    deliverable: "Vercel / AWS Production Deployment & Live Telemetry",
  },
  {
    number: "06",
    title: "EVOLVE",
    subtitle: "Telemetry Analysis & Continuous Iteration",
    description:
      "Digital products are living systems. Post-launch, we monitor user interaction funnels, conversion rates, and server response times to continually sharpen the competitive advantage.",
    deliverable: "Quarterly Velocity Sprints & Optimization Reports",
  },
];

export default function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray<HTMLElement>(".approach-step-card");

      stepElements.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#e2e0d8]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Sticky Narrative Header */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <SectionHeading
            number="04"
            eyebrow="Methodology"
            title="A disciplined path from concept to market authority."
            description="Our process eliminates guesswork. We run structured, high-velocity phases where strategic design and systems engineering evolve concurrently."
          />

          {/* Step Progress Tracker */}
          <div className="mt-12 hidden lg:flex flex-col gap-3 pt-8 border-t border-[#e2e0d8]">
            {APPROACH_STEPS.map((step, idx) => (
              <button
                key={step.number}
                onClick={() => {
                  const target = document.getElementById(`approach-step-${idx}`);
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-4 text-left font-mono text-xs transition-all duration-300 py-1.5 cursor-pointer ${
                  activeStep === idx
                    ? "text-[#0a0a0a] translate-x-2 font-semibold"
                    : "text-[#7a7870] hover:text-[#0a0a0a]"
                }`}
              >
                <span>[{step.number}]</span>
                <span className="tracking-widest uppercase">{step.title}</span>
                {activeStep === idx && (
                  <span className="size-1.5 rounded-full bg-[#0a0a0a] ml-auto animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Scroll-Linked Step Cards */}
        <div className="lg:col-span-7 flex flex-col gap-12 sm:gap-16">
          {APPROACH_STEPS.map((step, index) => {
            const isHighlighted = activeStep === index;

            return (
              <div
                key={step.number}
                id={`approach-step-${index}`}
                className={`approach-step-card p-8 sm:p-12 rounded-[12px] border transition-all duration-500 ${
                  isHighlighted
                    ? "border-[#0a0a0a] bg-white shadow-md"
                    : "border-[#e2e0d8] bg-white shadow-2xs"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <span
                    className={`font-mono text-xs tracking-widest ${
                      isHighlighted ? "text-[#0a0a0a] font-semibold" : "text-[#7a7870]"
                    }`}
                  >
                    PHASE [{step.number}]
                  </span>
                  <span className="font-mono text-xs text-[#7a7870]">
                    STEP {index + 1} OF 6
                  </span>
                </div>

                <h3 className="display-xl text-3xl sm:text-4xl font-semibold tracking-tight text-[#0a0a0a] mb-2">
                  {step.title}
                </h3>
                <h4 className="text-sm font-mono text-[#55544e] font-semibold mb-6">
                  {"// "}{step.subtitle}
                </h4>

                <p className="text-[#55544e] text-base sm:text-lg leading-relaxed mb-8">
                  {step.description}
                </p>

                <div className="pt-6 border-t border-[#e2e0d8] flex items-center justify-between font-mono text-xs">
                  <span className="text-[#7a7870]">KEY ARTIFACT:</span>
                  <span className="text-[#0a0a0a] font-semibold">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
