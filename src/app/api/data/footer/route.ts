import { getFooter } from "@/lib/payload/queries";

export async function GET() {
  try {
    const footerData = await getFooter();
    return Response.json(footerData);
  } catch (error) {
    console.error("Error fetching footer:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
