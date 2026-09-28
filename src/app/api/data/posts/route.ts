import { getPosts } from "@/lib/payload/queries";

export async function GET() {
  try {
    const posts = await getPosts();
    return Response.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
