"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project, ProjectCategory } from "@/data/schema";
import { useCursor } from "@/components/motion/CustomCursor";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "AI & Automation",
  "Web Experience",
  "Custom Software",
  "Mobile Application",
];

export default function WorkFilterableList({
  projects,
}: {
  projects: Project[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const { setCursorVariant, resetCursor } = useCursor();

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Animated Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-12 border-b border-[#e2e0d8]">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              onMouseEnter={() => setCursorVariant("pointer")}
              onMouseLeave={resetCursor}
              className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-colors duration-200 cursor-pointer ${
                isSelected
                  ? "text-white font-semibold"
                  : "text-[#55544e] hover:text-[#0a0a0a]"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeWorkCategory"
                  className="absolute inset-0 rounded-full bg-[#0a0a0a]"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 group"
            >
              {/* Project Card Image */}
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setCursorVariant("project", "VIEW PROJECT ↗")}
                onMouseLeave={resetCursor}
                className="relative block w-full aspect-[16/10] rounded-[8px] overflow-hidden border border-[#e2e0d8] bg-white group cursor-pointer shadow-sm"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={project.thumbnailImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                </div>

                <div className="absolute top-4 left-4 font-mono text-xs text-white px-2.5 py-1 rounded bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/20">
                  [{project.number}]
                </div>

                <div className="absolute bottom-4 right-4 size-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#e2e0d8] flex items-center justify-center text-[#0a0a0a] group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-white transition-all shadow-sm">
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>

              {/* Project Information */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#7a7870]">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                >
                  <h3 className="heading-m text-2xl font-semibold text-[#0a0a0a] group-hover:text-[#55544e] transition-colors">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-sm text-[#55544e] line-clamp-2 leading-relaxed mt-1">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-[4px] bg-[#f7f6f2] border border-[#e2e0d8] text-[11px] font-mono text-[#55544e]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
