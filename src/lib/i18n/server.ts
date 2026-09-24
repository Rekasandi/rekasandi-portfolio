import { cookies } from "next/headers";
import { Locale, defaultLocale, isValidLocale, LOCALE_COOKIE_NAME } from "./config";
import { getDictionary, Dictionary } from "./dictionaries";

export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const cookieVal = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
    if (isValidLocale(cookieVal)) {
      return cookieVal;
    }
  } catch {
    // In contexts where cookies() is not available (e.g. static generation)
  }
  return defaultLocale;
}

export async function getServerTranslations(): Promise<{
  locale: Locale;
  dictionary: Dictionary;
}> {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  return { locale, dictionary };
}
