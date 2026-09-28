"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Service } from "@/data/schema";
import { SERVICES as FALLBACK_SERVICES } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface CapabilitiesSectionProps {
  services?: Service[];
}

export default function CapabilitiesSection({
  services = FALLBACK_SERVICES,
}: CapabilitiesSectionProps) {
  const list = services && services.length > 0 ? services : FALLBACK_SERVICES;
  const [activeServiceId, setActiveServiceId] = useState<string | null>(
    list[0]?.id || null,
  );
  const { locale } = useLocale();

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <SectionHeading
        number="03"
        eyebrow={locale === "id" ? "Layanan & Spektrum" : "Capabilities & Spectrum"}
        title={locale === "id" ? "Rekayasa produk dari inisiasi hingga peluncuran." : "Full-lifecycle product engineering."}
        description={locale === "id" ? "Kami menjembatani visi strategis, desain produk yang berpusat pada pengguna, dan rekayasa perangkat lunak terdistribusi." : "We bridge the gap between strategic vision, human-centered product design, and distributed software engineering."}
        alignment="split"
      />

      {/* shadcn Accordion Root */}
      <div className="mt-16 border-t border-border w-full">
        <Accordion
          value={activeServiceId ? [activeServiceId] : []}
          onValueChange={(val) => {
            const arr = val as string[];
            setActiveServiceId(arr[0] || null);
          }}
          className="w-full flex flex-col"
        >
          {list.map((service) => {
            const isActive = activeServiceId === service.id;

            return (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="w-full border-b border-border transition-colors"
              >
                <AccordionTrigger
                  className="w-full py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left group cursor-pointer hover:no-underline [&_[data-slot=accordion-trigger-icon]]:hidden"
                >
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span
                      className={`font-mono text-sm transition-colors ${
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      [{service.number}]
                    </span>
                    <h3
                      className={`display-xl text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-foreground translate-x-2"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 self-start md:self-auto">
                    <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                      {service.stats.value} {service.stats.label}
                    </span>
                    <div
                      className={`size-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "border-accent bg-accent text-accent-foreground shadow-sm"
                          : "border-border text-muted-foreground group-hover:border-white/30 group-hover:text-foreground"
                      }`}
                    >
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-[12px] bg-card border border-border shadow-whisper">
                    {/* Left: Description & Stat */}
                    <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                      <div>
                        <span className="font-mono text-xs text-foreground font-semibold uppercase tracking-wider block mb-3">
                          {locale === "id" ? "PROFIL LAYANAN" : "SERVICE PROFILE"}
                        </span>
                        <p className="text-foreground text-lg font-medium leading-relaxed mb-4">
                          {service.shortDescription}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.fullDescription}
                        </p>
                      </div>

                      <div className="pt-4">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-foreground hover:text-accent transition-colors uppercase font-semibold"
                        >
                          <span>{locale === "id" ? "JELAJAHI SPESIFIKASI LAYANAN LENGKAP" : "EXPLORE COMPLETE SERVICE SPECIFICATION"}</span>
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: Deliverables Checklist & Technologies */}
                    <div className="lg:col-span-6 flex flex-col justify-between gap-6 lg:border-l lg:border-border lg:pl-8">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-4">
                          {locale === "id" ? "HASIL KERJA (DELIVERABLES)" : "TYPICAL DELIVERABLES"}
                        </span>
                        <ul className="flex flex-col gap-2.5">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-foreground"
                            >
                              <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                          {locale === "id" ? "TEKNOLOGI UTAMA" : "CORE TECHNOLOGIES"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-[4px] bg-surface-elevated border border-border text-xs font-mono text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      </div>
    </section>
  );
}
