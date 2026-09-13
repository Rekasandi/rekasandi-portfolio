"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useCursor } from "@/components/motion/CustomCursor";

export default function Footer() {
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
    <footer className="w-full bg-[#efeee8] border-t border-[#e2e0d8] text-[#0a0a0a] pt-24 pb-12 px-6 sm:px-10 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        {/* Massive Studio Headline */}
        <div className="pb-16 border-b border-[#e2e0d8] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0a0a0a] font-semibold block mb-3">
              REKASANDI DIGITAL STUDIO
            </span>
            <h2 className="display-xl font-bold tracking-tighter text-[#0a0a0a]">
              BUILT FOR WHAT’S NEXT.
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={resetCursor}
            aria-label="Scroll back to top"
            className="self-start md:self-end flex items-center gap-2 px-4 py-2 rounded-full border border-[#e2e0d8] bg-white hover:bg-[#f7f6f2] text-xs font-mono tracking-wider text-[#0a0a0a] transition-colors group cursor-pointer shadow-sm"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Studio Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16 border-b border-[#e2e0d8]">
          {/* Col 1: Studio Info & Live Clock */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <p className="text-[#55544e] text-base leading-relaxed max-w-sm mb-6">
                An independent digital product studio crafting ambitious web experiences, software systems, and AI products for visionary companies worldwide.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#e2e0d8] bg-white shadow-sm">
                <span className="size-2 rounded-full bg-[#0a0a0a] animate-pulse" />
                <span className="font-mono text-xs text-[#55544e]">
                  JAKARTA, ID: <span className="text-[#0a0a0a] font-semibold">{jakartaTime || "17:00:00"} (UTC+7)</span>
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#7a7870]">
              <span>COORDINATES: 6.2088° S, 106.8456° E</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
              Explore
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li>
                <Link
                  href="/work"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors"
                >
                  Work & Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors"
                >
                  Services & Capabilities
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors"
                >
                  About Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors"
                >
                  Insights & Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors"
                >
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Inquiry Channels */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
              Direct Contact
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li>
                <a
                  href="mailto:hello@rekasandi.com"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#0a0a0a] hover:text-[#55544e] transition-colors flex items-center gap-1 group font-medium"
                >
                  <span>hello@rekasandi.com</span>
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
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors flex items-center gap-1 group"
                >
                  <span>WhatsApp Business</span>
                  <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li className="pt-2 text-xs text-[#7a7870] leading-relaxed">
                South Jakarta, DKI Jakarta<br />
                Indonesia
              </li>
            </ul>
          </div>

          {/* Col 4: Social Channels */}
          <div className="lg:col-span-2">
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
              Connect
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li>
                <a
                  href="https://github.com/rekasandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors flex items-center gap-1"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/rekasandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors flex items-center gap-1"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/rekasandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors flex items-center gap-1"
                >
                  Twitter / X ↗
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/rekasandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="text-[#55544e] hover:text-[#0a0a0a] transition-colors flex items-center gap-1"
                >
                  Instagram ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7a7870]">
          <span>© 2026 REKASANDI STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#0a0a0a] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#0a0a0a] cursor-pointer">TERMS OF CRAFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
