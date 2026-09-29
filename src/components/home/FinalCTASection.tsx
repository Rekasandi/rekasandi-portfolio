"use client";

import React from "react";
import RekaButton from "@/components/ui/RekaButton";
import { useLocale } from "@/lib/i18n/client";

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

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="flex flex-col items-center rounded-2xl sm:rounded-3xl border border-border bg-card px-6 py-16 sm:py-20 lg:py-24 text-center text-foreground shadow-whisper">
          <div className="max-w-4xl flex flex-col items-center">
            <span className="mono-eyebrow mb-4 block">
              {locale === "id" ? "MULAI PERCAKAPAN" : "START A CONVERSATION"}
            </span>

            <h2 className="display-xl mb-5 font-semibold leading-tight tracking-[-0.045em] text-foreground">
              {headline}
            </h2>

            <p className="mb-10 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              {subtitle}
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
                <span className="font-mono text-xs">{copied ? (locale === "id" ? "TERSALIN KE PAPAN KLIP ✓" : "COPIED TO CLIPBOARD ✓") : contactEmail}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
