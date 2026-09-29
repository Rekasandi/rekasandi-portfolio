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
import { useLocale } from "@/lib/i18n/client";
import { localizeCategory } from "@/lib/i18n/content";
import { sentenceCaseDisplay } from "@/lib/utils";

export interface CaseStudyViewProps {
  initialProject: Project;
  nextProject: Project;
}

export default function CaseStudyView({
  initialProject,
  nextProject,
}: CaseStudyViewProps) {
  const { locale } = useLocale();
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
      <div className="pt-8 pb-4 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="size-3.5" />
          <span>{locale === "id" ? "Kembali ke semua proyek" : "Back to all projects"}</span>
        </Link>
      </div>

      {/* Case Study Hero */}
      <section className="py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 font-mono text-xs text-accent font-semibold mb-4">
          <span>[{project.number}]</span>
          <span>{localizeCategory(project.category, locale)}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{project.year}</span>
        </div>

        <h1 className="display-xl font-bold tracking-tighter text-foreground mb-6">
          {sentenceCaseDisplay(project.title, locale)}
        </h1>

        <p className="text-muted-foreground text-xl sm:text-2xl leading-relaxed max-w-4xl font-normal mb-12">
          {sentenceCaseDisplay(project.tagline, locale)}
        </p>

        {/* Project Metadata Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border font-mono text-xs">
          <div>
            <span className="text-muted-foreground  block mb-1">{locale === "id" ? "Klien" : "Client"}</span>
            <span className="text-foreground font-semibold text-sm">{sentenceCaseDisplay(project.client, locale)}</span>
          </div>
          <div>
            <span className="text-muted-foreground  block mb-1">{locale === "id" ? "Industri" : "Industry"}</span>
            <span className="text-foreground font-semibold text-sm">{localizeCategory(project.industry, locale)}</span>
          </div>
          <div>
            <span className="text-muted-foreground  block mb-1">{locale === "id" ? "Tahun" : "Year"}</span>
            <span className="text-foreground font-semibold text-sm">{project.year}</span>
          </div>
          <div>
            <span className="text-muted-foreground  block mb-1">{locale === "id" ? "Peran utama" : "Core role"}</span>
            <span className="text-foreground font-semibold text-sm">{localizeCategory(project.category, locale)}</span>
          </div>
        </div>

        {/* Full-Width Project Hero Media */}
        <div className="mt-12 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[8px] overflow-hidden border border-border bg-surface shadow-sm">
          <ParallaxImage
            src={project.heroImage}
            alt={sentenceCaseDisplay(project.title, locale)}
            priority
            offset={8}
            viewTransitionName={`project-media-${project.slug}`}
            sizes="(max-width: 1600px) 100vw, 1600px"
          />
        </div>
      </section>

      {/* Case Study Modular Content Blocks */}
      <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto flex flex-col gap-20 sm:gap-28">
        {(project.caseStudyBlocks || []).map((block, idx) => {
          if (block.type === "overview") {
            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-accent font-semibold  tracking-widest block mb-2">
                    {locale === "id" ? "Konteks proyek" : "Project context"}
                  </span>
                  <h3 className="heading-m text-2xl font-semibold text-foreground">
                    {locale === "id" ? "Definisi masalah" : "Problem definition"}
                  </h3>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-8">
                  <p className="text-lg text-foreground font-medium leading-relaxed">
                    {sentenceCaseDisplay(block.challenge, locale)}
                  </p>
                  <div className="p-8 rounded-[8px] bg-surface border border-border shadow-sm">
                    <span className="font-mono text-xs text-foreground font-semibold  tracking-wider block mb-3">
                      {locale === "id" ? "Solusi arsitektur" : "Architecture solution"}
                    </span>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {sentenceCaseDisplay(block.solution, locale)}
                    </p>
                  </div>

                  {block.role && block.role.length > 0 && (
                    <div className="pt-4">
                      <span className="font-mono text-xs text-muted-foreground  tracking-wider block mb-3">
                        {locale === "id" ? "Peran dan hasil kerja" : "Studio deliverables and role"}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {block.role.map((role) => (
                          <span
                            key={role}
                            className="px-3 py-1 rounded-[4px] bg-surface-elevated border border-border text-xs font-mono text-muted-foreground"
                          >
                            {sentenceCaseDisplay(role, locale)}
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
                className="p-8 sm:p-14 rounded-[8px] bg-surface border border-border shadow-sm"
              >
                {block.title && (
                  <span className="font-mono text-xs text-foreground font-semibold  tracking-widest block mb-8">
                    {sentenceCaseDisplay(block.title, locale)}
                  </span>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {block.items.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="display-xl text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-2">
                        {stat.value}
                      </span>
                      <span className="font-mono text-xs  text-muted-foreground font-semibold tracking-wider mb-2">
                        {sentenceCaseDisplay(stat.label, locale)}
                      </span>
                      {stat.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {sentenceCaseDisplay(stat.description, locale)}
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
                <div className="border-b border-border pb-6">
                  <span className="font-mono text-xs text-muted-foreground  tracking-widest block mb-2">
                    {locale === "id" ? "Detail implementasi" : "Implementation details"}
                  </span>
                  <h3 className="heading-l text-2xl sm:text-3xl font-medium text-foreground">
                    {sentenceCaseDisplay(block.heading, locale)}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
                  <div className="p-8 rounded-[8px] bg-surface border border-border shadow-sm">
                    <h4 className="font-mono text-sm text-foreground font-semibold  tracking-wider mb-4">
                      {sentenceCaseDisplay(block.leftTitle, locale)}
                    </h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {sentenceCaseDisplay(block.leftContent, locale)}
                    </p>
                  </div>

                  <div className="p-8 rounded-[8px] bg-surface border border-border shadow-sm">
                    <h4 className="font-mono text-sm text-foreground font-semibold  tracking-wider mb-4">
                      {sentenceCaseDisplay(block.rightTitle, locale)}
                    </h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {sentenceCaseDisplay(block.rightContent, locale)}
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
                className="py-16 px-8 sm:px-16 rounded-[8px] bg-surface border-l-2 border-accent border-y border-r border-border"
              >
                <span className="font-mono text-xs text-muted-foreground  tracking-widest block mb-6">
                  {locale === "id" ? "Testimoni klien" : "Client testimonial"}
                </span>
                <blockquote className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed mb-8">
                  &ldquo;{sentenceCaseDisplay(block.quote, locale)}&rdquo;
                </blockquote>
                <div className="font-mono text-xs">
                  <span className="text-foreground font-semibold block">{block.author}</span>
                  <span className="text-muted-foreground">
                    {sentenceCaseDisplay(block.role, locale)} · {sentenceCaseDisplay(block.company, locale)}
                  </span>
                </div>
              </div>
            );
          }

          if (block.type === "techStack") {
            return (
              <div key={idx} className="flex flex-col gap-6">
                <div className="border-b border-border pb-4">
                  <span className="font-mono text-xs text-muted-foreground  tracking-widest block mb-2">
                    {locale === "id" ? "Teknologi yang digunakan" : "Technology used"}
                  </span>
                  <h3 className="heading-m text-2xl font-semibold text-foreground">
                    {locale === "id" ? "Teknologi produksi" : "Production stack"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {block.technologies.map((tech, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-[8px] bg-surface border border-border shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-[10px] text-muted-foreground  tracking-wider block mb-2 font-semibold">
                          {sentenceCaseDisplay(tech.category, locale)}
                        </span>
                        <h4 className="text-base font-semibold text-foreground mb-2">
                          {sentenceCaseDisplay(tech.name, locale)}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {sentenceCaseDisplay(tech.description, locale)}
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
            const aspectClass = block.aspectRatio === "16/9" ? "aspect-[16/9]" : block.aspectRatio === "21/9" ? "aspect-[21/9]" : "";
            return (
              <div key={idx} className="w-full flex flex-col gap-3">
                <div
                  className={`relative w-full ${aspectClass} rounded-[8px] overflow-hidden border border-border bg-surface shadow-sm`}
                >
                  <Image
                    src={block.mediaUrl}
                    alt={block.caption || ""}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                {(block.caption || block.credit) && (
                  <div className="flex items-center justify-between font-mono text-xs text-muted-foreground px-1">
                    {block.caption && <span>{sentenceCaseDisplay(block.caption, locale)}</span>}
                    {block.credit && <span>{locale === "id" ? "Kredit:" : "Credit:"} {sentenceCaseDisplay(block.credit, locale)}</span>}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </section>

      {/* Next Project Footer Bridge */}
      <section className="py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-border">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground  tracking-widest block mb-3">
              {locale === "id" ? "Proyek berikutnya" : "Next project"}
            </span>
            <Link
              href={`/work/${nextProject.slug}`}
              className="display-xl font-bold tracking-tighter text-foreground hover:text-foreground transition-colors group flex items-center gap-4"
            >
              <span>{sentenceCaseDisplay(nextProject.title, locale)}</span>
              <ArrowUpRight className="size-8 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 text-accent" />
            </Link>
            <p className="text-muted-foreground text-sm mt-2 max-w-md font-mono">
              {sentenceCaseDisplay(nextProject.category, locale)} / {nextProject.year}
            </p>
          </div>

          <RekaButton
            href={`/work/${nextProject.slug}`}
            variant="primary"
            size="md"
            arrow="diagonal"
          >
            {locale === "id" ? "Lihat proyek berikutnya" : "View next project"}
          </RekaButton>
        </div>
      </section>
    </div>
  );
}
