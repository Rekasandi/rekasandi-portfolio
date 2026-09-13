import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { POSTS } from "@/data/posts";

export const metadata: Metadata = {
  title: "Insights & Technical Writing — REKASANDI",
  description:
    "Perspectives on modern software engineering, artificial intelligence, and digital craft from the architects at Rekasandi.",
};

export default function InsightsPage() {
  return (
    <div className="py-16 sm:py-24 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="pb-16 max-w-4xl border-b border-[#e2e0d8]">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
            [EDITORIAL]
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
            THOUGHT LEADERSHIP
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6">
          INSIGHTS & ESSAYS.
        </h1>
        <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
          Reflections, technical blueprints, and design philosophies from our team on building software that endures.
        </p>
      </div>

      {/* Featured First Article */}
      <div className="py-16 border-b border-[#e2e0d8]">
        <div className="p-8 sm:p-14 rounded-[8px] bg-white border border-[#e2e0d8] hover:border-[#0a0a0a] transition-colors shadow-sm">
          <div className="flex items-center gap-4 font-mono text-xs text-[#7a7870] mb-6">
            <span className="text-[#0a0a0a] font-semibold">[FEATURED ESSAY]</span>
            <span>{POSTS[0].category}</span>
            <span>●</span>
            <span>{POSTS[0].readingTime}</span>
          </div>

          <Link href={`/insights/${POSTS[0].slug}`} className="group block">
            <h2 className="heading-l text-3xl sm:text-5xl font-semibold text-[#0a0a0a] group-hover:text-[#55544e] transition-colors mb-6 leading-tight">
              {POSTS[0].title}
            </h2>
          </Link>

          <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
            {POSTS[0].excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#e2e0d8] font-mono text-xs text-[#7a7870]">
            <span>BY {POSTS[0].author.name.toUpperCase()} · {POSTS[0].publishedAt}</span>
            <Link
              href={`/insights/${POSTS[0].slug}`}
              className="inline-flex items-center gap-1.5 text-[#0a0a0a] hover:text-[#55544e] transition-colors font-semibold"
            >
              <span>READ ESSAY</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Remaining Articles List */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {POSTS.slice(1).map((post, idx) => (
          <Link
            key={post.id}
            href={`/insights/${post.slug}`}
            className="group p-8 sm:p-10 rounded-[8px] bg-white border border-[#e2e0d8] hover:border-[#0a0a0a] transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#7a7870] mb-4">
                <span className="text-[#0a0a0a] font-semibold">[{`0${idx + 2}`}]</span>
                <span>{post.category}</span>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="heading-m text-2xl font-semibold text-[#0a0a0a] group-hover:text-[#55544e] transition-colors mb-4 leading-snug">
                {post.title}
              </h3>

              <p className="text-sm text-[#55544e] leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#e2e0d8] flex items-center justify-between font-mono text-xs text-[#7a7870]">
              <span>{post.publishedAt}</span>
              <span className="flex items-center gap-1 text-[#0a0a0a] group-hover:text-[#55544e] transition-colors font-semibold">
                <span>READ</span>
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
