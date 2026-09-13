"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Post } from "@/data/schema";
import { useLivePreview } from "@payloadcms/live-preview-react";

export interface InsightViewProps {
  initialPost: Post;
  relatedPosts: Post[];
}

export default function InsightView({
  initialPost,
  relatedPosts,
}: InsightViewProps) {
  const serverURL =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const { data: post } = useLivePreview<Post>({
    initialData: initialPost,
    serverURL,
    depth: 2,
  });

  return (
    <div className="w-full">
      {/* Return Breadcrumb */}
      <div className="pt-8 pb-4 px-6 sm:px-10 md:px-16 max-w-[1200px] mx-auto">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#55544e] hover:text-[#0a0a0a] transition-colors font-medium"
        >
          <ArrowLeft className="size-3.5" />
          <span>BACK TO ALL ESSAYS</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="py-12 sm:py-16 px-6 sm:px-10 md:px-16 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 font-mono text-xs text-[#0a0a0a] font-semibold mb-6">
          <span>[{post.category.toUpperCase()}]</span>
          <span className="text-[#7a7870]">●</span>
          <span className="text-[#7a7870]">{post.readingTime}</span>
          <span className="text-[#7a7870]">●</span>
          <span className="text-[#7a7870]">{post.publishedAt}</span>
        </div>

        <h1 className="display-xl text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#0a0a0a] mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 pb-12 border-b border-[#e2e0d8]">
          <div className="size-10 rounded-full bg-[#f0efe9] border border-[#e2e0d8] flex items-center justify-center font-mono text-sm text-[#0a0a0a] font-bold">
            {post.author.name[0]}
          </div>
          <div className="font-mono text-xs">
            <span className="text-[#0a0a0a] font-semibold block">{post.author.name}</span>
            <span className="text-[#55544e]">{post.author.role}</span>
          </div>
        </div>

        {/* Lead Excerpt */}
        <div className="py-10">
          <p className="text-xl sm:text-2xl text-[#0a0a0a] leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </div>

        {/* Article Body Content */}
        <div className="flex flex-col gap-6 text-[#55544e] text-lg leading-relaxed font-normal pt-4 border-t border-[#e2e0d8]">
          {(Array.isArray(post.content) ? post.content : [post.content]).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-12 mt-12 border-t border-[#e2e0d8] flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#7a7870] mr-2">TAGS:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-[4px] bg-[#f7f6f2] border border-[#e2e0d8] text-xs font-mono text-[#0a0a0a]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Essays */}
      <section className="py-20 px-6 sm:px-10 md:px-16 max-w-[1200px] mx-auto border-t border-[#e2e0d8]">
        <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-8 font-semibold">
          CONTINUE READING
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedPosts.slice(0, 2).map((rel) => (
            <Link
              key={rel.id}
              href={`/insights/${rel.slug}`}
              className="group p-8 rounded-[8px] bg-white border border-[#e2e0d8] hover:border-[#0a0a0a] transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="font-mono text-xs text-[#0a0a0a] font-semibold block mb-3">
                  [{rel.category}]
                </span>
                <h3 className="text-xl font-semibold text-[#0a0a0a] group-hover:text-[#55544e] transition-colors mb-3">
                  {rel.title}
                </h3>
                <p className="text-sm text-[#55544e] line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#e2e0d8] flex items-center justify-between font-mono text-xs text-[#7a7870]">
                <span>{rel.readingTime}</span>
                <ArrowUpRight className="size-4 text-[#0a0a0a] group-hover:text-[#55544e]" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
