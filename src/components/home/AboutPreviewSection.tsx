import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import RekaButton from "@/components/ui/RekaButton";

export default function AboutPreviewSection() {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#e2e0d8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5">
          <SectionHeading
            number="06"
            eyebrow="Studio Philosophy"
            title="We care deeply about what we build — and how we build it."
            description="Rekasandi was founded on the belief that digital products should feel as crafted as timeless architecture. We combine engineering rigor with editorial sophistication."
          />

          <div className="mt-8">
            <RekaButton href="/about" variant="outline" size="md" arrow="diagonal">
              ABOUT REKASANDI & TEAM
            </RekaButton>
          </div>
        </div>

        {/* Right Column: Studio Principles & Guarantees */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="p-8 sm:p-10 rounded-[8px] border border-[#e2e0d8] bg-white shadow-sm">
            <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-4">
              {"PRINCIPLE 01 // PRECISION OVER NOISE"}
            </span>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-3">
              We reject gratuitous animation and shallow design trends.
            </h3>
            <p className="text-sm text-[#55544e] leading-relaxed">
              Every transition, layout choice, and color accent in our work exists to clarify user hierarchy or reinforce brand authority. If an element does not serve a deliberate function, we strip it out.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-[8px] border border-[#e2e0d8] bg-white shadow-sm">
            <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-4">
              {"PRINCIPLE 02 // PERFORMANCE AS A DESIGN CONSTRAINT"}
            </span>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-3">
              Visual excellence must never compromise loading speed.
            </h3>
            <p className="text-sm text-[#55544e] leading-relaxed">
              We engineer our applications server-first, keep JavaScript bundles lean, optimize images to sub-100kb responsive formats, and guarantee seamless 60fps interaction on standard consumer devices.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-[8px] border border-[#e2e0d8] bg-white shadow-sm">
            <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-4">
              {"PRINCIPLE 03 // PARTNERSHIP OVER TRANSACTION"}
            </span>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-3">
              We take on a strictly limited number of projects each quarter.
            </h3>
            <p className="text-sm text-[#55544e] leading-relaxed">
              Rather than spreading ourselves across dozens of commodity client contracts, we embed deeply with leadership teams to deliver transformative software that moves businesses forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
