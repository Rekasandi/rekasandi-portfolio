import { getTeamMembers, getAboutPageContent } from "@/lib/payload/queries";

export async function GET() {
  try {
    const [teamMembers, aboutContent] = await Promise.all([
      getTeamMembers(),
      getAboutPageContent(),
    ]);

    return Response.json({
      teamMembers,
      aboutContent,
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
