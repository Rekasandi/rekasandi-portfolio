"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Post } from "@/data/schema";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { useLocale } from "@/lib/i18n/client";

export interface InsightViewProps {
  initialPost: Post;
  relatedPosts: Post[];
}

export default function InsightView({
  initialPost,
  relatedPosts,
}: InsightViewProps) {
  const { locale } = useLocale();
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
      <div className="pt-8 pb-4 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="size-3.5" />
          <span>{locale === "id" ? "KEMBALI KE SEMUA ESAI" : "BACK TO ALL ESSAYS"}</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 font-mono text-xs text-accent font-semibold mb-6">
          <span>[{post.category.toUpperCase()}]</span>
          <span className="text-muted-foreground">●</span>
          <span className="text-muted-foreground">{post.readingTime}</span>
          <span className="text-muted-foreground">●</span>
          <span className="text-muted-foreground">{post.publishedAt}</span>
        </div>

        <h1 className="display-xl text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-8 leading-tight">
          {post.title}
        </h1>

        {(() => {
          const authorRaw = post.author as unknown;
          let authorName = "Rekasandi Editorial Team";
          let authorRole = "Studio Author";

          if (typeof authorRaw === "string" && authorRaw.trim()) {
            authorName = authorRaw.trim();
          } else if (
            authorRaw &&
            typeof authorRaw === "object" &&
            "name" in authorRaw &&
            typeof (authorRaw as { name?: unknown }).name === "string"
          ) {
            authorName = (authorRaw as { name: string; role?: string }).name || "Rekasandi Editorial Team";
            authorRole = (authorRaw as { name: string; role?: string }).role || "Studio Author";
          }

          const initial = authorName.charAt(0).toUpperCase() || "R";

          return (
            <div className="flex items-center gap-4 pb-12 border-b border-border">
              <div className="size-10 rounded-full bg-muted border border-border flex items-center justify-center font-mono text-sm text-foreground font-bold">
                {initial}
              </div>
              <div className="font-mono text-xs">
                <span className="text-foreground font-semibold block">{authorName}</span>
                <span className="text-muted-foreground">{authorRole}</span>
              </div>
            </div>
          );
        })()}

        {/* Lead Excerpt */}
        <div className="py-10">
          <p className="text-xl sm:text-2xl text-foreground leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </div>

        {/* Article Body Content */}
        <div className="flex flex-col gap-6 text-muted-foreground text-lg leading-relaxed font-normal pt-4 border-t border-border">
          {(Array.isArray(post.content) ? post.content : [post.content]).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-12 mt-12 border-t border-border flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground mr-2">
              {locale === "id" ? "TOPIK:" : "TAGS:"}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-[4px] bg-surface-elevated border border-border text-xs font-mono text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Essays */}
      <section className="py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-border">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-8 font-semibold">
          {locale === "id" ? "LANJUTKAN MEMBACA" : "CONTINUE READING"}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedPosts.slice(0, 2).map((rel) => (
            <Link
              key={rel.id}
              href={`/insights/${rel.slug}`}
              className="group p-8 rounded-[8px] bg-surface border border-border hover:border-accent transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="font-mono text-xs text-accent font-semibold block mb-3">
                  [{rel.category}]
                </span>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground transition-colors mb-3">
                  {rel.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-border flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>{rel.readingTime}</span>
                <ArrowUpRight className="size-4 text-foreground group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
