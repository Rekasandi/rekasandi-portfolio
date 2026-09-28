"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/lib/i18n/client";
import { LogoCloud } from "@/components/ui/logo-cloud-2";

const TECH_GROUPS = [
  {
    category: "FRONTEND & RUNTIME",
    items: [
      { name: "Next.js 16 App Router", desc: "Server components, parallel routes, streaming" },
      { name: "React 19", desc: "Actions, optimistic updates, canary features" },
      { name: "TypeScript 5", desc: "Strict type enforcement across schemas" },
      { name: "Tailwind CSS v4", desc: "Tokenized design architecture" },
    ],
  },
  {
    category: "MOTION & CRAFT",
    items: [
      { name: "GSAP & ScrollTrigger", desc: "Hardware-accelerated pinned choreography" },
      { name: "Framer Motion", desc: "Spring physics & contextual micro-interactions" },
      { name: "Mapbox / WebGL", desc: "Custom hardware geospatial visualization" },
    ],
  },
  {
    category: "BACKEND & DATA",
    items: [
      { name: "PostgreSQL & pgvector", desc: "Relational persistence & semantic search" },
      { name: "Node.js & Python", desc: "High-throughput microservices & AI pipelines" },
      { name: "Payload CMS", desc: "Type-safe headless editorial engine" },
      { name: "Redis & Kafka", desc: "Distributed pub/sub and sub-millisecond cache" },
    ],
  },
  {
    category: "INTELLIGENCE & CLOUD",
    items: [
      { name: "LangChain & Multi-Agent", desc: "Cognitive task routing and reasoning" },
      { name: "OpenAI / Claude APIs", desc: "Custom fine-tuned cognitive pipelines" },
      { name: "Vercel Edge Network", desc: "Global CDN delivery & serverless functions" },
      { name: "Docker & AWS", desc: "Containerized, scalable cloud deployments" },
    ],
  },
];

interface TechCredibilitySectionProps {
  techGroups?: {
    category: string;
    items: { name: string; desc: string }[];
  }[];
}

export default function TechCredibilitySection({
  techGroups = TECH_GROUPS,
}: TechCredibilitySectionProps) {
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const list = useMemo(() => {
    const groups = new Map(
      TECH_GROUPS.map((group) => [group.category, { ...group, items: [...group.items] }]),
    );

    for (const group of techGroups || []) {
      const existing = groups.get(group.category);
      if (!existing) {
        groups.set(group.category, group);
        continue;
      }

      const items = new Map(existing.items.map((item) => [item.name, item]));
      for (const item of group.items) items.set(item.name, item);
      groups.set(group.category, { ...existing, items: Array.from(items.values()) });
    }

    return Array.from(groups.values());
  }, [techGroups]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=96",
        end: "bottom bottom",
        pin: heading,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      gsap.fromTo(
        "[data-tech-card]",
        { opacity: 0.35, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-tech-grid]",
            start: "top 78%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, [list]);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden border-t border-border bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-40">
        <div ref={headingRef} className="self-start lg:col-span-4">
          <p className="mono-eyebrow mb-5">
            {locale === "id" ? "Teknologi yang kami gunakan" : "The tools behind our work"}
          </p>
          <h2 className="max-w-6xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            {locale === "id" ? (
              <>Teknologi untuk <span className="font-serif font-normal italic">membangun</span> masa depan.</>
            ) : (
              <>Technology to <span className="font-serif font-normal italic">build</span> what&apos;s next.</>
            )}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {locale === "id"
              ? "Kami memilih stack yang tepat untuk setiap tantangan—dari produk digital hingga sistem cerdas yang siap berkembang."
              : "We choose the right stack for each challenge—from digital products to intelligent systems built to scale."}
          </p>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div data-tech-grid className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {list.map((group) => (
              <article
                key={group.category}
                data-tech-card
                className="min-h-64 border-t border-border bg-background py-6 sm:min-h-72 sm:py-8"
              >
                <h3 className="mb-7 text-xs font-mono font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {group.category}
                </h3>
                <ul className="space-y-5">
                  {group.items.map((tech) => (
                    <li key={tech.name}>
                      <h4 className="text-base font-medium tracking-tight sm:text-lg">{tech.name}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tech.desc}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <LogoCloud />
      </div>
    </section>
  );
}
