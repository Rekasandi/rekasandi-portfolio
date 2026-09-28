"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowUp } from "lucide-react";
import type { Project } from "@/data/schema";

interface Props {
  projects: Project[];
}

function getProjectStat(project: Project) {
  const block = project.caseStudyBlocks?.find((item) => item.type === "stats");
  return block?.type === "stats" ? block.items?.[0] : undefined;
}

export default function SelectedProjectsSection({ projects }: Props) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="selected-work" className="w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">
        {projects.map((project) => {
          const stat = getProjectStat(project);
          const displayValue = stat?.value
            ? stat.value.startsWith("+")
              ? stat.value.slice(1)
              : stat.value
            : "";

          return (
            <article
              key={project.id}
              className="border-t border-border py-20 sm:py-24 lg:py-28"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
                {/* Left column */}
                <div className="flex flex-col justify-between lg:col-span-4 min-h-[260px] lg:min-h-0">
                  <div>
                    <Link href={`/work/${project.slug}`} className="inline-block">
                      <h3 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {project.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-8 space-y-6 lg:mt-auto">
                    <p className="max-w-md text-base sm:text-lg font-medium leading-snug tracking-tight text-foreground">
                      {project.summary}
                    </p>

                    {stat && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                          <span
                            className="inline-flex size-5 items-center justify-center rounded-full bg-foreground text-background shrink-0"
                            aria-hidden="true"
                          >
                            <ArrowUp className="size-3 stroke-[2.75]" />
                          </span>
                          <span>{displayValue}</span>
                        </div>
                        <p className="font-serif text-sm sm:text-base leading-normal text-foreground/80">
                          {stat.description || stat.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column */}
                <div className="lg:col-span-8">
                  <Link href={`/work/${project.slug}`} className="block w-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      {project.heroImage ? (
                        <Image
                          src={project.heroImage}
                          alt={`${project.title} — ${project.client}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                          {project.title}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
