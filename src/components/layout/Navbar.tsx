"use client";

import { useState } from "react";
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

export default function Navbar({
  items,
  primaryCtaLabel,
  primaryCtaHref = "/contact",
}: NavbarProps) {
  const pathname = usePathname();
  const { dictionary } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openPath, setOpenPath] = useState(pathname);

  if (openPath !== pathname) {
    setOpenPath(pathname);
    setMobileMenuOpen(false);
  }

  const navItems = items || [
    { label: dictionary.nav.work, href: "/work" },
    { label: dictionary.nav.services, href: "/services" },
    { label: dictionary.nav.about, href: "/about" },
    { label: dictionary.nav.insights, href: "/insights" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between rounded-[20px] border border-border/80 bg-background/80 px-6 backdrop-blur-md shadow-whisper sm:px-8">
          {/* Vercel brand logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-base font-semibold tracking-[-0.04em] text-foreground"
            aria-label="Rekasandi home"
          >
            <span>Rekasandi</span>
            <span className="size-1 rounded-full bg-link" />
          </Link>

          {/* Vercel nav links */}
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
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions: Lang switcher + Vercel tight 6px button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <div className="hidden sm:block">
              <Link
                href={primaryCtaHref}
                className={cn(buttonVariants({ size: "sm" }), "rounded-[6px] shadow-whisper")}
              >
                {primaryCtaLabel || dictionary.nav.cta}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex size-9 items-center justify-center rounded-[6px] border border-border bg-card text-foreground lg:hidden shadow-whisper"
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
                className="rounded-[6px] px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <Link
                href={primaryCtaHref}
                className={cn(buttonVariants({ size: "sm" }), "w-full rounded-[6px]")}
              >
                {primaryCtaLabel || dictionary.nav.cta}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
