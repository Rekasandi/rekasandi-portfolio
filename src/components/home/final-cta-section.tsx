"use client";

import React from "react";
import RekaButton from "@/components/ui/reka-button";
import { useLocale } from "@/lib/i18n/client";
import { sentenceCaseDisplay } from "@/lib/utils";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { useReducedMotion } from "motion/react";

interface FinalCTASectionProps {
  headline?: string;
  subtitle?: string;
  contactEmail?: string;
}

export default function FinalCTASection({
  headline = "Have a product to build?",
  subtitle = "Tell us what you’re working on. We’ll talk through the goals, constraints, and a sensible next step.",
  contactEmail = "hello@rekasandi.com",
}: FinalCTASectionProps) {
  const { dictionary, locale } = useLocale();
  const [copied, setCopied] = React.useState(false);
  const [hasRevealed, setHasRevealed] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div
          onPointerEnter={() => setHasRevealed(true)}
          className="relative isolate flex flex-col items-center overflow-hidden rounded-xl border border-border bg-card px-6 py-16 text-center text-foreground shadow-whisper sm:py-20 lg:py-24"
        >
          {hasRevealed && !prefersReducedMotion && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
              <CanvasRevealEffect
                animationSpeed={0.8}
                colors={[[185, 28, 28], [252, 165, 165]]}
                opacities={[0.1, 0.1, 0.15, 0.2, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75]}
                dotSize={3}
                containerClassName="bg-transparent"
                showGradient={false}
              />
            </div>
          )}
          <div className="relative z-10 flex max-w-4xl flex-col items-center">
            <SectionEyebrow>
              {locale === "id" ? "Mulai percakapan" : "Start a conversation"}
            </SectionEyebrow>

            <h2 className="display-xl mb-5 font-semibold leading-tight tracking-[-0.045em] text-foreground">
              {sentenceCaseDisplay(headline, locale)}
            </h2>

            <p className="mb-10 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {sentenceCaseDisplay(subtitle, locale)}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <RekaButton
                href="/contact"
                variant="primary"
                size="lg"
                arrow="diagonal"
              >
                {dictionary.nav.cta}
              </RekaButton>

              <button
                onClick={copyEmail}
                className="flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted shadow-whisper cursor-pointer"
                aria-label="Copy studio email address"
              >
                <span className="font-mono text-xs">{copied ? (locale === "id" ? "Tersalin" : "Copied") : contactEmail}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
