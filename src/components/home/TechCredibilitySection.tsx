"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "@/lib/i18n/client";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

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

type TechGroup = (typeof TECH_GROUPS)[number];

interface TechCredibilitySectionProps {
  techGroups?: {
    category: string;
    items: { name: string; desc: string }[];
  }[];
}

function getToolKey(name: string) {
  const normalized = name.toLocaleLowerCase();
  if (normalized.includes("next.js")) return "next.js";
  if (normalized.includes("typescript")) return "typescript";
  return normalized;
}

function getCategoryLabel(category: string, locale: string) {
  if (locale === "id") {
    const labels: Record<string, string> = {
      "FRONTEND & RUNTIME": "Antarmuka & Runtime",
      "MOTION & CRAFT": "Motion & Interaksi",
      "BACKEND & DATA": "Backend & Data",
      "INTELLIGENCE & CLOUD": "AI & Cloud",
    };
    return labels[category] || category;
  }
  return category.toLocaleLowerCase().replace(/\b\w/g, (letter) => letter.toLocaleUpperCase());
}

export default function TechCredibilitySection({
  techGroups = TECH_GROUPS,
}: TechCredibilitySectionProps) {
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(TECH_GROUPS[0].category);

  const groups = useMemo(() => {
    const merged = new Map<string, TechGroup>(
      TECH_GROUPS.map((group) => [group.category, { ...group, items: [...group.items] }]),
    );

    for (const group of techGroups || []) {
      const current = merged.get(group.category);
      if (!current) continue;

      const items = new Map(current.items.map((item) => [getToolKey(item.name), item]));
      for (const item of group.items) items.set(getToolKey(item.name), item);
      merged.set(group.category, { ...current, items: Array.from(items.values()) });
    }

    return Array.from(merged.values());
  }, [techGroups]);
  const activeGroup = groups.find((group) => group.category === activeCategory) ?? groups[0];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top+=96",
          endTrigger: "[data-tech-content]",
          end: "bottom bottom",
          pin: heading,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      gsap.fromTo(
        "[data-tech-copy]",
        { opacity: 0.25, y: 12 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panel = document.getElementById("technology-stack-panel");
    if (!panel) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-tech-item]",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.035, ease: "power2.out" },
      );
    }, panel);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [activeCategory, groups]);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden border-t border-border bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-28">
        <div ref={headingRef} className="self-start lg:col-span-4">
          <SectionEyebrow>
            {locale === "id" ? "Teknologi yang kami pilih" : "Tools we choose"}
          </SectionEyebrow>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {locale === "id" ? (
              <>Teknologi yang tepat untuk <span className="font-sans font-medium italic">kebutuhan</span> produk.</>
            ) : (
              <>The right tools for the <span className="font-sans font-medium italic">work</span> at hand.</>
            )}
          </h2>
          <p data-tech-copy className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {locale === "id"
              ? "Kami memilih teknologi berdasarkan kebutuhan produk, bukan tren. Berikut beberapa teknologi yang kami gunakan."
              : "We choose technology to fit the product, not the trend. Here are some of the tools we work with."}
          </p>
        </div>

        <div data-tech-content className="min-w-0 lg:col-span-8">
          <div role="group" aria-label={locale === "id" ? "Kategori teknologi" : "Technology categories"} className="grid grid-cols-2 border-y border-border sm:grid-cols-4">
            {groups.map((group) => {
              const active = group.category === activeCategory;
              return (
                <button
                  key={group.category}
                  type="button"
                  aria-pressed={active}
                  aria-controls="technology-stack-panel"
                  onClick={() => setActiveCategory(group.category)}
                  className={`min-h-20 border-r border-border px-3 py-4 text-left text-xs font-medium leading-snug outline-none transition-colors last:border-r-0 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:min-h-24 sm:px-4 sm:text-sm ${active ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                >
                  {getCategoryLabel(group.category, locale)}
                </button>
              );
            })}
          </div>

          {activeGroup && (
            <div id="technology-stack-panel" className="border-b border-border bg-card px-5 py-6 sm:px-7 sm:py-8">
              <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {getCategoryLabel(activeGroup.category, locale)}
                </h3>
                <p className="text-sm text-foreground/70">
                  {locale === "id"
                    ? `${activeGroup.items.length} teknologi dalam stack kami`
                    : `${activeGroup.items.length} technologies in our stack`}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {activeGroup.items.map((item) => (
                  <li key={item.name} data-tech-item className="border-t border-border pt-4">
                    <h4 className="text-base font-semibold tracking-tight sm:text-lg">{item.name}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/70">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <LogoCloud />
      </div>
    </section>
  );
}
