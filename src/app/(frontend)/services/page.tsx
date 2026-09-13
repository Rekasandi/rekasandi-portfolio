import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getServices } from "@/lib/payload/queries";
import SectionHeading from "@/components/ui/SectionHeading";
import RekaButton from "@/components/ui/RekaButton";

export const metadata: Metadata = {
  title: "Services & Capabilities — REKASANDI Digital Studio",
  description:
    "Explore our full-lifecycle product engineering capabilities across web experiences, software systems, AI automation, and mobile applications.",
};

const ENGAGEMENT_MODELS = [
  {
    number: "01",
    title: "Dedicated Product Team",
    subtitle: "End-to-End Delivery Partnership",
    description:
      "An integrated team of senior architects, product designers, and engineers dedicated to designing, building, and launching your flagship platform from scratch.",
    features: [
      "Dedicated Full-Stack Team",
      "Bi-Weekly Production Releases",
      "Direct Slack/Discord Channel",
      "Complete IP & Code Ownership",
    ],
  },
  {
    number: "02",
    title: "Strategic Velocity Sprint",
    subtitle: "2–4 Week High-Impact Architecture",
    description:
      "Rapid turnaround for critical initiatives: AI feasibility proofs, design system tokenization, performance turnarounds, or high-stakes product prototypes.",
    features: [
      "Rapid Architectural Prototyping",
      "Executive Technical Audits",
      "Design Token Pipeline Setup",
      "Concrete Production Roadmap",
    ],
  },
  {
    number: "03",
    title: "Continuous Evolution Retainer",
    subtitle: "Post-Launch Optimization & Telemetry",
    description:
      "Ongoing product iteration, performance tuning, and feature scaling following market release to ensure your software continually outpaces competitors.",
    features: [
      "24/7 SLA Telemetry & Monitoring",
      "Performance & SEO Optimization",
      "Continuous Design System Sync",
      "Quarterly Feature Sprints",
    ],
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
      {/* Editorial Page Header */}
      <div className="pb-16 max-w-4xl border-b border-[#e2e0d8]">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
            [CAPABILITIES]
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
            STUDIO PRACTICE
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6">
          SERVICES & SPECTRUM.
        </h1>
        <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-3xl font-normal">
          We combine business strategy, editorial art direction, and deep software engineering to build defensible digital products that move companies forward.
        </p>
      </div>

      {/* In-Depth Capability Breakdown */}
      <div className="py-20 flex flex-col gap-24 sm:gap-32">
        {services.map((service) => (
          <div
            key={service.id}
            id={service.slug}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-[#e2e0d8] first:border-t-0 first:pt-0"
          >
            {/* Left Column: Number & Big Title */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest block mb-4">
                  [{service.number} / 05]
                </span>
                <h2 className="heading-l text-3xl sm:text-4xl font-semibold tracking-tight text-[#0a0a0a] mb-4">
                  {service.title}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#e2e0d8] font-mono text-xs text-[#0a0a0a] mb-6 shadow-xs">
                  <span className="font-semibold">IMPACT: {service.stats.value}</span>
                  <span className="text-[#7a7870]">·</span>
                  <span className="text-[#55544e]">{service.stats.label}</span>
                </div>
              </div>

              <div className="hidden lg:block">
                <RekaButton href="/contact" variant="primary" size="sm" arrow="diagonal">
                  COMMISSION SERVICE
                </RekaButton>
              </div>
            </div>

            {/* Right Column: Detailed Breakdown */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div>
                <h3 className="text-xl sm:text-2xl text-[#0a0a0a] font-semibold leading-relaxed mb-4">
                  {service.shortDescription}
                </h3>
                <p className="text-[#55544e] text-base sm:text-lg leading-relaxed font-normal">
                  {service.fullDescription}
                </p>
              </div>

              {/* Two columns: Deliverables vs Capabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm">
                <div>
                  <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-wider block mb-4">
                    TYPICAL DELIVERABLES
                  </span>
                  <ul className="flex flex-col gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#0a0a0a]">
                        <CheckCircle2 className="size-4 text-[#0a0a0a] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#7a7870] uppercase tracking-wider block mb-4">
                    CORE METHODOLOGIES
                  </span>
                  <ul className="flex flex-col gap-3">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-[#55544e]">
                        <span className="text-[#7a7870]">→</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Pill Grid */}
              <div>
                <span className="font-mono text-xs text-[#7a7870] uppercase tracking-wider block mb-3">
                  PRIMARY TECHNOLOGY ECOSYSTEM
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-[4px] bg-[#f7f6f2] border border-[#e2e0d8] text-xs font-mono text-[#55544e]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:hidden pt-4">
                <RekaButton href="/contact" variant="primary" size="md" arrow="diagonal">
                  COMMISSION SERVICE
                </RekaButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Models Section */}
      <div className="py-24 border-t border-[#e2e0d8]">
        <SectionHeading
          number="02"
          eyebrow="Partnership Structure"
          title="How we engage with ambitious clients."
          description="Transparent, collaborative models designed for momentum, predictability, and uncompromising quality."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.number}
              className="p-8 sm:p-10 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-4">
                  MODEL [{model.number}]
                </span>
                <h3 className="text-xl font-semibold text-[#0a0a0a] mb-1">
                  {model.title}
                </h3>
                <h4 className="text-xs font-mono text-[#7a7870] mb-6">
                  {"// "}{model.subtitle}
                </h4>
                <p className="text-sm text-[#55544e] leading-relaxed mb-8">
                  {model.description}
                </p>

                <ul className="flex flex-col gap-2.5 pt-6 border-t border-[#e2e0d8]">
                  {model.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-[#0a0a0a]">
                      <span className="size-1.5 rounded-full bg-[#0a0a0a]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 text-center flex flex-col items-center border-t border-[#e2e0d8]">
        <h2 className="heading-l text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
          Ready to engineer your next digital product?
        </h2>
        <p className="text-[#55544e] text-base max-w-xl mb-8">
          Schedule a strategic technical alignment session with our studio architects.
        </p>
        <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal" magnetic>
          DISCUSS YOUR PROJECT →
        </RekaButton>
      </div>
    </div>
  );
}
