"use client";

import React from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/client";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

interface Platform {
  name: string;
  logo: string;
  invertInDark?: boolean;
}

const PLATFORMS: Platform[] = [
  {
    name: "Google",
    logo: "/images/clients/google.svg",
  },
  {
    name: "Apple",
    logo: "/images/clients/apple.svg",
    invertInDark: true,
  },
  {
    name: "Meta",
    logo: "/images/clients/meta.svg",
  },
  {
    name: "Figma",
    logo: "/images/clients/figma.svg",
  },
  {
    name: "GitHub",
    logo: "/images/clients/github.svg",
    invertInDark: true,
  },
  {
    name: "Notion",
    logo: "/images/clients/notion.svg",
    invertInDark: true,
  },
  {
    name: "Vercel",
    logo: "/images/clients/vercel.svg",
    invertInDark: true,
  },
  {
    name: "Next.js",
    logo: "/images/clients/nextjs.svg",
    invertInDark: true,
  },
  {
    name: "OpenAI",
    logo: "/images/clients/openai.svg",
    invertInDark: true,
  },
  {
    name: "Supabase",
    logo: "/images/clients/supabase.svg",
  },
  {
    name: "Stripe",
    logo: "/images/clients/stripe.svg",
  },
];

function PlatformItem({ platform }: { platform: Platform }) {
  return (
    <div className="group flex items-center gap-3 px-3 py-2 select-none opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default">
      <div className="relative flex size-6 sm:size-7 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <Image
          src={platform.logo}
          alt={platform.name}
          width={24}
          height={24}
          className={cn(
            "size-5 sm:size-6 object-contain",
            platform.invertInDark && "dark:invert"
          )}
        />
      </div>
      <span className="text-sm sm:text-base font-medium tracking-tight text-foreground whitespace-nowrap">
        {platform.name}
      </span>
    </div>
  );
}

export default function ClientSection() {
  const { locale } = useLocale();
  const isIndonesian = locale === "id";

  return (
    <section
      aria-labelledby="platforms-heading"
      className="relative w-full bg-background overflow-hidden border-t border-border"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 text-center">
        <p className="mono-eyebrow mb-2">
          {isIndonesian
            ? "[ EKOSISTEM TEKNOLOGI & PLATFORM ]"
            : "[ TECHNOLOGY ECOSYSTEM & PLATFORMS ]"}
        </p>
        <h2
          id="platforms-heading"
          className="heading-md font-semibold tracking-[-0.03em] text-foreground max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          {isIndonesian
            ? "Teknologi yang dikenal. Pengalaman digital yang lebih baik."
            : "Familiar technology. Better digital experiences."}
        </h2>

        {/* Single Marquee without borders */}
        <div className="relative flex w-full items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:34s] [--gap:3rem] py-2">
            {PLATFORMS.map((platform) => (
              <PlatformItem key={platform.name} platform={platform} />
            ))}
          </Marquee>

          {/* Gradient edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
