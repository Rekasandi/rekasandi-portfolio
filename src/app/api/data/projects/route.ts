import { getProjects } from "@/lib/payload/queries";

export async function GET() {
  try {
    const projects = await getProjects();
    return Response.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
