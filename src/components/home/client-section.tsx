"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/client";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import type { HomeLogoData } from "@/lib/payload/queries";

interface ClientSectionProps {
  eyebrow: string;
  heading: string;
  logos: HomeLogoData[];
}

function PlatformItem({ platform }: { platform: HomeLogoData }) {
  return (
    <div className="group flex cursor-default select-none items-center gap-3 px-3 py-2 opacity-60 transition-opacity duration-300 hover:opacity-100">
      <div className="relative flex size-6 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:size-7">
        <Image
          src={platform.src}
          alt={platform.name}
          width={24}
          height={24}
          className={cn(
            "size-5 object-contain sm:size-6",
            platform.invertInDark && "dark:invert",
          )}
        />
      </div>
      <span className="whitespace-nowrap text-sm font-medium tracking-tight text-foreground sm:text-base">
        {platform.name}
      </span>
    </div>
  );
}

export default function ClientSection({ eyebrow, heading, logos }: ClientSectionProps) {
  const { locale } = useLocale();
  const isIndonesian = locale === "id";

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative w-full overflow-hidden border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <SectionEyebrow className="mb-3">
          {eyebrow || (isIndonesian ? "Klien kami" : "Our clients")}
        </SectionEyebrow>
        <h2
          id="clients-heading"
          className="heading-md mx-auto mb-8 max-w-2xl font-semibold tracking-[-0.03em] text-foreground sm:mb-10"
        >
          {heading || (isIndonesian
            ? "Beberapa tim yang pernah bekerja bersama kami."
            : "A few of the teams we’ve worked with.")}
        </h2>

        <div className="relative flex w-full items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:34s] [--gap:3rem] py-2">
            {logos.map((logo) => <PlatformItem key={`${logo.name}-${logo.src}`} platform={logo} />)}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
        </div>
      </div>
    </section>
  );
}
