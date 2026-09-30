"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/schema";
import { useLocale } from "@/lib/i18n/client";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import TerminalAnimationDemo from "@/components/home/terminal-animation-demo";
import { sentenceCaseDisplay } from "@/lib/utils";

interface CapabilitiesSectionProps {
  services?: Service[];
}

function cardLayout(index: number) {
  if (index === 0) return "lg:col-span-7 lg:row-span-2 min-h-[34rem] lg:min-h-0";
  if (index === 1 || index === 2) return "lg:col-span-5 min-h-[20rem]";
  return "lg:col-span-6 min-h-[22rem]";
}

export default function CapabilitiesSection({ services = [] }: CapabilitiesSectionProps) {
  const { locale } = useLocale();

  return (
    <section className="w-full border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <header className="mb-12 max-w-4xl sm:mb-16">
          <SectionEyebrow>
            {locale === "id" ? "Kapabilitas kami" : "Our capabilities"}
          </SectionEyebrow>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {locale === "id"
              ? "Dari ide awal hingga produk siap digunakan."
              : "From an early idea to a product in use."}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {locale === "id"
              ? "Strategi, desain, dan rekayasa berjalan bersama dari awal agar keputusan produk tetap terhubung dengan kebutuhan pengguna dan bisnis."
              : "Strategy, design, and engineering work together from the start, keeping product decisions grounded in user and business needs."}
          </p>
        </header>

        <div className="grid grid-flow-dense grid-cols-1 gap-4 lg:auto-rows-[minmax(20rem,auto)] lg:grid-cols-12 lg:gap-5">
          {services.map((service, index) => {
            const cardClass = `group relative isolate flex overflow-hidden rounded-xl border border-border bg-card text-foreground outline-none transition-colors hover:border-red-500/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 ${cardLayout(index)}`;

            if (index === 0) {
              return (
                <article key={service.id} className={cardClass} aria-label={sentenceCaseDisplay(service.title, locale)}>
                  <TerminalAnimationDemo />
                </article>
              );
            }

            return (
              <Link key={service.id} href={`/services#${service.slug}`} className={cardClass}>
                <span
                  aria-hidden="true"
                  className="absolute bottom-8 left-0 top-8 z-10 w-1 origin-center scale-y-0 bg-red-500 transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <div className="flex min-h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <span className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white group-focus-visible:border-red-500 group-focus-visible:bg-red-500 group-focus-visible:text-white">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl lg:text-4xl">
                      {sentenceCaseDisplay(service.title, locale)}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {sentenceCaseDisplay(service.shortDescription, locale)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
