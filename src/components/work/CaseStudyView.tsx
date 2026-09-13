"use client";

import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/schema";
import RekaButton from "@/components/ui/RekaButton";
import ParallaxImage from "@/components/motion/ParallaxImage";
import CaseStudyGallery from "@/components/work/CaseStudyGallery";
import { useLivePreview } from "@payloadcms/live-preview-react";

export interface CaseStudyViewProps {
  initialProject: Project;
  nextProject: Project;
}

export default function CaseStudyView({
  initialProject,
  nextProject,
}: CaseStudyViewProps) {
  const serverURL =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const { data: project } = useLivePreview<Project>({
    initialData: initialProject,
    serverURL,
    depth: 2,
  });

  return (
    <div className="w-full">
      {/* Top Breadcrumb & Return Link */}
      <div className="pt-8 pb-4 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#55544e] hover:text-[#0a0a0a] transition-colors font-medium"
        >
          <ArrowLeft className="size-3.5" />
          <span>BACK TO PORTFOLIO ARCHIVE</span>
        </Link>
      </div>

      {/* Case Study Hero */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 font-mono text-xs text-[#0a0a0a] font-semibold mb-4">
          <span>[{project.number}]</span>
          <span>{project.category}</span>
          <span className="text-[#7a7870]">●</span>
          <span className="text-[#7a7870]">{project.year}</span>
        </div>

        <h1 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6">
          {project.title}
        </h1>

        <p className="text-[#55544e] text-xl sm:text-2xl leading-relaxed max-w-4xl font-normal mb-12">
          {project.tagline}
        </p>

        {/* Project Metadata Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[#e2e0d8] font-mono text-xs">
          <div>
            <span className="text-[#7a7870] uppercase block mb-1">CLIENT</span>
            <span className="text-[#0a0a0a] font-semibold text-sm">{project.client}</span>
          </div>
          <div>
            <span className="text-[#7a7870] uppercase block mb-1">INDUSTRY</span>
            <span className="text-[#0a0a0a] font-semibold text-sm">{project.industry}</span>
          </div>
          <div>
            <span className="text-[#7a7870] uppercase block mb-1">YEAR</span>
            <span className="text-[#0a0a0a] font-semibold text-sm">{project.year}</span>
          </div>
          <div>
            <span className="text-[#7a7870] uppercase block mb-1">CORE ROLE</span>
            <span className="text-[#0a0a0a] font-semibold text-sm">{project.category}</span>
          </div>
        </div>

        {/* Full-Width Project Hero Media */}
        <div className="mt-12 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[8px] overflow-hidden border border-[#e2e0d8] bg-white shadow-sm">
          <ParallaxImage
            src={project.heroImage}
            alt={project.title}
            priority
            offset={8}
            viewTransitionName={`project-media-${project.slug}`}
            sizes="(max-width: 1600px) 100vw, 1600px"
          />
        </div>
      </section>

      {/* Case Study Modular Content Blocks */}
      <section className="py-16 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto flex flex-col gap-24 sm:gap-32">
        {(project.caseStudyBlocks || []).map((block, idx) => {
          if (block.type === "overview") {
            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-2">
                    {"01 // THE CHALLENGE & CONTEXT"}
                  </span>
                  <h3 className="heading-m text-2xl font-semibold text-[#0a0a0a]">
                    Problem Definition
                  </h3>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-8">
                  <p className="text-lg text-[#0a0a0a] font-medium leading-relaxed">
                    {block.challenge}
                  </p>
                  <div className="p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm">
                    <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-wider block mb-3">
                      REKASANDI ARCHITECTURAL SOLUTION
                    </span>
                    <p className="text-[#55544e] text-base leading-relaxed">
                      {block.solution}
                    </p>
                  </div>

                  {block.role && block.role.length > 0 && (
                    <div className="pt-4">
                      <span className="font-mono text-xs text-[#7a7870] uppercase tracking-wider block mb-3">
                        STUDIO DELIVERABLES & ROLE
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {block.role.map((role) => (
                          <span
                            key={role}
                            className="px-3 py-1 rounded-[4px] bg-[#f7f6f2] border border-[#e2e0d8] text-xs font-mono text-[#0a0a0a]"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (block.type === "stats") {
            return (
              <div
                key={idx}
                className="p-8 sm:p-14 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm"
              >
                {block.title && (
                  <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-8">
                    {"// "}{block.title}
                  </span>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {block.items.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="display-xl text-4xl sm:text-5xl font-bold text-[#0a0a0a] tracking-tight mb-2">
                        {stat.value}
                      </span>
                      <span className="font-mono text-xs uppercase text-[#55544e] font-semibold tracking-wider mb-2">
                        {stat.label}
                      </span>
                      {stat.description && (
                        <p className="text-xs text-[#7a7870] leading-relaxed">
                          {stat.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (block.type === "twoColumn") {
            return (
              <div key={idx} className="flex flex-col gap-8">
                <div className="border-b border-[#e2e0d8] pb-6">
                  <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-2">
                    02 // ARCHITECTURAL DIVE
                  </span>
                  <h3 className="heading-l text-2xl sm:text-3xl font-medium text-[#0a0a0a]">
                    {block.heading}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
                  <div className="p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm">
                    <h4 className="font-mono text-sm text-[#0a0a0a] font-semibold uppercase tracking-wider mb-4">
                      {block.leftTitle}
                    </h4>
                    <p className="text-[#55544e] text-base leading-relaxed">
                      {block.leftContent}
                    </p>
                  </div>

                  <div className="p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-sm">
                    <h4 className="font-mono text-sm text-[#0a0a0a] font-semibold uppercase tracking-wider mb-4">
                      {block.rightTitle}
                    </h4>
                    <p className="text-[#55544e] text-base leading-relaxed">
                      {block.rightContent}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (block.type === "quote") {
            return (
              <div
                key={idx}
                className="py-16 px-8 sm:px-16 rounded-[8px] bg-[#efeee8] border-l-2 border-[#0a0a0a] border-y border-r border-[#e2e0d8]"
              >
                <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-6">
                  CLIENT TESTIMONIAL
                </span>
                <blockquote className="text-xl sm:text-2xl text-[#0a0a0a] font-medium leading-relaxed mb-8">
                  &ldquo;{block.quote}&rdquo;
                </blockquote>
                <div className="font-mono text-xs">
                  <span className="text-[#0a0a0a] font-semibold block">{block.author}</span>
                  <span className="text-[#55544e]">
                    {block.role} · {block.company}
                  </span>
                </div>
              </div>
            );
          }

          if (block.type === "techStack") {
            return (
              <div key={idx} className="flex flex-col gap-6">
                <div className="border-b border-[#e2e0d8] pb-4">
                  <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-2">
                    {"03 // TECHNOLOGY SPECTRUM"}
                  </span>
                  <h3 className="heading-m text-2xl font-semibold text-[#0a0a0a]">
                    Production Implementation Stack
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {block.technologies.map((tech, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-[8px] bg-white border border-[#e2e0d8] shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-[10px] text-[#7a7870] uppercase tracking-wider block mb-2 font-semibold">
                          {tech.category}
                        </span>
                        <h4 className="text-base font-semibold text-[#0a0a0a] mb-2">
                          {tech.name}
                        </h4>
                        <p className="text-xs text-[#55544e] leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (block.type === "gallery") {
            return (
              <div key={idx}>
                <CaseStudyGallery
                  title={block.title}
                  description={block.description}
                  images={block.images}
                />
              </div>
            );
          }

          if (block.type === "fullWidthMedia") {
            const aspectClass =
              block.aspectRatio === "16/9" ? "aspect-[16/9]" : "aspect-[21/9]";
            return (
              <div key={idx} className="w-full flex flex-col gap-3">
                <div
                  className={`relative w-full ${aspectClass} rounded-[8px] overflow-hidden border border-[#e2e0d8] bg-[#e8e6df] shadow-sm`}
                >
                  <Image
                    src={block.mediaUrl}
                    alt={block.caption || "Architectural case study highlight"}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                {(block.caption || block.credit) && (
                  <div className="flex items-center justify-between font-mono text-xs text-[#7a7870] px-1">
                    {block.caption && <span>{block.caption}</span>}
                    {block.credit && <span>[CREDIT // {block.credit}]</span>}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </section>

      {/* Next Project Footer Bridge */}
      <section className="py-24 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#e2e0d8]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-3">
              NEXT CASE STUDY [{nextProject.number}]
            </span>
            <Link
              href={`/work/${nextProject.slug}`}
              className="display-xl font-bold tracking-tighter text-[#0a0a0a] hover:text-[#55544e] transition-colors group flex items-center gap-4"
            >
              <span>{nextProject.title}</span>
              <ArrowUpRight className="size-8 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </Link>
            <p className="text-[#55544e] text-sm mt-2 max-w-md font-mono">
              {nextProject.category}{" // "}{nextProject.year}
            </p>
          </div>

          <RekaButton
            href={`/work/${nextProject.slug}`}
            variant="primary"
            size="md"
            arrow="diagonal"
          >
            VIEW NEXT PROJECT
          </RekaButton>
        </div>
      </section>
    </div>
  );
}
