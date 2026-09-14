import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import ApproachSection from "@/components/home/ApproachSection";
import TechCredibilitySection from "@/components/home/TechCredibilitySection";
import AboutPreviewSection from "@/components/home/AboutPreviewSection";
import InsightsPreviewSection from "@/components/home/InsightsPreviewSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import { getProjects } from "@/lib/payload/queries";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <IntroSection />
      <SelectedWorkSection initialProjects={projects} />
      <CapabilitiesSection />
      <ApproachSection />
      <TechCredibilitySection />
      <AboutPreviewSection />
      <InsightsPreviewSection />
      <FinalCTASection />
    </div>
  );
}
