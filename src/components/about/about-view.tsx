"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import RekaButton from "@/components/ui/reka-button";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { useLocale } from "@/lib/i18n/client";
import type { TeamMember } from "@/data/schema";
import type { AboutPageData } from "@/lib/payload/queries";
import { sentenceCaseDisplay } from "@/lib/utils";

interface AboutPreviewContent extends Omit<AboutPageData, "manifestoParagraphs"> {
  manifestoParagraphs?: (string | { paragraph?: string | null })[];
}

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

  const { data: aboutContent } = useLivePreview<AboutPreviewContent>({
    initialData: initialAboutContent,
    serverURL,
    depth: 2,
  });

  const manifestoParagraphs = useMemo(() =>
    (aboutContent.manifestoParagraphs || [])
      .map((paragraph) => typeof paragraph === "string" ? paragraph : paragraph.paragraph || "")
      .filter(Boolean),
    [aboutContent.manifestoParagraphs],
  );

  const principles = aboutContent.principles || [];

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <section className="border-b border-border pb-16 sm:pb-20">
        <div className="max-w-4xl">
          <SectionEyebrow>
            {locale === "id" ? "Identitas studio" : "Studio identity"}
          </SectionEyebrow>
          <h1 className="max-w-none text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl md:whitespace-nowrap lg:text-6xl">
            {sentenceCaseDisplay(aboutContent.headline, locale)}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            {sentenceCaseDisplay(aboutContent.subheadline, locale)}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-b border-border py-16 sm:gap-12 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">
            {sentenceCaseDisplay(aboutContent.manifestoTitle, locale)}
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-7">
          {manifestoParagraphs.map((paragraph, index) => (
            <p key={index}>{sentenceCaseDisplay(paragraph, locale)}</p>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20 lg:py-24">
        <header className="mb-10 max-w-3xl sm:mb-14">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">
            {locale === "id"
              ? "Prinsip-prinsip yang memandu karya kami."
              : "The principles that govern our craft."}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {locale === "id"
              ? "Empat aturan mutlak ini memandu setiap keputusan teknis dan estetika di studio kami."
              : "These four non-negotiable laws guide every technical and aesthetic decision across our studio."}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:gap-x-16">
          {principles.map((principle) => (
            <article key={principle.number} className="border-t border-border py-7 sm:py-8">
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {sentenceCaseDisplay(principle.title, locale)}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {sentenceCaseDisplay(principle.description, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-16 sm:py-20 lg:py-24">
        <header className="mb-10 max-w-3xl sm:mb-14">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">
            {locale === "id"
              ? "Sosok arsitek di balik setiap karya."
              : "Meet the architects behind the work."}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {locale === "id"
              ? "Tim senior beranggotakan design engineer, arsitek sistem, dan technologist kreatif."
              : "A senior team of design engineers, systems architects, and creative technologists."}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:gap-x-16">
          {teamMembers.map((member) => (
            <article key={member.id} className="flex flex-col border-t border-border py-7 sm:py-8">
              <div className="relative mb-6 aspect-[4/5] w-full max-w-64 overflow-hidden rounded-xl border border-border bg-muted">
                {member.photo && (
                  <Image
                    src={member.photo}
                    alt={sentenceCaseDisplay(member.name, locale)}
                    fill
                    sizes="(max-width: 640px) 80vw, 256px"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <p className="font-mono text-xs font-medium  tracking-[0.12em] text-muted-foreground">
                {sentenceCaseDisplay(member.specialization, locale)}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {sentenceCaseDisplay(member.name, locale)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{sentenceCaseDisplay(member.role, locale)}</p>
              <p className="mt-4 max-w-xl flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {sentenceCaseDisplay(member.bio, locale)}
              </p>
              <p className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
                {sentenceCaseDisplay(member.location, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-8 pt-16 sm:flex-row sm:items-center sm:pt-20 lg:pt-24">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            Jakarta, Indonesia.
          </h2>
          <p className="mt-3 max-w-3xl font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {locale === "id"
              ? "Tim remote-first berbasis di Jakarta, melayani klien di berbagai wilayah."
              : "Jakarta-based remote team, working with clients across regions."}
          </p>
        </div>

        <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal" magnetic>
          {locale === "id" ? "Kolaborasi dengan kami" : "Work with us"}
        </RekaButton>
      </section>
    </div>
  );
}
