"use client";

import React from "react";
import RekaButton from "@/components/ui/RekaButton";

export default function FinalCTASection() {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@rekasandi.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-36 sm:py-48 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#e2e0d8] text-center flex flex-col items-center">
      <div className="max-w-4xl flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#e2e0d8] bg-white shadow-xs mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
          </span>
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-wider uppercase">
            ACCEPTING NEW ENGAGEMENTS FOR Q2/Q3 2026
          </span>
        </div>

        <h2 className="display-xl font-bold tracking-tight text-[#0a0a0a] mb-6 leading-none">
          LET’S BUILD SOMETHING DEFINITIVE.
        </h2>

        <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
          Have an ambitious digital product, web experience, or AI system in mind? We partner with companies ready to create category-defining work.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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
            onClick={copyEmail}
            className="flex items-center gap-2 px-6 py-4 rounded-[4px] border border-[#e2e0d8] bg-white hover:bg-[#f0efe9] text-[#0a0a0a] text-sm font-mono font-medium tracking-wide transition-all cursor-pointer shadow-xs"
            aria-label="Copy studio email address"
          >
            <span>{copied ? "COPIED TO CLIPBOARD ✓" : "HELLO@REKASANDI.COM"}</span>
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-[#e2e0d8] w-full flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#7a7870]">
          <span>DIRECT STUDIO CHANNEL</span>
          <span>WHATSAPP · EMAIL · SCHEDULED CALL</span>
          <span>JAKARTA / GLOBAL</span>
        </div>
      </div>
    </section>
  );
}
