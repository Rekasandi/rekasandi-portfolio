import HomeView from "@/components/home/HomeView";
import {
  getProjects,
  getServices,
  getPosts,
  getSiteSettings,
  getHomePageContent,
} from "@/lib/payload/queries";

export default async function HomePage() {
  const [projects, services, posts, siteSettings, homeContent] = await Promise.all([
    getProjects(),
    getServices(),
    getPosts(),
    getSiteSettings(),
    getHomePageContent(),
  ]);

  return (
    <HomeView
      initialHomeContent={homeContent}
      initialSiteSettings={siteSettings}
      projects={projects}
      services={services}
      posts={posts}
    />
  );
}
