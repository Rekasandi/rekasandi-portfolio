import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import ApproachSection from "@/components/home/ApproachSection";
import TechCredibilitySection from "@/components/home/TechCredibilitySection";
import AboutPreviewSection from "@/components/home/AboutPreviewSection";
import InsightsPreviewSection from "@/components/home/InsightsPreviewSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import {
  getProjects,
  getServices,
  getPosts,
  getSiteSettings,
  getHomePageContent,
} from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  const [projects, services, posts, siteSettings, homeContent] = await Promise.all([
    getProjects(locale),
    getServices(locale),
    getPosts(locale),
    getSiteSettings(locale),
    getHomePageContent(locale),
  ]);

  return (
    <div className="w-full flex flex-col">
      <HeroSection
        availabilityText={siteSettings.availability}
        headlineLine1={homeContent.heroHeadlineLine1}
        headlineLine2={homeContent.heroHeadlineLine2}
        headlineLine3Prefix={homeContent.heroHeadlineLine3Prefix}
        headlineLine3Suffix={homeContent.heroHeadlineLine3Suffix}
        subtitle={homeContent.heroSubtitle}
      />
      <IntroSection
        title={homeContent.introTitle}
        description={homeContent.introDescription}
        statement={homeContent.introStatement}
        paragraph={homeContent.introParagraph}
        metrics={homeContent.introMetrics}
      />
      <SelectedWorkSection initialProjects={projects} />
      <CapabilitiesSection services={services} />
      <ApproachSection steps={homeContent.approachSteps} />
      <TechCredibilitySection techGroups={homeContent.techGroups} />
      <AboutPreviewSection />
      <InsightsPreviewSection posts={posts} />
      <FinalCTASection
        headline={homeContent.ctaHeadline}
        subtitle={homeContent.ctaSubtitle}
        contactEmail={siteSettings.contactEmail}
      />
    </div>
  );
}
