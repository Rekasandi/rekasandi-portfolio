import type { Locale } from "./config";

const categoryLabels: Record<string, string> = {
  All: "Semua",
  "Digital Product": "Produk digital",
  "AI & Automation": "AI & otomasi",
  "Web Experience": "Pengalaman web",
  "Custom Software": "Software khusus",
  "Mobile Application": "Aplikasi mobile",
  "Artificial Intelligence": "Kecerdasan buatan",
  "FinTech & Banking": "Teknologi finansial & perbankan",
  "FinTech & Payments": "Teknologi finansial & pembayaran",
  "Enterprise Software": "Software perusahaan",
  "Mobility & Fleet": "Mobilitas & armada",
  "Supply Chain & Logistics": "Rantai pasok & logistik",
  Logistics: "Logistik",
  "Design Systems": "Sistem desain",
  "E-Commerce": "Perdagangan elektronik",
  Healthcare: "Layanan kesehatan",
  Other: "Lainnya",
  Engineering: "Rekayasa",
  "AI & Systems": "AI & sistem",
  Architecture: "Arsitektur",
  Interaction: "Interaksi",
};

export function localizeCategory(value: string, locale: Locale) {
  return locale === "id" ? categoryLabels[value] || value : value;
}
