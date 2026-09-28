"use client";

import React, { useMemo } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import RekaButton from "@/components/ui/RekaButton";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { useLocale } from "@/lib/i18n/client";
import type { TeamMember } from "@/data/schema";
import type { AboutPageData } from "@/lib/payload/queries";

export interface AboutViewProps {
  initialAboutContent: AboutPageData;
  teamMembers: TeamMember[];
}

export default function AboutView({
  initialAboutContent,
  teamMembers,
}: AboutViewProps) {
  const { locale } = useLocale();
  const serverURL =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const { data: aboutContent } = useLivePreview<AboutPageData & { manifestoParagraphs?: any[] }>({
    initialData: initialAboutContent,
    serverURL,
    depth: 2,
  });

  const manifestoParagraphs = useMemo(() => {
    if (Array.isArray(aboutContent.manifestoParagraphs)) {
      return aboutContent.manifestoParagraphs.map((p: any) =>
        typeof p === "string" ? p : p?.paragraph || ""
      ).filter(Boolean);
    }
    return initialAboutContent.manifestoParagraphs;
  }, [aboutContent.manifestoParagraphs, initialAboutContent.manifestoParagraphs]);

  const principles = aboutContent.principles || initialAboutContent.principles;

  return (
    <div className="py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="pb-16 max-w-4xl border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent font-semibold tracking-widest">
            {locale === "id" ? "[TENTANG]" : "[ABOUT]"}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {locale === "id" ? "IDENTITAS STUDIO" : "STUDIO IDENTITY"}
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-foreground mb-6">
          {aboutContent.headline}
        </h1>
        <p className="text-muted-foreground text-xl sm:text-2xl leading-relaxed max-w-3xl font-normal">
          {aboutContent.subheadline}
        </p>
      </div>

      {/* Manifesto Section */}
      <div className="py-20 sm:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-b border-border">
        <div className="lg:col-span-5">
          <span className="font-mono text-xs text-foreground font-semibold uppercase tracking-widest block mb-4">
            {locale === "id" ? "// MANIFESTO STUDIO" : "// STUDIO MANIFESTO"}
          </span>
          <h2 className="heading-l text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
            {aboutContent.manifestoTitle}
          </h2>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
          {manifestoParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Studio Principles Grid */}
      <div className="py-20 sm:py-24 lg:py-28 border-b border-border">
        <SectionHeading
          number="01"
          eyebrow={locale === "id" ? "Nilai Inti" : "Core Values"}
          title={locale === "id" ? "Prinsip-prinsip yang memandu karya kami." : "The principles that govern our craft."}
          description={locale === "id" ? "Empat aturan mutlak ini memandu setiap keputusan teknis dan estetika di studio kami." : "These four non-negotiable laws guide every technical and aesthetic decision across our studio."}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="p-8 rounded-[8px] bg-surface border border-border shadow-sm flex flex-col justify-between hover:border-accent transition-all"
            >
              <div>
                <span className="font-mono text-xs text-accent font-semibold block mb-4">
                  [{principle.number}]
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership & Architects */}
      <div className="py-20 sm:py-24 lg:py-28 border-b border-border">
        <SectionHeading
          number="02"
          eyebrow={locale === "id" ? "Kepemimpinan & Praktik" : "Leadership & Practice"}
          title={locale === "id" ? "Sosok arsitek di balik setiap karya." : "Meet the architects behind the work."}
          description={locale === "id" ? "Tim senior beranggotakan design engineer, arsitek sistem, dan technologist kreatif." : "A senior team of design engineers, systems architects, and creative technologists."}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-8 rounded-[8px] bg-surface border border-border shadow-sm flex flex-col justify-between hover:border-accent transition-all"
            >
              <div>
                <span className="font-mono text-[11px] text-muted-foreground font-semibold uppercase tracking-wider block mb-2">
                  {member.specialization}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <h4 className="text-xs font-mono text-muted-foreground mb-4">
                  {member.role}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-border font-mono text-[11px] text-muted-foreground">
                <span>{member.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heritage & Studio Location */}
      <div className="py-20 sm:py-24 lg:py-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-border">
        <div>
          <span className="font-mono text-xs text-foreground font-semibold uppercase tracking-widest block mb-2">
            {locale === "id" ? "// KANTOR PUSAT" : "// HEADQUARTERS"}
          </span>
          <h3 className="display-xl text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
            JAKARTA, INDONESIA.
          </h3>
          <p className="text-muted-foreground text-sm font-mono">
            {locale === "id" ? "BEROPERASI SECARA GLOBAL · ZONA WAKTU WIB (UTC+7) · TIM TERINTEGRASI REMOTE-FIRST" : "OPERATING WORLDWIDE · TIMEZONE UTC+7 · REMOTE-FIRST EMBEDDED TEAMS"}
          </p>
        </div>

        <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal" magnetic>
          {locale === "id" ? "KOLABORASI DENGAN KAMI" : "WORK WITH US"}
        </RekaButton>
      </div>
    </div>
  );
}
