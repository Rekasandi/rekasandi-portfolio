import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/payload/queries";
import SectionHeading from "@/components/ui/SectionHeading";
import RekaButton from "@/components/ui/RekaButton";

export const metadata: Metadata = {
  title: "About Studio & Philosophy — REKASANDI",
  description:
    "We are an independent digital product studio focused on building useful, thoughtful, and ambitious digital products for companies worldwide.",
};

const PRINCIPLES = [
  {
    number: "01",
    title: "Quiet Confidence",
    description:
      "We let our work speak through precision, typography, and flawless responsiveness. No gimmicks, no superficial hype, just visible craft.",
  },
  {
    number: "02",
    title: "Performance by Default",
    description:
      "Sub-second load times and 60fps fluidity are not afterthoughts; they are non-negotiable foundations embedded into our architecture from day one.",
  },
  {
    number: "03",
    title: "Bespoke Engineering",
    description:
      "Every company has a unique strategic context. We reject generic templates and cookie-cutter frameworks in favor of tailored digital assets.",
  },
  {
    number: "04",
    title: "Transparent Rigor",
    description:
      "We communicate openly about architecture trade-offs, timelines, and technical decisions. We operate as true partners, not opaque vendors.",
  },
];

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="pb-16 max-w-4xl border-b border-[#e2e0d8]">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
            [ABOUT]
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
            STUDIO IDENTITY
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6">
          WE ARE REKASANDI.
        </h1>
        <p className="text-[#55544e] text-xl sm:text-2xl leading-relaxed max-w-3xl font-normal">
          An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.
        </p>
      </div>

      {/* Manifesto Section */}
      <div className="py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b border-[#e2e0d8]">
        <div className="lg:col-span-5">
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-4">
            {"// STUDIO MANIFESTO"}
          </span>
          <h2 className="heading-l text-3xl sm:text-4xl font-semibold text-[#0a0a0a] leading-tight">
            We care about what we build — and how we build it.
          </h2>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6 text-[#55544e] text-base sm:text-lg leading-relaxed">
          <p>
            The web is flooded with disposable software: identical SaaS templates, clunky enterprise portals, and flashy marketing websites that break when you resize your browser.
          </p>
          <p>
            Rekasandi was formed as an antidote to this commodity mindset. Based in Jakarta with a global standard of execution, we blend Scandinavian editorial minimalism, Swiss typographic discipline, and modern Silicon Valley software engineering.
          </p>
          <p>
            We believe that software should be treated with the same dignity as physical architecture. When you partner with us, you are commissioning a digital product engineered to endure.
          </p>
        </div>
      </div>

      {/* Studio Principles Grid */}
      <div className="py-24 border-b border-[#e2e0d8]">
        <SectionHeading
          number="01"
          eyebrow="Core Values"
          title="The principles that govern our craft."
          description="These four non-negotiable laws guide every technical and aesthetic decision across our studio."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#0a0a0a] font-semibold block mb-4">
                  [{principle.number}]
                </span>
                <h3 className="text-lg font-semibold text-[#0a0a0a] mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-[#55544e] leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership & Architects */}
      <div className="py-24 border-b border-[#e2e0d8]">
        <SectionHeading
          number="02"
          eyebrow="Leadership & Practice"
          title="Meet the architects behind the work."
          description="A senior team of design engineers, systems architects, and creative technologists."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[11px] text-[#7a7870] font-semibold uppercase tracking-wider block mb-2">
                  {member.specialization}
                </span>
                <h3 className="text-xl font-semibold text-[#0a0a0a] mb-1">
                  {member.name}
                </h3>
                <h4 className="text-xs font-mono text-[#7a7870] mb-4">
                  {member.role}
                </h4>
                <p className="text-xs text-[#55544e] leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e2e0d8] font-mono text-[11px] text-[#7a7870]">
                <span>{member.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heritage & Studio Location */}
      <div className="py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-[#e2e0d8]">
        <div>
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-2">
            {"// HEADQUARTERS"}
          </span>
          <h3 className="display-xl text-3xl sm:text-4xl font-bold text-[#0a0a0a] tracking-tight mb-2">
            JAKARTA, INDONESIA.
          </h3>
          <p className="text-[#55544e] text-sm font-mono">
            OPERATING WORLDWIDE · TIMEZONE UTC+7 · REMOTE-FIRST EMBEDDED TEAMS
          </p>
        </div>

        <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal" magnetic>
          WORK WITH US
        </RekaButton>
      </div>
    </div>
  );
}
