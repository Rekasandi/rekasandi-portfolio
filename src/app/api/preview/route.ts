import { draftMode, cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload/client";
import { isValidLocale, LOCALE_COOKIE_NAME } from "@/lib/i18n/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.PREVIEW_SECRET;
  const slug = searchParams.get("slug");
  const locale = searchParams.get("locale");

  if (!secret || searchParams.get("secret") !== secret || !slug || !isValidLocale(locale)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true,
    locale,
    overrideAccess: true,
  });
  const post = result.docs[0];
  if (!post) return new Response("Post not found", { status: 404 });

  (await draftMode()).enable();
  (await cookies()).set(LOCALE_COOKIE_NAME, locale, { httpOnly: true, sameSite: "lax", path: "/" });
  return NextResponse.redirect(new URL(`/insights/${encodeURIComponent(post.slug)}`, request.url));
}
