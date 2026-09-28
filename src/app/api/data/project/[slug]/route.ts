import { getProjectBySlug } from "@/lib/payload/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
