import { getNavigation } from "@/lib/payload/queries";

export async function GET() {
  try {
    const navData = await getNavigation();
    return Response.json(navData);
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
