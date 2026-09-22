"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import RekaButton from "@/components/ui/RekaButton";
import { useCursor } from "@/components/motion/CustomCursor";

const NAV_ITEMS = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "INSIGHTS", href: "/insights" },
  { label: "CONTACT", href: "/contact" },
];

interface NavbarProps {
  items?: { label: string; href: string }[];
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
}

export default function Navbar({
  items = NAV_ITEMS,
  primaryCtaLabel = "START A PROJECT",
  primaryCtaHref = "/contact",
}: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorVariant, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 sm:px-10 md:px-16 flex items-center justify-between",
          isScrolled ? "py-4" : "py-7",
        )}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          onMouseEnter={() => setCursorVariant("pointer")}
          onMouseLeave={resetCursor}
          className="group flex items-center gap-2 text-[#0a0a0a] font-semibold tracking-tight text-lg z-50"
        >
          <span className="size-2 rounded-full bg-[#d7ff3f] border border-[#0a0a0a]/30 transition-transform duration-300 group-hover:scale-125 shadow-[0_0_8px_rgba(215,255,63,0.6)]" />
          <span className="tracking-widest uppercase text-sm font-mono font-bold">
            REKASANDI
          </span>
        </Link>

        {/* Floating Center Dock on Desktop */}
        <nav
          className={cn(
            "hidden md:flex items-center gap-1 transition-all duration-500 rounded-full px-5 py-2",
            isScrolled
              ? "bg-white/85 backdrop-blur-md border border-[#e2e0d8] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              : "bg-transparent border border-transparent",
          )}
        >
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setCursorVariant("pointer")}
                onMouseLeave={resetCursor}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 uppercase",
                  isActive
                    ? "text-[#0a0a0a] font-semibold"
                    : "text-[#55544e] hover:text-[#0a0a0a]",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-[#0a0a0a]/[0.06] border border-[#0a0a0a]/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center gap-4 z-50">
          <div className="hidden sm:block">
            <RekaButton
              href={primaryCtaHref}
              variant="primary"
              size="sm"
              arrow="diagonal"
              magnetic
            >
              {primaryCtaLabel}
            </RekaButton>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={resetCursor}
            className="md:hidden flex items-center justify-center size-10 rounded-full border border-[#e2e0d8] bg-white text-[#0a0a0a] transition-colors shadow-sm"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#f7f6f2]/98 backdrop-blur-2xl flex flex-col justify-between px-8 pt-28 pb-12 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs text-[#7a7870] tracking-widest uppercase">
                Navigation
              </span>
              <div className="flex flex-col gap-4">
                {items.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "display-xl text-3xl font-semibold flex items-center justify-between group",
                          isActive
                            ? "text-[#0a0a0a] font-bold"
                            : "text-[#55544e] hover:text-[#0a0a0a]",
                        )}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="size-6 opacity-0 group-hover:opacity-100 transition-opacity text-[#0a0a0a]" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-8 border-t border-[#e2e0d8]">
              <div className="flex items-center justify-between text-xs font-mono text-[#7a7870]">
                <span>JAKARTA, ID</span>
                <span className="text-[#0a0a0a] font-medium">
                  ● AVAILABLE FOR WORK
                </span>
              </div>
              <RekaButton
                href={primaryCtaHref}
                variant="primary"
                size="md"
                arrow="diagonal"
                className="w-full justify-center"
              >
                {primaryCtaLabel}
              </RekaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
