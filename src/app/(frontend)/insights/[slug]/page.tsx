'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from "next/navigation";
import InsightView from "@/components/insights/InsightView";
import type { Post } from "@/data/schema";

export default function InsightDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data/post/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json();
        
        // Fetch all posts to get related posts
        const postsResponse = await fetch('/api/data/posts');
        const postsData = await postsResponse.json();
        
        const allPosts = postsData.posts;
        const related = allPosts.filter((p: Post) => p.slug !== slug);
        
        setPost(result.post);
        setRelatedPosts(related);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center">No data</div>;

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

