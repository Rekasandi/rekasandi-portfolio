'use client';

import { useEffect, useState } from 'react';
import StudioPreloader from "@/components/motion/StudioPreloader";
import RouteProgressBar from "@/components/motion/RouteProgressBar";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import CursorProvider from "@/components/motion/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { NavigationData, FooterData, SiteSettingsData } from "@/lib/payload/queries";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navData, setNavData] = useState<NavigationData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayoutData = async () => {
      try {
        // Fetch all layout data in parallel
        const navResponse = await fetch('/api/data/nav');
        const footerResponse = await fetch('/api/data/footer');
        const settingsResponse = await fetch('/api/data/settings');

        if (navResponse.ok) {
          const navResult = await navResponse.json();
          setNavData(navResult);
        }

        if (footerResponse.ok) {
          const footerResult = await footerResponse.json();
          setFooterData(footerResult);
        }

        if (settingsResponse.ok) {
          const settingsResult = await settingsResponse.json();
          setSiteSettings(settingsResult);
        }
      } catch (error) {
        console.error("Error fetching layout data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLayoutData();
  }, []);

  // Show loading state only on first load
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  // Provide fallback data if fetching fails
  const defaultNavData: NavigationData = {
    items: [
      { label: "WORK", href: "/work" },
      { label: "SERVICES", href: "/services" },
      { label: "INSIGHTS", href: "/insights" },
      { label: "ABOUT", href: "/about" },
      { label: "CONTACT", href: "/contact" },
    ],
    primaryCtaLabel: "START A PROJECT ↗",
    primaryCtaHref: "/contact",
  };

  const defaultFooterData: FooterData = {
    statement:
      "Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.",
    timezone: "Asia/Jakarta (UTC+7)",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/rekasandi" },
      { platform: "X / Twitter", url: "https://twitter.com/rekasandi" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/rekasandi" },
      { platform: "Figma", url: "https://figma.com/@rekasandi" },
    ],
  };

  const defaultSiteSettings: SiteSettingsData = {
    companyName: "REKASANDI",
    tagline: "Digital Product Studio — Strategy, Engineering & AI Systems",
    description:
      "We design and build digital products that move businesses forward. Strategy, design, engineering, and intelligent technology based in Jakarta.",
    contactEmail: "hello@rekasandi.com",
    location: "South Jakarta, DKI Jakarta, Indonesia",
    availability: "AVAILABLE FOR Q2/Q3 2026 ENGAGEMENTS",
  };

  const nav = navData || defaultNavData;
  const footer = footerData || defaultFooterData;
  const settings = siteSettings || defaultSiteSettings;

  return (
    <>
      <StudioPreloader />
      <RouteProgressBar />
      <SmoothScrollProvider>
        <CursorProvider>
          <Navbar
            items={nav.items}
            primaryCtaLabel={nav.primaryCtaLabel}
            primaryCtaHref={nav.primaryCtaHref}
          />
          <main className="relative z-10 flex-1 w-full pt-20 bg-[#f7f6f2] shadow-[0_20px_50px_rgba(10,10,10,0.08)]">
            {children}
          </main>
          <Footer
            statement={footer.statement}
            timezone={footer.timezone}
            socialLinks={footer.socialLinks}
            navItems={nav.items}
            contactEmail={settings.contactEmail}
            location={settings.location}
          />
        </CursorProvider>
      </SmoothScrollProvider>
    </>
  );
}
