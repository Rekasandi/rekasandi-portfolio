"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RekaButton from "@/components/ui/RekaButton";
import { useLocale } from "@/lib/i18n/client";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/schema";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  headline?: string;
  subtitle?: string;
  projects?: Project[];
}

export default function HeroSection({
  headline = "WE BUILD DIGITAL PRODUCTS THAT MATTER.",
  subtitle = "We partner with visionary enterprises and founders to engineer category-defining web experiences, scalable software architectures, and autonomous AI systems.",
  projects = [],
}: HeroSectionProps) {
  const { dictionary, locale } = useLocale();
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const featured = (projects && projects.length > 0 ? projects : PROJECTS).filter(
    (project) => Boolean(project.heroImage)
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide photos every 3 seconds
  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [featured.length]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !previewRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        previewRef.current,
        { scale: 0.92, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
      gsap.to(previewRef.current, {
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 60%",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate mx-3 mt-3 min-h-[900px] overflow-hidden rounded-[28px] border border-border bg-surface text-foreground sm:mx-5 sm:rounded-[36px] lg:-mt-20 lg:pt-20"
    >
      {/* Cloud Background Image */}
      <Image
        src="/images/hero-clouds.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover object-top"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/10 via-white/10 to-white/55 dark:from-black/20 dark:via-black/40 dark:to-black/80"
      />

      <div className="relative mx-auto flex max-w-[1600px] flex-col items-center px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pt-28 text-center">
        {/* Spec Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1 text-xs font-mono text-muted-foreground shadow-whisper backdrop-blur-xs">
          <span className="size-1.5 rounded-full bg-link animate-pulse" />
          <span>
            {locale === "id"
              ? "STUDIO PRODUK DIGITAL BERKELAS DUNIA"
              : "WORLD-CLASS DIGITAL PRODUCT STUDIO"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-6xl text-[clamp(2.6rem,6.2vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-foreground text-balance">
          {headline}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal">
            {dictionary.nav.cta}
          </RekaButton>
          <RekaButton href="/work" variant="outline" size="lg" arrow="right">
            {dictionary.home.selectedWork.title}
          </RekaButton>
        </div>

        {/* Photo showcase container with border, cycling photos every 3 seconds */}
        <div
          ref={previewRef}
          className="mt-14 w-full max-w-[1320px] origin-top text-left sm:mt-18 lg:mt-24"
        >
          <div className="relative aspect-[16/9] sm:aspect-[16/8] lg:aspect-[21/9] w-full overflow-hidden rounded-t-[22px] sm:rounded-t-[30px] border border-border border-b-0 bg-background shadow-[0_30px_90px_rgba(25,20,20,0.12)]">
            {featured.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <Link
                  key={project.id || index}
                  href={`/work/${project.slug}`}
                  className={cn(
                    "absolute inset-0 block transition-opacity duration-1000 ease-in-out",
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  )}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1440px) 100vw, 1320px"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.01]"
                  />
                </Link>
              );
            })}

            {/* Subtle slide indicators */}
            {featured.length > 1 && (
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1.5 shadow-whisper backdrop-blur-md">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === activeIndex
                        ? "w-5 bg-foreground"
                        : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
