"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Post } from "@/data/schema";
import { useCursor } from "@/components/motion/CustomCursor";

const CATEGORIES = [
  "All",
  "AI & Strategy",
  "Design Engineering",
  "Architecture",
];

export default function InsightsFilterableList({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { setCursorVariant, resetCursor } = useCursor();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-12">
      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#e2e0d8]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => setCursorVariant("pointer")}
                onMouseLeave={resetCursor}
                className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                  isSelected ? "text-white" : "text-[#55544e] hover:text-[#0a0a0a]"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeInsightCategory"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[#0a0a0a] rounded-full -z-10 shadow-xs"
                  />
                )}
                <span>{category.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72">
          <Search className="size-4 text-[#7a7870] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search essays, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-full bg-white border border-[#e2e0d8] focus:border-[#0a0a0a] text-xs font-mono text-[#0a0a0a] placeholder-[#7a7870] outline-none transition-colors shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7870] hover:text-[#0a0a0a] cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filtered Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center">
          <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest mb-3">
            [NO ESSAYS FOUND]
          </span>
          <p className="text-base text-[#55544e] max-w-sm mb-6">
            No technical essays match &quot;{searchQuery}&quot; under &quot;{selectedCategory}&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-full bg-[#0a0a0a] text-white text-xs font-mono tracking-wider cursor-pointer hover:bg-[#222] transition-colors"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/insights/${post.slug}`}
                  onMouseEnter={() => setCursorVariant("pointer")}
                  onMouseLeave={resetCursor}
                  className="group h-full p-8 sm:p-10 rounded-[8px] bg-white border border-[#e2e0d8] hover:border-[#0a0a0a] transition-all flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-[#7a7870] mb-4">
                      <span className="text-[#0a0a0a] font-semibold">
                        [{`0${idx + 1}`}]
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#f7f6f2] border border-[#e2e0d8] text-[#55544e]">
                        {post.category}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h3 className="heading-m text-2xl font-semibold text-[#0a0a0a] group-hover:text-[#55544e] transition-colors mb-4 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[#55544e] leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-[#7a7870] bg-[#efeee8] px-2 py-0.5 rounded"
                        >
                          #{tag.toLowerCase().replace(/\s+/g, "-")}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#e2e0d8] flex items-center justify-between font-mono text-xs text-[#7a7870]">
                    <span>
                      BY {post.author.name.toUpperCase()} · {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1 text-[#0a0a0a] group-hover:text-[#55544e] transition-colors font-semibold">
                      <span>READ ESSAY</span>
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
