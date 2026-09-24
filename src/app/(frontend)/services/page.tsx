import type { Metadata } from "next";
import { getServices, getServicesPageContent } from "@/lib/payload/queries";
import ServicesView from "@/components/services/ServicesView";

export const metadata: Metadata = {
  title: "Services & Capabilities — REKASANDI Digital Studio",
  description:
    "Explore our full-lifecycle product engineering capabilities across web experiences, software systems, AI automation, and mobile applications.",
};

export default async function ServicesPage() {
  const [services, servicesContent] = await Promise.all([
    getServices(),
    getServicesPageContent(),
  ]);

  return (
    <ServicesView
      initialServicesContent={servicesContent}
      services={services}
    />
  );
}
