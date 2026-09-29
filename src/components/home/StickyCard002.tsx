"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import gsap from "gsap";
import { useLocale } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface CardData {
  id: number | string;
  image: string;
  alt?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const principles = {
  en: [
    {
      title: "Make the complex clear.",
      description:
        "We simplify dense workflows into interfaces people can understand and use.",
    },
    {
      title: "Build for the long run.",
      description:
        "We make considered technical choices so products stay fast, reliable, and easier to maintain.",
    },
    {
      title: "Work as one team.",
      description:
        "We collaborate directly with your team, share decisions early, and stay involved through delivery.",
    },
  ],
  id: [
    {
      title: "Sederhanakan yang rumit.",
      description:
        "Kami merancang alur yang padat menjadi antarmuka yang mudah dipahami dan digunakan.",
    },
    {
      title: "Siapkan untuk jangka panjang.",
      description:
        "Pilihan teknis yang tepat membantu produk tetap cepat, andal, dan mudah dirawat.",
    },
    {
      title: "Bekerja sebagai satu tim.",
      description:
        "Kami terlibat langsung dengan tim Anda, menyepakati keputusan sejak awal, dan mendampingi proses hingga rilis.",
    },
  ],
};

export default function StickyCard002({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const isId = locale === "id";
  const content = principles[isId ? "id" : "en"];
  const items = cards.slice(0, content.length);
  const shouldAutoPlay = isPlaying && isInView && isDocumentVisible && !prefersReducedMotion && items.length > 1;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setIsDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress || !shouldAutoPlay) return;

    const tween = gsap.fromTo(
      progress,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 5,
        ease: "none",
        onComplete: () => setActiveIndex((index) => (index + 1) % items.length),
      },
    );

    return () => {
      tween.kill();
    };
  }, [activeIndex, items.length, shouldAutoPlay]);

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="studio-philosophy-title"
      className={cn("w-full bg-background text-foreground border-t border-border", className)}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <SectionEyebrow>
          {isId ? "Cara kami bekerja" : "How we work"}
        </SectionEyebrow>
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="studio-philosophy-title" className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            {isId
              ? "Produk yang baik dimulai dari keputusan yang tepat."
              : "Good products start with the right decisions."}
          </h2>
          <button
            type="button"
            disabled={prefersReducedMotion || items.length < 2}
            aria-label={prefersReducedMotion
              ? (isId ? "Putar otomatis dimatikan karena preferensi gerakan" : "Auto rotation disabled by motion preference")
              : (isPlaying
                ? (isId ? "Jeda pergantian otomatis" : "Pause automatic rotation")
                : (isId ? "Lanjutkan pergantian otomatis" : "Resume automatic rotation"))}
            aria-pressed={!isPlaying}
            onClick={() => setIsPlaying((playing) => !playing)}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            {isPlaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            <span>{prefersReducedMotion ? (isId ? "Gerak otomatis nonaktif" : "Auto-rotate off") : isPlaying ? (isId ? "Jeda" : "Pause") : (isId ? "Putar" : "Play")}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:flex md:items-start md:gap-3">
          {items.map((card, index) => {
            const active = index === activeIndex;
            return (
              <article
                key={card.id}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setIsPlaying(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className="min-w-0 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 md:transition-[flex] md:duration-700 md:ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ flex: active ? 2 : 1 }}
              >
                <div className={cn("relative min-h-64 overflow-hidden rounded-xl border border-border bg-card transition-[height] duration-500 md:h-[52vh] md:min-h-72", active ? "h-[44vh]" : "h-[32vh]", containerClassName)}>
                  <Image
                    src={card.image}
                    alt={card.alt || ""}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className={cn("object-cover transition-transform duration-700", active ? "scale-100" : "scale-[1.03]", imageClassName)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="mt-4 pt-3">
                  <div className="mb-2 h-px bg-border" aria-hidden="true">
                    {active && <div ref={progressRef} className="h-full origin-left bg-foreground" />}
                  </div>
                  <h3 className="text-base font-medium tracking-tight sm:text-lg">{content[index].title}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300", active ? "opacity-100" : "opacity-70 md:opacity-0")}>
                    {content[index].description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
