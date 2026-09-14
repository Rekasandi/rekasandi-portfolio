import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/payload/queries";
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
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found — REKASANDI" };
  }

  const title = post.meta?.title || `${post.title} — REKASANDI Insights`;
  const description = post.meta?.description || post.excerpt;
  const image = post.meta?.image || "https://rekasandi.com/og.jpg";
  const url = `https://rekasandi.com/insights/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "REKASANDI",
      type: "article",
      authors: [
        typeof post.author === "object" && post.author !== null && "name" in post.author
          ? post.author.name
          : (post.author as unknown as string) || "Rekasandi Editorial Team",
      ],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

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
      name:
        typeof post.author === "object" && post.author !== null && "name" in post.author
          ? post.author.name
          : (post.author as unknown as string) || "Rekasandi Editorial Team",
      jobTitle:
        typeof post.author === "object" && post.author !== null && "role" in post.author
          ? post.author.role
          : "Studio Author",
    },
    publisher: {
      "@type": "Organization",
      name: "REKASANDI Digital Studio",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InsightView initialPost={post} relatedPosts={relatedPosts} />
    </>
  );
}
