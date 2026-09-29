"use client";

import { Link } from "next-view-transitions";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { useLocale, LanguageSwitcher } from "@/lib/i18n/client";
import { sentenceCaseDisplay } from "@/lib/utils";

interface FooterProps {
  statement?: string;
  socialLinks?: { platform: string; url: string }[];
  navItems?: { label: string; href: string }[];
  contactEmail?: string;
  location?: string;
}

export default function Footer({
  statement = "Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.",
  socialLinks = [
    { platform: "Instagram", url: "https://instagram.com/rekasandi" },
    { platform: "X", url: "https://x.com/rekasandi" },
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
  location = "South Jakarta, DKI Jakarta, Indonesia",
}: FooterProps) {
  const { dictionary, locale } = useLocale();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border bg-background px-6 py-14 text-foreground sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-12">
        <div className="flex flex-col justify-between gap-8 border-b border-border pb-10 sm:pb-12 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-sm font-medium text-muted-foreground">
              Rekasandi Digital Studio
            </p>
            <h2 className="display-xl max-w-3xl text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
              Software for what comes next.
            </h2>
            {statement && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {sentenceCaseDisplay(statement, locale)}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={dictionary.footer.backToTop}
            className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:self-end"
          >
            <span>{dictionary.footer.backToTop}</span>
            <ArrowUp aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">
              {dictionary.footer.office}
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {sentenceCaseDisplay(location, locale)}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">
              Email
            </h3>
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex min-h-11 items-center gap-2 text-sm text-foreground transition-colors hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {contactEmail}
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">
              {dictionary.footer.navigation}
            </h3>
            <ul className="flex flex-col items-start gap-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {sentenceCaseDisplay(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-foreground">
              {locale === "id" ? "Ikuti" : "Follow"}
            </h3>
            <ul className="flex flex-col items-start gap-2 text-sm">
              {socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© 2026 Rekasandi Studio. {dictionary.footer.rights}.</span>
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  );
}
