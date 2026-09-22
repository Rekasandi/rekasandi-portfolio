import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import ApproachSection from "@/components/home/ApproachSection";
import TechCredibilitySection from "@/components/home/TechCredibilitySection";
import AboutPreviewSection from "@/components/home/AboutPreviewSection";
import InsightsPreviewSection from "@/components/home/InsightsPreviewSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import { getProjects, getServices, getPosts, getSiteSettings } from "@/lib/payload/queries";

export default async function HomePage() {
  const [projects, services, posts, siteSettings] = await Promise.all([
    getProjects(),
    getServices(),
    getPosts(),
    getSiteSettings(),
  ]);

  return (
    <div className="w-full flex flex-col">
      <HeroSection availabilityText={siteSettings.availability} />
      <IntroSection />
      <SelectedWorkSection initialProjects={projects} />
      <CapabilitiesSection services={services} />
      <ApproachSection />
      <TechCredibilitySection />
      <AboutPreviewSection />
      <InsightsPreviewSection posts={posts} />
      <FinalCTASection />
    </div>
  );
}
