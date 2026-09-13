"use client";

import React from "react";
import RekaButton from "@/components/ui/RekaButton";

export default function FinalCTASection() {
  return (
    <section className="py-36 sm:py-48 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#e2e0d8] text-center flex flex-col items-center">
      <div className="max-w-4xl flex flex-col items-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[#0a0a0a] font-semibold mb-6">
          {"// INITIATE ENGAGEMENT"}
        </span>

        <h2 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6 leading-none">
          LET’S BUILD SOMETHING MEANINGFUL.
        </h2>

        <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
          Have an ambitious digital product, web platform, or AI architecture in mind? We partner with companies ready to create definitive work.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <RekaButton
            href="/contact"
            variant="primary"
            size="lg"
            arrow="diagonal"
            magnetic
          >
            START A PROJECT
          </RekaButton>

          <RekaButton
            href="mailto:hello@rekasandi.com"
            isExternal
            variant="outline"
            size="lg"
            arrow="diagonal"
          >
            HELLO@REKASANDI.COM
          </RekaButton>
        </div>
      </div>
    </section>
  );
}
