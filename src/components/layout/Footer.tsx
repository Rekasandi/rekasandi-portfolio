"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useCursor } from "@/components/motion/CustomCursor";

interface FooterProps {
  statement?: string;
  timezone?: string;
  socialLinks?: { platform: string; url: string }[];
  navItems?: { label: string; href: string }[];
  contactEmail?: string;
  location?: string;
}

export default function Footer({
  statement = "Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.",
  timezone = "Asia/Jakarta (UTC+7)",
  socialLinks = [
    { platform: "Instagram", url: "https://instagram.com/rekasandi" },
    { platform: "Twitter", url: "https://x.com/rekasandi" },
    { platform: "Behance", url: "https://www.behance.net/rekasandi" },
    { platform: "GitHub", url: "https://github.com/rekasandi" },
  ],
  navItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
  ],
  contactEmail = "hello@rekasandi.com",
  location = "South Jakarta, DKI Jakarta\nIndonesia",
}: FooterProps) {
  const { setCursorVariant, resetCursor } = useCursor();
  const [jakartaTime, setJakartaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setJakartaTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="sticky bottom-0 z-0 w-full bg-[#efeee8] text-[#0a0a0a] pt-20 sm:pt-28 pb-10 px-6 sm:px-10 md:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between min-h-[60vh] sm:min-h-[70vh]">
        {/* Massive Studio Headline & Back to Top */}
        <div className="pb-12 sm:pb-16 border-b border-[#e2e0d8] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0a0a0a] font-semibold block mb-3">
              REKASANDI DIGITAL STUDIO
            </span>
            <h2 className="display-xl font-bold tracking-tighter text-[#0a0a0a]">
              BUILT FOR WHAT’S NEXT.
            </h2>
            {statement && (
              <p className="mt-4 text-sm font-mono text-[#55544e] max-w-xl leading-relaxed">
                {statement}
              </p>
            )}
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={resetCursor}
            aria-label="Scroll back to top"
            className="self-start md:self-end flex items-center gap-2 px-4 py-2 rounded-full border border-[#e2e0d8] bg-white/80 hover:bg-white text-xs font-mono tracking-wider text-[#0a0a0a] transition-colors group cursor-pointer shadow-xs"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Studio Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 py-12 sm:py-16 border-b border-[#e2e0d8]">
          {/* Col 1: Studio Location & Schedule (Matching screenshot format) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
                Studio Location
              </span>
              <p className="font-mono text-sm text-[#0a0a0a] font-medium leading-relaxed mb-2">
                Jakarta, Indonesia
              </p>
              <p className="font-mono text-xs text-[#55544e] leading-relaxed mb-6">
                Monday – Thursday 9am to 6pm (WIB)
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#e2e0d8] bg-white/90 shadow-xs">
                <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-mono text-xs text-[#55544e]">
                  JAKARTA, ID:{" "}
                  <span className="text-[#0a0a0a] font-semibold">
                    {jakartaTime || "17:00:00"} (UTC+7)
                  </span>
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#7a7870]">
              <span>COORDINATES: 6.2088° S, 106.8456° E</span>
            </div>
          </div>

          {/* Col 2: Direct Contact Channels (Matching screenshot format) */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
              Direct Contact
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#0a0a0a] hover:text-[#55544e] transition-colors flex items-center gap-1 group font-medium"
                >
                  <span>Email</span>
                  <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#0a0a0a] hover:text-[#55544e] transition-colors flex items-center gap-1 group font-medium"
                >
                  <span>Whatsapp</span>
                  <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li className="pt-2 text-xs text-[#7a7870] leading-relaxed whitespace-pre-line">
                {location}
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
              Navigation
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setCursorVariant("pointer")}
                    onMouseLeave={resetCursor}
                    className="text-[#55544e] hover:text-[#0a0a0a] transition-colors capitalize"
                  >
                    {item.label.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Channels */}
          <div className="lg:col-span-2">
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
              Connect
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorVariant("pointer")}
                    onMouseLeave={resetCursor}
                    className="text-[#55544e] hover:text-[#0a0a0a] transition-colors flex items-center gap-1"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar (Matching screenshot format with Back to top on right) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7a7870]">
          <span>Copyright © 2026 REKASANDI STUDIO® | Jakarta</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#0a0a0a] transition-colors">
              Privacy Policy
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-[#0a0a0a] cursor-pointer transition-colors"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
