"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LanguageSwitcher, useLocale } from "@/lib/i18n/client";

interface NavbarProps {
  items?: { label: string; href: string }[];
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
}

function formatNavigationLabel(label: string) {
  if (label !== label.toLocaleUpperCase()) return label;
  const sentence = label.toLocaleLowerCase();
  return sentence.charAt(0).toLocaleUpperCase() + sentence.slice(1);
}

export default function Navbar({
  items,
  primaryCtaLabel,
  primaryCtaHref = "/contact",
}: NavbarProps) {
  const pathname = usePathname();
  const { dictionary } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openPath, setOpenPath] = useState(pathname);
  const scrollSentinelRef = useRef<HTMLDivElement>(null);

  if (openPath !== pathname) {
    setOpenPath(pathname);
    setMobileMenuOpen(false);
  }


  useEffect(() => {
    const sentinel = scrollSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const navItems = items || [
    { label: dictionary.nav.work, href: "/work" },
    { label: dictionary.nav.services, href: "/services" },
    { label: dictionary.nav.about, href: "/about" },
    { label: dictionary.nav.insights, href: "/insights" },
  ];

  return (
    <>
      <div ref={scrollSentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 size-px" />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-[1600px] items-center justify-between rounded-xl border-x border-t bg-background/95 px-6 shadow-whisper backdrop-blur-md transition-colors duration-200 sm:px-8",
            isScrolled ? "border-border/80 border-b" : "border-transparent border-b-0",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-base font-semibold tracking-[-0.04em] text-foreground"
            aria-label="Rekasandi home"
          >
            <span>Rekasandi</span>
            <span className="size-1 rounded-full bg-accent-highlight" />
          </Link>

          <nav
            aria-label={dictionary.nav.navigation}
            className="hidden items-center gap-1 lg:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors hover:text-foreground",
                  pathname === item.href
                    ? "font-medium text-foreground bg-muted"
                    : "text-muted-foreground hover:bg-muted/60"
                )}
              >
                {formatNavigationLabel(item.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <div className="hidden sm:block">
              <Link
                href={primaryCtaHref}
                className={cn(buttonVariants({ size: "sm" }), "rounded-md shadow-whisper")}
              >
                {formatNavigationLabel(primaryCtaLabel || dictionary.nav.cta)}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-whisper lg:hidden"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label={dictionary.nav.navigation}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-16 z-40 flex flex-col gap-1 rounded-xl border border-border bg-card p-4 shadow-whisper lg:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {formatNavigationLabel(item.label)}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <Link
                href={primaryCtaHref}
                className={cn(buttonVariants({ size: "sm" }), "w-full rounded-md")}
              >
                {formatNavigationLabel(primaryCtaLabel || dictionary.nav.cta)}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
