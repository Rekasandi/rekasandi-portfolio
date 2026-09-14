import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/payload/queries";
import InsightsFilterableList from "@/components/insights/InsightsFilterableList";

export const metadata: Metadata = {
  title: "Insights & Technical Writing — REKASANDI",
  description:
    "Perspectives on modern software engineering, artificial intelligence, and digital craft from the architects at Rekasandi.",
};

export default async function InsightsPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];

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
      {featuredPost && (
        <div className="py-16 border-b border-[#e2e0d8]">
          <div className="p-8 sm:p-14 rounded-[8px] bg-white border border-[#e2e0d8] hover:border-[#0a0a0a] transition-colors shadow-sm">
            <div className="flex items-center gap-4 font-mono text-xs text-[#7a7870] mb-6">
              <span className="text-[#0a0a0a] font-semibold">[FEATURED ESSAY]</span>
              <span className="px-2 py-0.5 rounded bg-[#f7f6f2] border border-[#e2e0d8] text-[#55544e]">
                {featuredPost.category}
              </span>
              <span>●</span>
              <span>{featuredPost.readingTime}</span>
            </div>

            <Link href={`/insights/${featuredPost.slug}`} className="group block">
              <h2 className="heading-l text-3xl sm:text-5xl font-semibold text-[#0a0a0a] group-hover:text-[#55544e] transition-colors mb-6 leading-tight">
                {featuredPost.title}
              </h2>
            </Link>

            <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#e2e0d8] font-mono text-xs text-[#7a7870]">
              <span>
                BY {((typeof featuredPost.author === "object" && featuredPost.author !== null && "name" in featuredPost.author ? featuredPost.author.name : (featuredPost.author as unknown as string)) || "REKASANDI EDITORIAL").toUpperCase()} · {featuredPost.publishedAt}
              </span>
              <Link
                href={`/insights/${featuredPost.slug}`}
                className="inline-flex items-center gap-1.5 text-[#0a0a0a] hover:text-[#55544e] transition-colors font-semibold"
              >
                <span>READ ESSAY</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Filterable Articles Collection */}
      <div className="py-16">
        <div className="mb-10">
          <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-2">
            ARCHIVE & EXPLORATION
          </span>
          <h2 className="heading-m text-3xl font-semibold text-[#0a0a0a]">
            ALL ARCHITECTURAL WRITING
          </h2>
        </div>
        <InsightsFilterableList posts={posts} />
      </div>
    </div>
  );
}
