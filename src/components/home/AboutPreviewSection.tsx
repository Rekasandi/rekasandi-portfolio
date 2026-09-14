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
        <div className="lg:col-span-7 flex flex-col divide-y divide-[#e2e0d8] border-y border-[#e2e0d8]">
          <div className="py-8 sm:py-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
            <span className="font-mono text-sm font-semibold text-[#0a0a0a] shrink-0 tabular-nums">
              [01]
            </span>
            <div className="flex flex-col gap-2 max-w-xl">
              <h3 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
                Precision over noise.
              </h3>
              <p className="text-base text-[#55544e] leading-relaxed">
                We reject gratuitous animation and shallow design trends. Every transition, layout choice, and typographic weight exists to clarify user hierarchy or reinforce brand authority.
              </p>
            </div>
          </div>

          <div className="py-8 sm:py-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
            <span className="font-mono text-sm font-semibold text-[#0a0a0a] shrink-0 tabular-nums">
              [02]
            </span>
            <div className="flex flex-col gap-2 max-w-xl">
              <h3 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
                Performance as an architectural constraint.
              </h3>
              <p className="text-base text-[#55544e] leading-relaxed">
                Visual excellence must never compromise loading speed. We engineer server-first, keep bundles lean, and guarantee seamless 60fps interaction on standard consumer hardware.
              </p>
            </div>
          </div>

          <div className="py-8 sm:py-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
            <span className="font-mono text-sm font-semibold text-[#0a0a0a] shrink-0 tabular-nums">
              [03]
            </span>
            <div className="flex flex-col gap-2 max-w-xl">
              <h3 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
                Partnership over transaction.
              </h3>
              <p className="text-base text-[#55544e] leading-relaxed">
                We take on a strictly limited number of client engagements each quarter. We embed directly with leadership teams to deliver transformative software that moves businesses forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
