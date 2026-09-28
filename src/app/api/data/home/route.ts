import { getProjects, getServices, getPosts, getSiteSettings, getHomePageContent } from "@/lib/payload/queries";

export async function GET() {
  try {
    const [projects, services, posts, siteSettings, homeContent] = await Promise.all([
      getProjects(),
      getServices(),
      getPosts(),
      getSiteSettings(),
      getHomePageContent(),
    ]);

    return Response.json({
      projects,
      services,
      posts,
      siteSettings,
      homeContent,
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
