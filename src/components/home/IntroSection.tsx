"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EASING, DURATION } from "@/lib/motion";
import { useLocale } from "@/lib/i18n/client";

interface IntroSectionProps {
  title?: string;
  description?: string;
  statement?: string;
  paragraph?: string;
  metrics?: { value: string; label: string; desc: string }[];
}

export default function IntroSection({
  title = "Good software starts with a clear purpose.",
  description = "We make the important decisions early: what to build, who it serves, and how it should work.",
  statement = "We turn complex business needs into digital products people can use with confidence.",
  paragraph = "From the first product decision to the final release, our strategists, designers, and engineers work as one team. The result is software shaped around real needs—not a template or a handoff chain.",
}: IntroSectionProps) {
  const { locale } = useLocale();

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Monospace Index & Manifesto */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          <div>
            <span className="mono-eyebrow mb-3 block">
              {locale === "id" ? "CARA KAMI BERPIKIR" : "OUR APPROACH"}
            </span>
            <h2 className="heading-m mb-4 font-semibold tracking-[-0.03em] text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm">
              {description}
            </p>
          </div>

          <div className="hidden lg:block pt-16">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground hover:text-accent transition-colors font-semibold"
            >
              <span>{locale === "id" ? "PELAJARI FILOSOFI KAMI" : "DISCOVER OUR PHILOSOPHY"}</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Monumental Editorial Statement */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: DURATION.slow, ease: EASING.custom }}
          >
            <p className="heading-l text-foreground font-medium tracking-tight leading-tight mb-8">
              {statement}
            </p>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-normal max-w-3xl mb-12">
              {paragraph}
            </p>
          </motion.div>


        </div>
      </div>
      </div>
    </section>
  );
}
