"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import RekaButton from "@/components/ui/RekaButton";
import { useCursor } from "@/components/motion/CustomCursor";

export default function SelectedWorkSection() {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section id="selected-work" className="py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
      {/* Section Header */}
      <SectionHeading
        number="02"
        eyebrow="Selected Portfolio"
        title="Products & systems engineered with intent."
        description="A curated selection of category-defining platforms across artificial intelligence, enterprise software, and tactile FinTech."
        alignment="split"
        action={
          <RekaButton href="/work" variant="outline" size="sm" arrow="diagonal">
            VIEW ALL WORK (4)
          </RekaButton>
        }
      />

      {/* Projects Showcase List */}
      <div className="mt-16 flex flex-col gap-24 sm:gap-32">
        {PROJECTS.map((project) => {
          return (
            <div
              key={project.id}
              className="group flex flex-col gap-6"
            >
              {/* Project Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e2e0d8]">
                <div className="flex items-center gap-4 font-mono text-xs">
                  <span className="text-[#0a0a0a] font-semibold">
                    [{project.number}]
                  </span>
                  <span className="text-[#0a0a0a] uppercase tracking-wider font-semibold">
                    {project.title}
                  </span>
                  <span className="text-[#7a7870]">/</span>
                  <span className="text-[#55544e]">{project.client}</span>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-[#7a7870]">
                  <span>{project.category}</span>
                  <span>●</span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Main Image Container with Custom Cursor Trigger */}
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setCursorVariant("project", "VIEW PROJECT ↗")}
                onMouseLeave={resetCursor}
                className="relative block w-full aspect-[16/9] sm:aspect-[21/9] rounded-[8px] overflow-hidden border border-[#e2e0d8] bg-white group cursor-pointer shadow-sm"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 1600px) 100vw, 1600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Floating Bottom Project Card Info */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 pointer-events-none">
                  <div className="max-w-xl">
                    <span className="font-mono text-xs text-[#d7ff3f] uppercase tracking-widest block mb-2 font-semibold drop-shadow-sm">
                      {project.tagline}
                    </span>
                    <h3 className="heading-m text-white font-semibold drop-shadow-md">
                      {project.title}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#e2e0d8] text-xs font-mono text-[#0a0a0a] group-hover:border-[#0a0a0a] transition-colors shadow-md">
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowUpRight className="size-3.5 text-[#0a0a0a] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>

              {/* Tag Badges and Verified Stat Callout */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-[4px] border border-[#e2e0d8] bg-white text-[#55544e] text-xs font-mono shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-[#55544e] max-w-md hidden md:block">
                  {project.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Showcase CTA */}
      <div className="mt-20 text-center">
        <RekaButton href="/work" variant="primary" size="lg" arrow="diagonal" magnetic>
          EXPLORE ALL CASE STUDIES →
        </RekaButton>
      </div>
    </section>
  );
}
