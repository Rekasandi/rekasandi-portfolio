import { en } from "./en";
import { id } from "./id";
import type { Dictionary } from "./en";
import { Locale, defaultLocale } from "../config";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  id,
};

export function getDictionary(locale?: Locale | string): Dictionary {
  if (locale === "id") return dictionaries.id;
  return dictionaries[defaultLocale];
}

export type { Dictionary };
