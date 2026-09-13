"use client";

import React from "react";
import { motion } from "framer-motion";

const FOUNDATIONS = [
  { name: "NEXT.JS 16", tag: "RSC ARCHITECTURE", spec: "v16.3" },
  { name: "TYPESCRIPT", tag: "STRICT CONTRACTS", spec: "v5.9" },
  { name: "POSTGRESQL", tag: "RELATIONAL PERSISTENCE", spec: "v17" },
  { name: "REACT 19", tag: "CONCURRENT CORE", spec: "CANARY" },
  { name: "LANGCHAIN", tag: "AGENTIC REASONING", spec: "HYBRID" },
  { name: "PYTHON", tag: "HIGH-THROUGHPUT ML", spec: "3.12" },
  { name: "DOCKER & AWS", tag: "CONTAINER RUNTIME", spec: "CLOUD" },
  { name: "PAYLOAD CMS", tag: "HEADLESS PERSISTENCE", spec: "v3.x" },
];

export default function EcosystemTrustStrip() {
  return (
    <section
      aria-label="Core Architectural Foundations"
      className="w-full border-y border-[#e2e0d8] bg-[#f5f4ef] py-6 overflow-hidden select-none"
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Indicator Label */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
          </span>
          <span className="font-mono text-xs font-semibold text-[#0a0a0a] tracking-widest uppercase">
            [SYS // CORE ARCHITECTURE]
          </span>
          <span className="hidden sm:inline font-mono text-xs text-[#7a7870]">
            ENTERPRISE GRADE
          </span>
        </div>

        {/* Foundation Badges Grid / Strip */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {FOUNDATIONS.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-white border border-[#e2e0d8] shadow-xs group cursor-default transition-colors hover:border-[#0a0a0a]"
            >
              <span className="font-mono text-xs font-bold text-[#0a0a0a] tracking-tight group-hover:text-black">
                {tech.name}
              </span>
              <span className="h-2.5 w-[1px] bg-[#e2e0d8]" />
              <span className="font-mono text-[10px] text-[#7a7870] uppercase tracking-wider">
                {tech.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
