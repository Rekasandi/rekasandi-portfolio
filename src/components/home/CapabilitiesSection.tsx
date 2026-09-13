"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCursor } from "@/components/motion/CustomCursor";

export default function CapabilitiesSection() {
  const [activeServiceId, setActiveServiceId] = useState<string>(
    SERVICES[0].id,
  );
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#20201e]">
      <SectionHeading
        number="03"
        eyebrow="Capabilities & Spectrum"
        title="Full-lifecycle product engineering."
        description="We bridge the gap between strategic vision, human-centered product design, and distributed software engineering."
      />

      {/* Interactive Capabilities Spectrum List */}
      <div className="mt-16 border-t border-[#e2e0d8]">
        {SERVICES.map((service) => {
          const isActive = activeServiceId === service.id;

          return (
            <div
              key={service.id}
              className="border-b border-[#e2e0d8] transition-colors"
            >
              <button
                onClick={() => setActiveServiceId(service.id)}
                onMouseEnter={() => setCursorVariant("pointer")}
                onMouseLeave={resetCursor}
                className="w-full py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left group cursor-pointer"
              >
                <div className="flex items-center gap-6 sm:gap-10">
                  <span
                    className={`font-mono text-sm transition-colors ${
                      isActive
                        ? "text-[#0a0a0a] font-semibold"
                        : "text-[#7a7870] group-hover:text-[#0a0a0a]"
                    }`}
                  >
                    [{service.number}]
                  </span>
                  <h3
                    className={`display-xl text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight transition-all duration-300 ${
                      isActive
                        ? "text-[#0a0a0a] translate-x-2"
                        : "text-[#7a7870] group-hover:text-[#0a0a0a]"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-6 self-start md:self-auto">
                  <span className="font-mono text-xs text-[#7a7870] hidden sm:block">
                    {service.stats.value} {service.stats.label}
                  </span>
                  <div
                    className={`size-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-sm"
                        : "border-[#e2e0d8] text-[#7a7870] group-hover:border-[#0a0a0a] group-hover:text-[#0a0a0a]"
                    }`}
                  >
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </button>

              {/* Expandable Drawer Panel */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pb-12 pt-2"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm">
                      {/* Left: Description & Stat */}
                      <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                        <div>
                          <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-wider block mb-3">
                            SERVICE PROFILE
                          </span>
                          <p className="text-[#0a0a0a] text-lg font-medium leading-relaxed mb-4">
                            {service.shortDescription}
                          </p>
                          <p className="text-[#55544e] text-sm leading-relaxed">
                            {service.fullDescription}
                          </p>
                        </div>

                        <div className="pt-4">
                          <Link
                            href="/services"
                            onMouseEnter={() => setCursorVariant("pointer")}
                            onMouseLeave={resetCursor}
                            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#0a0a0a] hover:underline uppercase font-semibold"
                          >
                            <span>EXPLORE COMPLETE SERVICE SPECIFICATION</span>
                            <ArrowUpRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Deliverables Checklist & Technologies */}
                      <div className="lg:col-span-6 flex flex-col justify-between gap-6 lg:border-l lg:border-[#e2e0d8] lg:pl-8">
                        <div>
                          <span className="font-mono text-xs text-[#7a7870] uppercase tracking-wider block mb-4">
                            TYPICAL DELIVERABLES
                          </span>
                          <ul className="flex flex-col gap-2.5">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-[#0a0a0a]"
                              >
                                <CheckCircle2 className="size-4 text-[#0a0a0a] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-mono text-xs text-[#7a7870] uppercase tracking-wider block mb-2">
                            CORE TECHNOLOGIES
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-[4px] bg-[#f7f6f2] border border-[#e2e0d8] text-xs font-mono text-[#55544e]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
