"use client";

import React, { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RekaButton from "@/components/ui/RekaButton";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { useLocale } from "@/lib/i18n/client";
import type { Service } from "@/data/schema";
import type { ServicesPageData } from "@/lib/payload/queries";

export interface ServicesViewProps {
  initialServicesContent: ServicesPageData;
  services: Service[];
}

export default function ServicesView({
  initialServicesContent,
  services,
}: ServicesViewProps) {
  const { locale } = useLocale();
  const serverURL =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const { data: servicesContent } = useLivePreview<ServicesPageData & { engagementModels?: any[] }>({
    initialData: initialServicesContent,
    serverURL,
    depth: 2,
  });

  const engagementModels = useMemo(() => {
    if (Array.isArray(servicesContent.engagementModels)) {
      return servicesContent.engagementModels.map((m: any) => {
        let featuresList: string[] = [];
        if (typeof m.features === "string") {
          featuresList = m.features
            .split("\n")
            .map((f: string) => f.trim())
            .filter(Boolean);
        } else if (Array.isArray(m.features)) {
          featuresList = m.features
            .map((f: any) => (typeof f === "string" ? f : f?.feature || ""))
            .filter(Boolean);
        }
        return {
          number: m.number,
          title: m.title,
          subtitle: m.subtitle,
          description: m.description,
          features: featuresList.length > 0 ? featuresList : (m.features || []),
        };
      });
    }
    return initialServicesContent.engagementModels;
  }, [servicesContent.engagementModels, initialServicesContent.engagementModels]);

  return (
    <div className="py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
      {/* Editorial Page Header */}
      <div className="pb-16 max-w-4xl border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent font-semibold tracking-widest">
            {locale === "id" ? "[LAYANAN]" : "[CAPABILITIES]"}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {locale === "id" ? "PRAKTIK STUDIO" : "STUDIO PRACTICE"}
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-foreground mb-6">
          {servicesContent.headline}
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl font-normal">
          {servicesContent.subheadline}
        </p>
      </div>

      {/* In-Depth Capability Breakdown */}
      <div className="py-20 sm:py-24 lg:py-28 flex flex-col gap-20 sm:gap-28">
        {services.map((service) => (
          <div
            key={service.id}
            id={service.slug}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-border first:border-t-0 first:pt-0"
          >
            {/* Left Column: Number & Big Title */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-accent font-semibold tracking-widest block mb-4">
                  [{service.number} / 05]
                </span>
                <h2 className="heading-l text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
                  {service.title}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface border border-border font-mono text-xs text-foreground mb-6 shadow-xs">
                  <span className="font-semibold">{locale === "id" ? "DAMPAK:" : "IMPACT:"} {service.stats.value}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{service.stats.label}</span>
                </div>
              </div>

              <div className="hidden lg:block">
                <RekaButton href="/contact" variant="primary" size="sm" arrow="diagonal">
                  {locale === "id" ? "PESAN LAYANAN" : "COMMISSION SERVICE"}
                </RekaButton>
              </div>
            </div>

            {/* Right Column: Detailed Breakdown */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div>
                <h3 className="text-xl sm:text-2xl text-foreground font-semibold leading-relaxed mb-4">
                  {service.shortDescription}
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-normal">
                  {service.fullDescription}
                </p>
              </div>

              {/* Two columns: Deliverables vs Capabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-[8px] bg-surface border border-border shadow-sm">
                <div>
                  <span className="font-mono text-xs text-foreground font-semibold uppercase tracking-wider block mb-4">
                    {locale === "id" ? "HASIL KERJA (DELIVERABLES)" : "TYPICAL DELIVERABLES"}
                  </span>
                  <ul className="flex flex-col gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-4">
                    {locale === "id" ? "METODOLOGI UTAMA" : "CORE METHODOLOGIES"}
                  </span>
                  <ul className="flex flex-col gap-3">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent">→</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Pill Grid */}
              <div>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-3">
                  {locale === "id" ? "EKOSISTEM TEKNOLOGI UTAMA" : "PRIMARY TECHNOLOGY ECOSYSTEM"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-[4px] bg-surface-elevated border border-border text-xs font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:hidden pt-4">
                <RekaButton href="/contact" variant="primary" size="md" arrow="diagonal">
                  {locale === "id" ? "PESAN LAYANAN" : "COMMISSION SERVICE"}
                </RekaButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Models Section */}
      <div className="py-20 sm:py-24 lg:py-28 border-t border-border">
        <SectionHeading
          number="02"
          eyebrow={locale === "id" ? "Struktur Kemitraan" : "Partnership Structure"}
          title={locale === "id" ? "Bagaimana kami bermitra dengan klien." : "How we engage with ambitious clients."}
          description={locale === "id" ? "Model kolaboratif dan transparan yang dirancang untuk kecepatan, kepastian, dan kualitas tanpa kompromi." : "Transparent, collaborative models designed for momentum, predictability, and uncompromising quality."}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {engagementModels.map((model: any) => (
            <div
              key={model.number}
              className="p-8 sm:p-10 rounded-[8px] bg-surface border border-border shadow-sm flex flex-col justify-between hover:border-accent transition-all"
            >
              <div>
                <span className="font-mono text-xs text-accent font-semibold uppercase tracking-widest block mb-4">
                  MODEL [{model.number}]
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {model.title}
                </h3>
                <h4 className="text-xs font-mono text-muted-foreground mb-6">
                  {"// "}{model.subtitle}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  {model.description}
                </p>

                <ul className="flex flex-col gap-2.5 pt-6 border-t border-border">
                  {(model.features || []).map((feat: string) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-foreground">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 sm:py-24 lg:py-28 text-center flex flex-col items-center border-t border-border">
        <h2 className="heading-l text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {locale === "id" ? "Siap merekayasa produk digital Anda berikutnya?" : "Ready to engineer your next digital product?"}
        </h2>
        <p className="text-muted-foreground text-base max-w-xl mb-8">
          {locale === "id" ? "Jadwalkan sesi penyelarasan teknis strategis bersama arsitek studio kami." : "Schedule a strategic technical alignment session with our studio architects."}
        </p>
        <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal" magnetic>
          {locale === "id" ? "KONSULTASIKAN PROYEK ANDA →" : "DISCUSS YOUR PROJECT →"}
        </RekaButton>
      </div>
    </div>
  );
}
