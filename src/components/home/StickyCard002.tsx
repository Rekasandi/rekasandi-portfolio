"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

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
      title: "Precision over noise.",
      description:
        "Every transition, layout, and typographic choice clarifies the experience and strengthens the brand.",
    },
    {
      title: "Performance by design.",
      description:
        "We build fast, resilient products with lean frontends and architecture made to scale.",
    },
    {
      title: "Partnership over transaction.",
      description:
        "We work closely with client teams to solve meaningful problems and create lasting value.",
    },
  ],
  id: [
    {
      title: "Presisi di atas kebisingan.",
      description:
        "Setiap transisi, tata letak, dan pilihan tipografi memperjelas pengalaman serta memperkuat brand.",
    },
    {
      title: "Performa sejak awal.",
      description:
        "Kami membangun produk yang cepat dan tangguh, dengan frontend ringan dan arsitektur yang siap berkembang.",
    },
    {
      title: "Kemitraan, bukan transaksi.",
      description:
        "Kami bekerja erat dengan tim klien untuk menyelesaikan masalah penting dan menciptakan nilai jangka panjang.",
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
  const { locale } = useLocale();
  const isId = locale === "id";
  const content = principles[isId ? "id" : "en"];
  const items = cards.slice(0, content.length);

  if (!items.length) return null;

  return (
    <section
      aria-labelledby="studio-philosophy-title"
      className={cn("w-full bg-background text-foreground border-t border-border", className)}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {isId ? "FILOSOFI STUDIO" : "STUDIO PHILOSOPHY"}
        </p>
        <h2 id="studio-philosophy-title" className="mb-10 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] sm:mb-14 sm:text-4xl lg:text-5xl">
          {isId
            ? "Kami peduli pada apa yang dibangun — dan bagaimana membangunnya."
            : "We care deeply about what we build — and how we build it."}
        </h2>

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
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className="min-w-0 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-ring md:transition-[flex] md:duration-700 md:ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ flex: active ? 2 : 1 }}
              >
                <div className={cn("relative h-[42vh] min-h-72 overflow-hidden rounded-xl border border-border bg-card md:h-[52vh]", containerClassName)}>
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

                <div className="mt-4 border-t border-border pt-3">
                  <div className="mb-2 h-px bg-border">
                    <div className={cn("h-full origin-left bg-foreground transition-transform duration-500", active ? "scale-x-100" : "scale-x-0")} />
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
