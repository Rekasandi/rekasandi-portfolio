"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Locale, LOCALE_COOKIE_NAME, locales, localeDetails } from "./config";
import { getDictionary, Dictionary } from "./dictionaries";
import { cn } from "@/lib/utils";

interface LocaleContextType {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  dictionary: Dictionary;
  isPending: boolean;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const setLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    setLocaleState(nextLocale);

    // Persist to cookie (1 year expiry)
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Refresh Server Components
    startTransition(() => {
      router.refresh();
    });
  };

  const dictionary = getDictionary(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dictionary, isPending }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}

export function LanguageSwitcher({
  className,
  variant = "navbar",
}: {
  className?: string;
  variant?: "navbar" | "footer" | "mobile";
}) {
  const { locale, setLocale, isPending } = useLocale();

  if (variant === "footer") {
    return (
      <div className={cn("flex items-center gap-1.5 font-mono text-xs", className)}>
        {locales.map((loc) => {
          const isActive = locale === loc;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => setLocale(loc)}
              disabled={isPending}
              aria-label={`Switch to ${localeDetails[loc].name}`}
              className={cn(
                "px-2 py-0.5 rounded transition-all tracking-wider font-semibold cursor-pointer",
                isActive
                  ? "bg-[#0a0a0a] text-white"
                  : "text-[#7a7870] hover:text-[#0a0a0a] bg-black/5 hover:bg-black/10"
              )}
            >
              {localeDetails[loc].label}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={cn("flex items-center justify-between py-3 border-y border-[#e2e0d8]", className)}>
        <span className="font-mono text-xs text-[#7a7870] uppercase tracking-wider">
          Language / Bahasa
        </span>
        <div className="inline-flex rounded-full bg-black/5 p-1 border border-[#e2e0d8]">
          {locales.map((loc) => {
            const isActive = locale === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                disabled={isPending}
                className={cn(
                  "px-3 py-1 text-xs font-mono font-semibold rounded-full transition-all cursor-pointer",
                  isActive
                    ? "bg-[#0a0a0a] text-white shadow-xs"
                    : "text-[#7a7870] hover:text-[#0a0a0a]"
                )}
              >
                {localeDetails[loc].label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default navbar variant: sleek pill
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-white/90 border border-[#e2e0d8] p-0.5 shadow-xs backdrop-blur-xs",
        className
      )}
    >
      {locales.map((loc) => {
        const isActive = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            disabled={isPending}
            aria-label={`Switch to ${localeDetails[loc].name}`}
            className={cn(
              "px-2.5 py-1 text-[11px] font-mono tracking-wider rounded-full transition-all cursor-pointer select-none",
              isActive
                ? "bg-[#0a0a0a] text-white font-bold shadow-xs"
                : "text-[#7a7870] hover:text-[#0a0a0a] hover:bg-black/5 font-medium"
            )}
          >
            {localeDetails[loc].label}
          </button>
        );
      })}
    </div>
  );
}
