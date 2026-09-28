import { getPostBySlug } from "@/lib/payload/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
