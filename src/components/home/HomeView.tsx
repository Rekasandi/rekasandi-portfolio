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
    HomePageData & {
      techItems?: { category?: string | null; name: string; desc: string }[];
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

  const techGroups = useMemo(() => {
    if (homeContent.techItems && homeContent.techItems.length > 0) {
      const map = new Map<string, { name: string; desc: string }[]>();
      for (const item of homeContent.techItems) {
        const cat = item.category || "GENERAL";
        if (!map.has(cat)) map.set(cat, []);
        map.get(cat)!.push({ name: item.name, desc: item.desc });
      }
      return Array.from(map.entries()).map(([category, items]) => ({
        category,
        items,
      }));
    }
    return homeContent.techGroups || initialHomeContent.techGroups;
  }, [homeContent.techItems, homeContent.techGroups, initialHomeContent.techGroups]);

  return (
    <div className="w-full flex flex-col">
      <HeroSection
        headline={homeContent.heroHeadlineLine1}
        subtitle={homeContent.heroSubtitle}
        projects={projects}
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
            alt: `${project.title} - ${project.client}`,
          }))}
      />
      <InsightsPreviewSection posts={posts} />
      <FAQView />
      <FinalCTASection
        headline={homeContent.ctaHeadline}
        subtitle={homeContent.ctaSubtitle}
        contactEmail={siteSettings?.contactEmail}
      />
    </div>
  );
}
