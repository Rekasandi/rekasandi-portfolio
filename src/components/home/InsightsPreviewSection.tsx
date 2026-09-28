"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Post } from "@/data/schema";
import { POSTS as FALLBACK_POSTS } from "@/data/posts";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/client";

interface InsightsPreviewSectionProps {
  posts?: Post[];
}

export default function InsightsPreviewSection({
  posts = FALLBACK_POSTS,
}: InsightsPreviewSectionProps) {
  const { locale } = useLocale();
  const list = (posts && posts.length > 0 ? posts : FALLBACK_POSTS).slice(0, 3);

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <SectionHeading
        number="07"
        eyebrow={locale === "id" ? "Editorial & Gagasan Terkini" : "Editorial & Thought Leadership"}
        title={locale === "id" ? "Gagasan seputar rekayasa, AI, dan seni digital." : "Ideas on engineering, AI, and digital craft."}
        description={locale === "id" ? "Esai dan retrospektif teknis dari para arsitek kami tentang membangun sistem perangkat lunak terdepan." : "Essays and technical retrospectives from our architects on building category-defining software systems."}
        alignment="split"
        action={
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-foreground hover:text-accent uppercase font-semibold transition-colors"
          >
            <span>{locale === "id" ? `LIHAT SEMUA ESAI (${posts.length})` : `VIEW ALL ESSAYS (${posts.length})`}</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        }
      />

      {/* Editorial Posts Grid */}
      <div className="mt-16 grid grid-flow-dense grid-cols-1 gap-8 md:grid-cols-3">
        {list.map((post, index) => (
          <Link
            key={post.id}
            href={`/insights/${post.slug}`}
            className="group p-6 sm:p-8 rounded-[12px] border border-border bg-card shadow-whisper hover:border-foreground/30 transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-6">
                <span className="text-foreground font-semibold">[{`0${index + 1}`}]</span>
                <span>{post.category}</span>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground transition-colors duration-300 leading-snug mb-4">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-border flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>{post.publishedAt}</span>
              <span className="flex items-center gap-1 text-foreground group-hover:text-accent transition-colors font-medium">
                <span>{locale === "id" ? "BACA ARTIKEL" : "READ ARTICLE"}</span>
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
