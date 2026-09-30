export { cn } from "cn";

const DISPLAY_ACRONYMS: Record<string, string> = {
  ai: "AI",
  api: "API",
  aws: "AWS",
  "ci/cd": "CI/CD",
  cms: "CMS",
  css: "CSS",
  faq: "FAQ",
  fps: "FPS",
  gsap: "GSAP",
  html: "HTML",
  http: "HTTP",
  https: "HTTPS",
  id: "ID",
  ios: "iOS",
  ip: "IP",
  it: "IT",
  js: "JS",
  q2: "Q2",
  q3: "Q3",
  rekasandi: "Rekasandi",
  seo: "SEO",
  sla: "SLA",
  sql: "SQL",
  ui: "UI",
  url: "URL",
  utc: "UTC",
  ux: "UX",
  wib: "WIB",
};

const DISPLAY_ACRONYM_PATTERN = new RegExp(
  `(?<![\\p{L}\\p{N}])(${Object.keys(DISPLAY_ACRONYMS)
    .sort((a, b) => b.length - a.length)
    .join("|")})(?![\\p{L}\\p{N}])`,
  "giu",
);

export function sentenceCaseDisplay(value: string | null | undefined, locale = "en") {
  if (typeof value !== "string" || value.length === 0) return "";
  const letters = [...value].filter((character) => /\p{L}/u.test(character));
  if (
    letters.length === 0 ||
    letters.some((letter) => letter !== letter.toLocaleUpperCase(locale))
  ) {
    return value;
  }

  const result = value
    .toLocaleLowerCase(locale)
    .replace(DISPLAY_ACRONYM_PATTERN, (acronym) => DISPLAY_ACRONYMS[acronym.toLowerCase()]);
  const firstLetter = result.search(/\p{L}/u);

  return firstLetter === -1
    ? result
    : result.slice(0, firstLetter) +
        result[firstLetter].toLocaleUpperCase(locale) +
        result.slice(firstLetter + 1);
}
