"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useLocale, LanguageSwitcher } from "@/lib/i18n/client";

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
  const { dictionary, locale } = useLocale();
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
    <footer className="sticky bottom-0 z-0 w-full overflow-hidden border-t border-border bg-background px-6 pt-20 pb-12 text-foreground sm:px-10 sm:pt-24 lg:px-16 lg:pt-28">
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between min-h-[60vh] sm:min-h-[70vh]">
        {/* Massive Studio Headline & Back to Top */}
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-12 sm:pb-16 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold block mb-3">
              REKASANDI DIGITAL STUDIO
            </span>
            <h2 className="display-xl font-bold tracking-tighter text-foreground">
              BUILT FOR WHAT’S NEXT.
            </h2>
            {statement && (
              <p className="mt-4 text-sm font-mono text-muted-foreground max-w-xl leading-relaxed">
                {statement}
              </p>
            )}
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-2 self-start rounded-full border border-border bg-card px-4 py-2 text-xs font-mono tracking-wider text-foreground shadow-whisper transition-colors hover:bg-muted md:self-end"
          >
            <span>{dictionary.footer.backToTop}</span>
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Studio Columns Grid */}
        <div className="grid grid-cols-1 gap-10 border-b border-border py-12 sm:gap-12 sm:py-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Studio Location & Schedule */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
                {dictionary.footer.office}
              </span>
              <p className="font-mono text-sm text-foreground font-medium leading-relaxed mb-2">
                Jakarta, Indonesia
              </p>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">
                {locale === "id"
                  ? "Senin - Jumat 09:00 - 18:00 WIB"
                  : "Monday - Friday 9am to 6pm (WIB)"}
              </p>

              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 shadow-whisper">
                <span className="size-2 rounded-full bg-accent-highlight" />
                <span className="font-mono text-xs text-muted-foreground">
                  JAKARTA, ID:{" "}
                  <span className="text-foreground font-semibold">
                    {jakartaTime || "17:00:00"} (UTC+7)
                  </span>
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-muted-foreground">
              <span>COORDINATES: 6.2088° S, 106.8456° E</span>
            </div>
          </div>

          {/* Col 2: Direct Contact Channels */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
              Direct Contact
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-foreground hover:text-muted-foreground transition-colors flex items-center gap-1 group font-medium"
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
                  className="text-foreground hover:text-muted-foreground transition-colors flex items-center gap-1 group font-medium"
                >
                  <span>Whatsapp</span>
                  <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li className="pt-2 text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {location}
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
              {dictionary.footer.navigation}
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors capitalize"
                  >
                    {item.label.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Channels */}
          <div className="lg:col-span-2">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
              {dictionary.footer.connect}
            </span>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              {socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span>Copyright © 2026 REKASANDI STUDIO® | Jakarta</span>
          <div className="flex items-center gap-6">
            <LanguageSwitcher variant="footer" />
            <button
              onClick={scrollToTop}
              className="hover:text-foreground cursor-pointer transition-colors"
            >
              {dictionary.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
