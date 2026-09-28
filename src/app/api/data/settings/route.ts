import { getSiteSettings } from "@/lib/payload/queries";

export async function GET() {
  try {
    const settingsData = await getSiteSettings();
    return Response.json(settingsData);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
