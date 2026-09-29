"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import RekaButton from "@/components/ui/RekaButton";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { useLocale } from "@/lib/i18n/client";
import type { TeamMember } from "@/data/schema";
import type { AboutPageData } from "@/lib/payload/queries";

interface AboutPreviewContent extends Omit<AboutPageData, "manifestoParagraphs"> {
  manifestoParagraphs?: (string | { paragraph?: string | null })[];
}

export interface AboutViewProps {
  initialAboutContent: AboutPageData;
  teamMembers: TeamMember[];
}

function sentenceCaseHeadline(headline: string, locale: string) {
  const sentence = headline
    .trim()
    .toLocaleLowerCase(locale)
    .replace(/^\p{L}/u, (letter) => letter.toLocaleUpperCase(locale));

  return sentence.replace(/\b(ai|it|ui|ux|api|cms|rekasandi)\b/gi, (term) =>
    term.toLocaleUpperCase(locale) === "REKASANDI"
      ? "Rekasandi"
      : term.toLocaleUpperCase(locale),
  );
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

  const manifestoParagraphs = useMemo(() => {
    if (!Array.isArray(aboutContent.manifestoParagraphs)) {
      return initialAboutContent.manifestoParagraphs;
    }

    return aboutContent.manifestoParagraphs
      .map((paragraph) =>
        typeof paragraph === "string" ? paragraph : paragraph.paragraph || "",
      )
      .filter(Boolean);
  }, [aboutContent.manifestoParagraphs, initialAboutContent.manifestoParagraphs]);

  const principles = aboutContent.principles || initialAboutContent.principles;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <section className="border-b border-border pb-16 sm:pb-20">
        <div className="max-w-4xl">
          <SectionEyebrow>
            {locale === "id" ? "IDENTITAS STUDIO" : "STUDIO IDENTITY"}
          </SectionEyebrow>
          <h1 className="max-w-none text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl md:whitespace-nowrap lg:text-6xl">
            {sentenceCaseHeadline(aboutContent.headline, locale)}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            {aboutContent.subheadline}
          </p>
        </div>

        <div className="relative mt-9 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:mt-12 sm:aspect-[16/8] lg:aspect-[16/7]">
          <Image
            src="/images/insights/design-systems.png"
            alt="Modular forms arranged as a study in digital design systems"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 border-b border-border py-16 sm:gap-12 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">
            {aboutContent.manifestoTitle}
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-7">
          {manifestoParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
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
              <span className="font-mono text-xs font-medium text-accent-highlight">
                {principle.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {principle.description}
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
                {/* TODO: Add team photo with next/image. */}
              </div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {member.specialization}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              <p className="mt-4 max-w-xl flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {member.bio}
              </p>
              <p className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
                {member.location}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-8 pt-16 sm:flex-row sm:items-center sm:pt-20 lg:pt-24">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            JAKARTA, INDONESIA.
          </h2>
          <p className="mt-3 max-w-3xl font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {locale === "id"
              ? "BEROPERASI SECARA GLOBAL · ZONA WAKTU WIB (UTC+7) · TIM TERINTEGRASI REMOTE-FIRST"
              : "OPERATING WORLDWIDE · TIMEZONE UTC+7 · REMOTE-FIRST EMBEDDED TEAMS"}
          </p>
        </div>

        <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal" magnetic>
          {locale === "id" ? "KOLABORASI DENGAN KAMI" : "WORK WITH US"}
        </RekaButton>
      </section>
    </div>
  );
}
