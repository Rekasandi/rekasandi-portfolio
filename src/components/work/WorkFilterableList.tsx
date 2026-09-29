"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/schema";
import { useLocale } from "@/lib/i18n/client";

function getCategoryLabel(category: string, locale: string) {
  if (locale !== "id") return category;

  const labels: Record<string, string> = {
    All: "Semua",
    "Digital Product": "Produk Digital",
    "Web Experience": "Pengalaman Web",
    "Custom Software": "Software Kustom",
    "AI & Automation": "AI & Otomasi",
    "Mobile Application": "Aplikasi Mobile",
  };

  return labels[category] || category;
}

export default function WorkFilterableList({
  projects,
}: {
  projects: Project[];
}) {
  const { locale } = useLocale();
  const isIndonesian = locale === "id";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="pt-8 sm:pt-10">
      <div
        role="group"
        aria-label={isIndonesian ? "Filter kategori proyek" : "Filter project categories"}
        className="flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedCategory(category)}
              className={`min-h-10 rounded-full border px-4 py-2 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {getCategoryLabel(category, locale)}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-16" aria-live="polite">
          {filteredProjects.map((project, index) => {
            const imageSrc = project.thumbnailImage || project.heroImage;
            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                aria-label={`${project.title}, ${project.client}`}
                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                <article>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      <div aria-hidden="true" className="absolute inset-0 bg-muted" />
                    )}
                  </div>

                  <div className="pt-5">
                    <div className="mb-3 flex items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span>{getCategoryLabel(project.category, locale)}</span>
                      <span aria-hidden="true" className="h-3 w-px bg-border" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl font-semibold leading-snug tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent-highlight sm:text-2xl">
                        {project.title}
                      </h2>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-highlight motion-reduce:transition-none"
                      />
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.summary}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="border-b border-border py-12" role="status">
          <p className="text-lg font-semibold text-foreground">
            {isIndonesian ? "Belum ada proyek di kategori ini." : "No projects in this category yet."}
          </p>
          {selectedCategory !== "All" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="mt-4 min-h-10 rounded-full border border-border px-4 py-2 text-xs font-mono text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {isIndonesian ? "LIHAT SEMUA PROYEK" : "VIEW ALL PROJECTS"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
