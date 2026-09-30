"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowUp } from "lucide-react";
import type { Project } from "@/data/schema";
import { useLocale } from "@/lib/i18n/client";
import SectionHeading from "@/components/ui/section-heading";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import { sentenceCaseDisplay } from "@/lib/utils";

interface Props {
  projects: Project[];
}

function ProjectSlideshow({ project, locale }: { project: Project; locale: string }) {
  const images = project.selectedWorkImages?.length
    ? project.selectedWorkImages
    : [{ url: project.heroImage }];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const currentImage = images[activeIndex];

  return (
    <Image
      key={currentImage.url}
      src={currentImage.url}
      alt={currentImage.alt || `${sentenceCaseDisplay(project.title, locale)} - ${sentenceCaseDisplay(project.client, locale)}`}
      fill
      sizes="(max-width: 1024px) 100vw, 66vw"
      className="object-cover"
    />
  );
}

function getProjectStat(project: Project) {
  const block = project.caseStudyBlocks?.find((item) => item.type === "stats");
  return block?.type === "stats" ? block.items?.[0] : undefined;
}

export default function SelectedProjectsSection({ projects }: Props) {
  const { locale, dictionary } = useLocale();
  if (!projects || projects.length === 0) return null;

  return (
    <section id="selected-work" className="w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <div className="border-t border-border pt-20 pb-0 sm:pt-24 lg:pt-28">
          <SectionEyebrow>
            {locale === "id" ? "Proyek pilihan" : "Selected work"}
          </SectionEyebrow>
          <SectionHeading
            title={dictionary.home.selectedWork.title}
            description={locale === "id"
              ? "Beberapa produk dan platform yang kami rancang dan bangun bersama tim klien."
              : "A selection of products and platforms we designed and built with client teams."}
            alignment="split"
          />
        </div>
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
              <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="flex min-h-[260px] flex-col justify-between lg:col-span-4 lg:min-h-0">
                  <div>
                    <Link href={`/work/${project.slug}`} className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
                      <h3 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {sentenceCaseDisplay(project.title, locale)}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-8 space-y-6 lg:mt-auto">
                    <p className="max-w-md text-base font-medium leading-snug tracking-tight text-foreground sm:text-lg">
                      {sentenceCaseDisplay(project.summary, locale)}
                    </p>

                    {stat && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                          <span
                            className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
                            aria-hidden="true"
                          >
                            <ArrowUp className="size-3 stroke-[2.75]" />
                          </span>
                          <span>{displayValue}</span>
                        </div>
                        <p className="text-sm leading-normal text-foreground/80 sm:text-base">
                          {sentenceCaseDisplay(stat.description || stat.label, locale)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <Link href={`/work/${project.slug}`} className="block w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                      {project.heroImage ? (
                        <ProjectSlideshow project={project} locale={locale} />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                          {sentenceCaseDisplay(project.title, locale)}
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
