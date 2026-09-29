import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteProgressBar from "@/components/motion/RouteProgressBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getNavigation, getFooter, getSiteSettings } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import { LocaleProvider } from "@/lib/i18n/client";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rekasandi.com"),
  title: {
    default: "Rekasandi - Premium Digital Product Studio",
    template: "%s | Rekasandi",
  },
  description:
    "We design and build digital products that move businesses forward. Strategy, design, engineering, and intelligent technology based in Jakarta.",
  keywords: [
    "Digital Studio",
    "Software Engineering",
    "Product Design",
    "Next.js Development",
    "AI Solutions",
    "Web Experiences",
    "Rekasandi",
    "Jakarta Studio",
  ],
  authors: [{ name: "Rekasandi Digital Studio" }],
  alternates: {
    canonical: "https://rekasandi.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Rekasandi - Premium Digital Product Studio",
    description:
      "We design and build digital products for ambitious businesses. Strategy, design, engineering, and intelligent technology.",
    url: "https://rekasandi.com",
    siteName: "Rekasandi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekasandi - Premium Digital Product Studio",
    description:
      "We design and build digital products for ambitious businesses.",
  },
};

import { ViewTransitions } from "next-view-transitions";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rekasandi.com/#organization",
      name: "Rekasandi",
      legalName: "Rekasandi Digital Studio",
      url: "https://rekasandi.com",
      description:
        "Premium digital product studio based in Jakarta, Indonesia. Specializing in digital products, web experiences, custom software, and AI engineering.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "South Jakarta",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.2088,
        longitude: 106.8456,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@rekasandi.com",
        contactType: "customer support",
      },
      sameAs: [
        "https://github.com/rekasandi",
        "https://twitter.com/rekasandi",
        "https://linkedin.com/company/rekasandi",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rekasandi.com/#website",
      url: "https://rekasandi.com",
      name: "Rekasandi",
      publisher: {
        "@id": "https://rekasandi.com/#organization",
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const [navData, footerData, siteSettings] = await Promise.all([
    getNavigation(locale),
    getFooter(locale),
    getSiteSettings(locale),
  ]);

  return (
    <ViewTransitions>
      <html
        lang={locale}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="relative flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-foreground selection:text-background font-sans">
          <LocaleProvider initialLocale={locale}>
            <RouteProgressBar />
            <Navbar
              items={navData.items}
              primaryCtaLabel={navData.primaryCtaLabel}
              primaryCtaHref={navData.primaryCtaHref}
            />
            <main className="relative z-10 w-full max-w-full flex-1 overflow-x-clip bg-background pt-20 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              {children}
            </main>
            <Footer
              statement={footerData.statement}
              socialLinks={footerData.socialLinks}
              navItems={navData.items}
              contactEmail={siteSettings.contactEmail}
              location={siteSettings.location}
            />
          </LocaleProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
