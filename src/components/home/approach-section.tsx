"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/client";
import { sentenceCaseDisplay } from "@/lib/utils";
import SectionEyebrow from "@/components/ui/section-eyebrow";

export interface ApproachStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

interface ApproachSectionProps {
  steps?: ApproachStep[];
}

export default function ApproachSection({ steps = [] }: ApproachSectionProps) {
  const { locale } = useLocale();
  const isIndonesian = locale === "id";
  const [activeStep, setActiveStep] = useState(0);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      },
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [steps.length]);

  if (!steps.length) {
    return null;
  }

  const scrollToStep = (index: number) => {
    const el = document.getElementById(`approach-step-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      aria-labelledby="approach-heading"
      className="w-full border-t border-border bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Sticky Narrative Header & Tracker */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionEyebrow>
              {isIndonesian ? "Metodologi kerja" : "Our methodology"}
            </SectionEyebrow>
            <h2
              id="approach-heading"
              className="heading-md mb-4 font-semibold tracking-[-0.035em] text-foreground"
            >
              {isIndonesian
                ? "Alur terstruktur dari konsep awal hingga produk siap rilis."
                : "A disciplined path from concept to market authority."}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {isIndonesian
                ? "Proses kami mengeliminasi spekulasi. Kami menjalankan fase terstruktur di mana strategi produk, desain teruji, dan rekayasa sistem bergerak bersama."
                : "Our process eliminates guesswork. We run structured, high-velocity phases where strategic design and systems engineering evolve concurrently."}
            </p>

            {/* Step Progress Tracker (Desktop) */}
            <nav
              aria-label={isIndonesian ? "Daftar tahapan metodologi" : "Methodology step tracker"}
              className="mt-10 hidden flex-col gap-1.5 border-t border-border pt-8 lg:flex"
            >
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={`${step.number}-${step.title}`}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className={`flex items-center gap-3.5 py-1.5 text-left font-mono text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "translate-x-1.5 font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={isActive ? "text-red-700 dark:text-red-400" : ""}>
                      [{step.number || `0${idx + 1}`}]
                    </span>
                    <span className="tracking-wider uppercase">
                      {sentenceCaseDisplay(step.title, locale)}
                    </span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="ml-auto size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Column: Step Cards */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-7">
            {steps.map((step, index) => {
              const isCurrent = activeStep === index;
              return (
                <article
                  key={`${step.number}-${step.title}`}
                  id={`approach-step-${index}`}
                  data-index={index}
                  ref={(node) => {
                    cardsRef.current[index] = node;
                  }}
                  className={`rounded-xl border bg-card p-6 shadow-whisper transition-all duration-300 sm:p-8 lg:p-10 ${
                    isCurrent
                      ? "border-red-500/50 ring-1 ring-red-500/20"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <div className="mb-4 flex items-baseline justify-between gap-4 font-mono text-xs">
                    <span
                      className={`tracking-wider uppercase ${
                        isCurrent
                          ? "font-semibold text-red-700 dark:text-red-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {isIndonesian ? "FASE" : "PHASE"} [{step.number || `0${index + 1}`}]
                    </span>
                    <span className="text-muted-foreground">
                      {isIndonesian ? "LANGKAH" : "STEP"} {index + 1} / {steps.length}
                    </span>
                  </div>

                  <h3 className="mb-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {sentenceCaseDisplay(step.title, locale)}
                  </h3>

                  {step.subtitle && (
                    <p className="mb-4 font-mono text-xs font-medium text-red-700 dark:text-red-400 sm:text-sm">
                      {"// "}{sentenceCaseDisplay(step.subtitle, locale)}
                    </p>
                  )}

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {sentenceCaseDisplay(step.description, locale)}
                  </p>

                  {step.deliverable && (
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 font-mono text-xs">
                      <span className="tracking-wider text-muted-foreground uppercase">
                        {isIndonesian ? "LUARAN UTAMA:" : "KEY ARTIFACT:"}
                      </span>
                      <span className="font-semibold text-foreground">
                        {sentenceCaseDisplay(step.deliverable, locale)}
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
