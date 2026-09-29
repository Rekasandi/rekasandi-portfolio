import type { Metadata } from "next";
import { getServices, getServicesPageContent } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import ServicesView from "@/components/services/ServicesView";

export const metadata: Metadata = {
  title: "Services & Capabilities - REKASANDI Digital Studio",
  description:
    "Product strategy, design, and engineering for web, software, AI, and mobile applications."
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const [services, servicesContent] = await Promise.all([
    getServices(locale),
    getServicesPageContent(locale),
  ]);

  return (
    <ServicesView
      key={locale}
      initialServicesContent={servicesContent}
      services={services}
    />
  );
}
