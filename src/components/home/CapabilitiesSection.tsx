"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/schema";
import { SERVICES as FALLBACK_SERVICES } from "@/data/services";
import { useLocale } from "@/lib/i18n/client";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesSectionProps {
  services?: Service[];
}

const serviceImages: Record<string, { src: string; alt: string; position?: string }> = {
  "digital-products": {
    src: "/images/projects/kroma-design-system.jpg",
    alt: "Digital product interface and design system",
  },
  "web-experiences": {
    src: "/images/services/web-experiences.jpg",
    alt: "Editorial website displayed in a design studio",
  },
  "custom-software": {
    src: "/images/projects/volta-fleet-os.jpg",
    alt: "Fleet operations and telemetry dashboard",
  },
  "ai-automation": {
    src: "/images/projects/aether-ai.jpg",
    alt: "AI orchestration dashboard with connected model nodes",
  },
  "mobile-applications": {
    src: "/images/projects/kroma-design-system.png",
    alt: "Mobile-ready digital product interface",
  },
};

function cardLayout(index: number) {
  if (index === 0) return "lg:col-span-7 lg:row-span-2 min-h-[34rem] lg:min-h-0";
  if (index === 1 || index === 2) return "lg:col-span-5 min-h-[20rem]";
  return "lg:col-span-6 min-h-[22rem]";
}

export default function CapabilitiesSection({
  services = FALLBACK_SERVICES,
}: CapabilitiesSectionProps) {
  const list = services.length > 0 ? services : FALLBACK_SERVICES;
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLImageElement>("[data-capability-image]").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 0.86, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top 90%",
              end: "top 42%",
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, [list]);

  return (
    <section ref={sectionRef} className="w-full border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <header className="mb-12 max-w-4xl sm:mb-16">
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
          {list.map((service, index) => {
            const image = serviceImages[service.slug] ?? serviceImages["digital-products"];

            return (
              <Link
                key={service.id}
                href={`/services#${service.slug}`}
                className={`group relative isolate flex overflow-hidden rounded-xl bg-neutral-950 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 ${cardLayout(index)}`}
              >
                <Image
                  data-capability-image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes={index === 0
                    ? "(max-width: 1024px) 100vw, 58vw"
                    : "(max-width: 1024px) 100vw, 42vw"}
                  className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />

                <div className="flex min-h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <span className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="max-w-xl">
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl lg:text-4xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                      {service.shortDescription}
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
