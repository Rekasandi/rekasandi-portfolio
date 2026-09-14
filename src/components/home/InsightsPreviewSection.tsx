"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { POSTS } from "@/data/posts";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCursor } from "@/components/motion/CustomCursor";

export default function InsightsPreviewSection() {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto border-t border-[#e2e0d8]">
      <SectionHeading
        number="07"
        eyebrow="Editorial & Thought Leadership"
        title="Ideas on engineering, AI, and digital craft."
        description="Essays and technical retrospectives from our architects on building category-defining software systems."
        alignment="split"
        action={
          <Link
            href="/insights"
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={resetCursor}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#0a0a0a] hover:underline uppercase font-semibold"
          >
            <span>VIEW ALL ESSAYS (3)</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        }
      />

      {/* Editorial Posts Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {POSTS.map((post, index) => (
          <Link
            key={post.id}
            href={`/insights/${post.slug}`}
            onMouseEnter={() => setCursorVariant("pointer")}
            onMouseLeave={resetCursor}
            className="group p-8 rounded-[12px] border border-[#e2e0d8] bg-white hover:border-[#0a0a0a] transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#7a7870] mb-6">
                <span className="text-[#0a0a0a] font-semibold">[{`0${index + 1}`}]</span>
                <span>{post.category}</span>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="text-xl font-semibold text-[#0a0a0a] group-hover:text-[#55544e] transition-colors duration-300 leading-snug mb-4">
                {post.title}
              </h3>

              <p className="text-sm text-[#55544e] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-[#e2e0d8] flex items-center justify-between font-mono text-xs text-[#7a7870]">
              <span>{post.publishedAt}</span>
              <span className="flex items-center gap-1 text-[#0a0a0a] group-hover:text-[#55544e] transition-colors font-medium">
                <span>READ ARTICLE</span>
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
