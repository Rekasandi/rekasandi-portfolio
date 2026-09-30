import type { Metadata } from "next";
import { getTeamMembers, getAboutPageContent } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import AboutView from "@/components/about/about-view";

export const metadata: Metadata = {
  title: "About the studio and its philosophy - Rekasandi",
  description:
    "We are an independent digital product studio focused on building useful, thoughtful, and ambitious digital products for companies worldwide.",
};

export default async function AboutPage() {
  const locale = await getLocale();
  const [teamMembers, aboutContent] = await Promise.all([
    getTeamMembers(locale),
    getAboutPageContent(locale),
  ]);

  return (
    <AboutView
      key={locale}
      initialAboutContent={aboutContent}
      teamMembers={teamMembers}
    />
  );
}
