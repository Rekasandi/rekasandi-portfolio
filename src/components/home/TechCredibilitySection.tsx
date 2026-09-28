"use client";

import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/client";

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
  const list = techGroups && techGroups.length > 0 ? techGroups : TECH_GROUPS;

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <SectionHeading
        number="05"
        eyebrow={locale === "id" ? "Kedalaman Rekayasa" : "Engineering Depth"}
        title={locale === "id" ? "Fondasi teknis modern dan berdaya tahan tinggi." : "Modern, resilient technical foundations."}
        description={locale === "id" ? "Kami memilih teknologi teruji berkinerja tinggi yang dirancang untuk bertahan melewati transformasi arsitektur dan memberikan latensi sub-detik." : "We select battle-tested, high-performance tools engineered to survive architectural shifts and deliver instantaneous user feedback."}
      />

      {/* Structured Typographic Technical Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map((group) => (
          <div
            key={group.category}
            className="p-6 sm:p-8 rounded-[12px] border border-border bg-card shadow-whisper flex flex-col justify-between transition-all duration-200 hover:border-foreground/30"
          >
            <div>
              <span className="font-mono text-xs text-foreground font-semibold uppercase tracking-widest block mb-6">
                {"// "}{group.category}
              </span>
              <div className="flex flex-col gap-6">
                {group.items.map((tech) => (
                  <div key={tech.name} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-base font-semibold text-foreground mb-1">
                      {tech.name}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
