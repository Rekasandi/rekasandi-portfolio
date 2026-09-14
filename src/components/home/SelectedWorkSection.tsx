"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/data/schema";
import { useCursor } from "@/components/motion/CustomCursor";
import { useLenis } from "@/components/motion/SmoothScrollProvider";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SelectedWorkSection({
  initialProjects,
}: {
  initialProjects?: Project[];
} = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const { setCursorVariant, resetCursor } = useCursor();
  const { getLenis } = useLenis();

  const projects =
    initialProjects && initialProjects.length > 0 ? initialProjects : PROJECTS;

  // Keep ref in sync for callbacks
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel amount
      const getScrollAmount = () => {
        const total = track.scrollWidth;
        const vw = window.innerWidth;
        return -(total - vw + 120);
      };

      // Total vertical pinned scroll distance: proportional to project count
      const getDistance = () => {
        return window.innerHeight * (projects.length * 1.2);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const newIndex = Math.min(
              projects.length - 1,
              Math.floor(p * projects.length),
            );
            if (newIndex !== activeIndexRef.current) {
              setActiveIndex(newIndex);
            }
          },
        },
      });

      tl.to(track, {
        x: getScrollAmount,
        ease: "none",
      });
    }, section);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [projects]);

  // Click on a bottom vertical client label to smoothly navigate to that project
  const handleClientClick = (index: number) => {
    if (!sectionRef.current) return;
    const triggers = ScrollTrigger.getAll();
    const st = triggers.find((t) => t.trigger === sectionRef.current);
    if (st) {
      // Position slightly into that project's segment
      const targetProgress = (index + 0.1) / projects.length;
      const targetScroll = st.start + (st.end - st.start) * targetProgress;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="relative w-full bg-[#f7f6f2] overflow-hidden"
    >
      {/* Pinned 100vh Fullscreen Gallery Viewport (Studio Loop Architecture) */}
      <div
        ref={containerRef}
        className="h-screen w-full relative flex items-center overflow-hidden bg-[#f7f6f2] select-none"
        style={{ padding: "50px 32px 0" }}
      >
        {/* Horizontal Track of Projects */}
        <div
          ref={trackRef}
          className="flex items-center h-full w-max whitespace-nowrap will-change-transform"
        >
          {projects.map((project, idx) => {
            const isOn = idx === activeIndex;

            return (
              <div
                key={project.id}
                className={cn(
                  "relative h-full flex items-center transition-colors duration-300",
                  isOn ? "text-[#0a0a0a]" : "text-[#0a0a0a]/35",
                )}
                style={{
                  minWidth: "clamp(80px, 10.4vw, 200px)",
                }}
              >
                {/* Vertical Client Label Pinned at Bottom Baseline */}
                <button
                  type="button"
                  onClick={() => handleClientClick(idx)}
                  className="absolute bottom-8 left-6 origin-bottom-left whitespace-nowrap font-medium tracking-tight cursor-pointer focus:outline-none transition-all duration-300 select-none z-30 group"
                  style={{
                    transform: "rotate(-90deg)",
                    fontSize: "clamp(15px, 1.4vw, 22px)",
                    color: isOn ? "#0a0a0a" : "rgba(10, 10, 10, 0.35)",
                    fontWeight: isOn ? 600 : 400,
                  }}
                >
                  <span className="group-hover:text-[#0a0a0a] transition-colors">
                    {project.client}
                  </span>
                </button>

                {/* Media Image Card: Active Item Expands in Stage (Studio Loop Reference) */}
                {isOn && (
                  <Link
                    href={`/work/${project.slug}`}
                    onMouseEnter={() =>
                      setCursorVariant("project", "VIEW CASE ↗")
                    }
                    onMouseLeave={resetCursor}
                    className="group relative block overflow-hidden rounded-2xl border border-[#e2e0d8] bg-white shadow-[0_24px_60px_rgba(10,10,10,0.08)] hover:shadow-[0_32px_75px_rgba(10,10,10,0.18)] hover:border-[#0a0a0a] transition-all duration-500 cursor-pointer animate-in fade-in zoom-in-95 duration-500"
                    style={{
                      aspectRatio: "5 / 8",
                      height: "calc(100vh - 120px)",
                      maxHeight: "820px",
                      margin: "0 1.5vw 24px 3.5vw",
                    }}
                  >
                    {/* Project Hero Image */}
                    <Image
                      src={project.heroImage}
                      alt={`${project.title} — ${project.client}`}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 90vw"
                    />

                    {/* Corner Tag: Project Index Number */}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-[#e2e0d8] font-mono text-[11px] text-[#0a0a0a] font-semibold tracking-wider">
                        [{project.number}]
                      </span>
                    </div>

                    {/* Hover Reveal Overlay: Project Summary & Case Study CTA */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]/30 opacity-0 transition-opacity duration-400 group-hover:opacity-100 p-6 sm:p-8 flex flex-col justify-end text-white">
                      <div className="transform translate-y-4 transition-transform duration-400 group-hover:translate-y-0 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#d7ff3f] uppercase tracking-widest font-semibold">
                            {project.category}
                          </span>
                          <span className="text-white/40">●</span>
                          <span className="font-mono text-[11px] text-white/60">
                            {project.year}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 sm:line-clamp-4 leading-relaxed font-normal whitespace-normal">
                          {project.summary}
                        </p>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#d7ff3f] tracking-wider uppercase">
                            <span>EXPLORE CASE STUDY</span>
                            <ArrowUpRight className="size-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
