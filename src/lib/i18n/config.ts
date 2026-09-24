export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export const localeDetails: Record<Locale, { label: string; name: string; nativeName: string }> = {
  en: {
    label: "EN",
    name: "English",
    nativeName: "English",
  },
  id: {
    label: "ID",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
  },
};

export function isValidLocale(locale: string | undefined | null): locale is Locale {
  return typeof locale === "string" && (locales as readonly string[]).includes(locale);
}
