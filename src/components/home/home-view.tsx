"use client";

import React, { useMemo } from "react";
import HeroSection from "@/components/home/hero-section";
import ClientSection from "@/components/home/client-section";
import IntroSection from "@/components/home/intro-section";
import CapabilitiesSection from "@/components/home/capabilities-section";
import SelectedProjectsSection from "@/components/home/selected-projects-section";
import StickyCard002 from "@/components/home/sticky-card-002";
import TechCredibilitySection from "@/components/home/tech-credibility-section";
import InsightsPreviewSection from "@/components/home/insights-preview-section";
import FinalCTASection from "@/components/home/final-cta-section";
import FAQView from "@/components/faq/faq-view";
import { useLivePreview } from "@payloadcms/live-preview-react";
import type { Project, Service, Post } from "@/data/schema";
import type { HomeLogoData, HomePageData, SiteSettingsData } from "@/lib/payload/queries";
import { sentenceCaseDisplay } from "@/lib/utils";

interface LiveLogo extends Partial<HomeLogoData> {
  logo?: number | string | { url?: string | null } | null;
}

function normalizeLogos(items: LiveLogo[] | undefined): HomeLogoData[] {
  return (items || [])
    .map((item) => ({
      name: item.name || "",
      src: item.src || (typeof item.logo === "object" && item.logo ? item.logo.url || "" : ""),
      invertInDark: Boolean(item.invertInDark),
    }))
    .filter((item) => item.name && item.src);
}

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
    Omit<HomePageData, "heroImages" | "clientLogos" | "techLogos"> & {
      heroImages?: {
        src?: string;
        alt?: string | null;
        image?: number | string | { url?: string | null; alt?: string | null } | null;
      }[];
      clientLogos?: LiveLogo[];
      techLogos?: LiveLogo[];
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

  const clientLogos = useMemo(() => normalizeLogos(homeContent.clientLogos), [homeContent.clientLogos]);
  const techLogos = useMemo(() => normalizeLogos(homeContent.techLogos), [homeContent.techLogos]);
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
      <ClientSection
        eyebrow={homeContent.clientEyebrow}
        heading={homeContent.clientHeading}
        logos={clientLogos}
      />
      <IntroSection
        title={homeContent.introTitle}
        description={homeContent.introDescription}
        statement={homeContent.introStatement}
        paragraph={homeContent.introParagraph}
        metrics={homeContent.introMetrics}
      />
      <CapabilitiesSection services={services} />
      <SelectedProjectsSection projects={projects} />
      <TechCredibilitySection
        techGroups={techGroups}
        techLogos={techLogos}
        eyebrow={homeContent.techEyebrow}
        heading={homeContent.techHeading}
        description={homeContent.techDescription}
      />
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
