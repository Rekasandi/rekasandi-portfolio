import HomeView from "@/components/home/HomeView";
import {
  getProjects,
  getServices,
  getPosts,
  getSiteSettings,
  getHomePageContent,
} from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  const [projects, services, posts, siteSettings, homeContent] = await Promise.all([
    getProjects(locale),
    getServices(locale),
    getPosts(locale),
    getSiteSettings(locale),
    getHomePageContent(locale),
  ]);

  return (
    <HomeView
      key={locale}
      initialHomeContent={homeContent}
      initialSiteSettings={siteSettings}
      projects={projects}
      services={services}
      posts={posts}
    />
  );
}
