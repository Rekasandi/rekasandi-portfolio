import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getPostBySlug, getPosts } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import InsightView from "@/components/insights/InsightView";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const { isEnabled } = await draftMode();
  const posts = await getPosts(locale);
  const post = isEnabled
    ? await getPostBySlug(slug, locale, true)
    : posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article not found - Rekasandi" };
  }

  const title = post.meta?.title || "";
  const description = post.meta?.description || "";
  const image = post.meta?.image || post.coverImage;
  const url = `https://rekasandi.com/insights/${post.slug}`;

  return {
    title,
    description,
    ...(isEnabled ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Rekasandi",
      type: "article",
      authors: [post.author.name],
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: "" }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const { isEnabled } = await draftMode();
  const posts = await getPosts(locale);
  const post = isEnabled
    ? await getPostBySlug(slug, locale, true)
    : posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts.filter((p) => p.slug !== slug);

  // Schema.org BlogPosting structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Rekasandi Digital Studio",
      url: "https://rekasandi.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rekasandi.com/insights/${post.slug}`,
    },
    keywords: (post.tags || []).join(", "),
    articleSection: post.category,
  };

  return (
    <>
      {isEnabled && (
        <aside role="status" className="sticky top-0 z-50 flex items-center justify-center gap-4 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          <span>{locale === "id" ? "Pratinjau draft — hanya terlihat oleh Anda" : "Draft preview — visible only to you"}</span>
          <form action="/api/preview/exit" method="post">
            <button type="submit" className="underline underline-offset-2">{locale === "id" ? "Keluar" : "Exit preview"}</button>
          </form>
        </aside>
      )}
      <Script
        id="article-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <InsightView initialPost={post} relatedPosts={relatedPosts} />
    </>
  );
}
