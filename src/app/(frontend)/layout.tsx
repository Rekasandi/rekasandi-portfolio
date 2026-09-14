import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import CursorProvider from "@/components/motion/CustomCursor";
import RouteProgressBar from "@/components/motion/RouteProgressBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    default: "REKASANDI — Premium Digital Product Studio",
    template: "%s | REKASANDI",
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
    title: "REKASANDI — Premium Digital Product Studio",
    description:
      "We design and build digital products for ambitious businesses. Strategy, design, engineering, and intelligent technology.",
    url: "https://rekasandi.com",
    siteName: "Rekasandi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REKASANDI — Premium Digital Product Studio",
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
      name: "REKASANDI",
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
      name: "REKASANDI",
      publisher: {
        "@id": "https://rekasandi.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="min-h-screen flex flex-col bg-[#efeee8] text-[#0a0a0a] relative antialiased selection:bg-[#d7ff3f] selection:text-[#0a0a0a]">
          <RouteProgressBar />
          <SmoothScrollProvider>
            <CursorProvider>
              <Navbar />
              <main className="relative z-10 flex-1 w-full pt-20 bg-[#f7f6f2] shadow-[0_20px_50px_rgba(10,10,10,0.08)]">
                {children}
              </main>
              <Footer />
            </CursorProvider>
          </SmoothScrollProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
