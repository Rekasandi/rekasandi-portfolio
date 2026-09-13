import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import ApproachSection from "@/components/home/ApproachSection";
import TechCredibilitySection from "@/components/home/TechCredibilitySection";
import AboutPreviewSection from "@/components/home/AboutPreviewSection";
import InsightsPreviewSection from "@/components/home/InsightsPreviewSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <IntroSection />
      <SelectedWorkSection />
      <CapabilitiesSection />
      <ApproachSection />
      <TechCredibilitySection />
      <AboutPreviewSection />
      <InsightsPreviewSection />
      <FinalCTASection />
    </div>
  );
}
