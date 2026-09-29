"use client";

import React, { useMemo } from "react";
import HeroSection from "@/components/home/HeroSection";
import ClientSection from "@/components/home/ClientSection";
import IntroSection from "@/components/home/IntroSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import SelectedProjectsSection from "@/components/home/SelectedProjectsSection";
import StickyCard002 from "@/components/home/StickyCard002";
import TechCredibilitySection from "@/components/home/TechCredibilitySection";
import InsightsPreviewSection from "@/components/home/InsightsPreviewSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import FAQView from "@/components/faq/FAQView";
import { useLivePreview } from "@payloadcms/live-preview-react";
import type { Project, Service, Post } from "@/data/schema";
import type { HomePageData, SiteSettingsData } from "@/lib/payload/queries";
import { sentenceCaseDisplay } from "@/lib/utils";

export interface HomeViewProps {
  initialHomeContent: HomePageData;
  initialSiteSettings: SiteSettingsData;
  projects: Project[];
  services: Service[];
  posts: Post[];
}

export default function HomeView({
  initialHomeContent,
  initialSiteSettings,
  projects,
  services,
  posts,
}: HomeViewProps) {
  const serverURL =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const { data: homeContent } = useLivePreview<
    Omit<HomePageData, "heroImages"> & {
      heroImages?: {
        src?: string;
        alt?: string | null;
        image?: number | string | { url?: string | null; alt?: string | null } | null;
      }[];
      techGroups?: { category?: string | null; items?: { name: string; desc: string }[] }[];
    }
  >({
    initialData: initialHomeContent,
    serverURL,
    depth: 2,
  });

  const { data: siteSettings } = useLivePreview<SiteSettingsData>({
    initialData: initialSiteSettings,
    serverURL,
    depth: 1,
  });

  const heroImages = useMemo(
    () => (homeContent.heroImages || []).map((item) => {
      const media = item.image;
      return {
        src: item.src || (typeof media === "object" && media ? media.url || "" : ""),
        alt: item.alt || (typeof media === "object" && media ? media.alt || "" : ""),
      };
    }).filter(({ src }) => Boolean(src)),
    [homeContent.heroImages],
  );

  const techGroups = useMemo(
    () => (homeContent.techGroups || []).map((group) => ({ category: group.category || "", items: group.items || [] })),
    [homeContent.techGroups],
  );

  return (
    <div className="w-full flex flex-col">
      <HeroSection
        headline={homeContent.heroHeadlineLine1}
        subtitle={homeContent.heroSubtitle}
        images={heroImages}
      />
      <ClientSection />
      <IntroSection
        title={homeContent.introTitle}
        description={homeContent.introDescription}
        statement={homeContent.introStatement}
        paragraph={homeContent.introParagraph}
        metrics={homeContent.introMetrics}
      />
      <CapabilitiesSection services={services} />
      <SelectedProjectsSection projects={projects} />
      <TechCredibilitySection techGroups={techGroups} />
      <StickyCard002
        cards={projects
          .filter((project) => Boolean(project.heroImage))
          .map((project) => ({
            id: project.id,
            image: project.heroImage,
            alt: `${sentenceCaseDisplay(project.title)} - ${sentenceCaseDisplay(project.client)}`,
          }))}
      />
      <InsightsPreviewSection posts={posts} />
      <FAQView items={homeContent.faqItems || []} />
      <FinalCTASection
        headline={homeContent.ctaHeadline}
        subtitle={homeContent.ctaSubtitle}
        contactEmail={siteSettings?.contactEmail}
      />
    </div>
  );
}
