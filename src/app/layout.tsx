import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import CursorProvider from "@/components/motion/CustomCursor";
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
  title: "REKASANDI — Premium Digital Product Studio",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f6f2] text-[#0a0a0a]">
        <SmoothScrollProvider>
          <CursorProvider>
            <Navbar />
            <main className="flex-1 w-full pt-20">{children}</main>
            <Footer />
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
