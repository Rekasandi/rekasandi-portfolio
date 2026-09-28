import { getServices, getServicesPageContent } from "@/lib/payload/queries";

export async function GET() {
  try {
    const [services, servicesContent] = await Promise.all([
      getServices(),
      getServicesPageContent(),
    ]);

    return Response.json({
      services,
      servicesContent,
    });
  } catch (error) {
    console.error("Error fetching services data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
