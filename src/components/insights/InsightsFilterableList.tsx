"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Post } from "@/data/schema";
import { useLocale } from "@/lib/i18n/client";
import { sentenceCaseDisplay } from "@/lib/utils";

export default function InsightsFilterableList({ posts }: { posts: Post[] }) {
  const { locale } = useLocale();
  const isIndonesian = locale === "id";
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(posts.map((post) => post.category))],
    [posts],
  );
  const query = searchQuery.trim().toLocaleLowerCase();

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesCategory =
          selectedCategory === "All" || post.category === selectedCategory;
        const matchesQuery =
          !query ||
          post.title.toLocaleLowerCase().includes(query) ||
          post.excerpt.toLocaleLowerCase().includes(query) ||
          (post.tags || []).some((tag) => tag.toLocaleLowerCase().includes(query));

        return matchesCategory && matchesQuery;
      }),
    [posts, query, selectedCategory],
  );

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-col items-start justify-between gap-5 border-b border-border pb-5 md:flex-row md:items-center">
        <div
          role="group"
          aria-label={isIndonesian ? "Filter berdasarkan kategori" : "Filter by category"}
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-10 rounded-full border px-4 py-2 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {category === "All" && isIndonesian ? "Semua" : sentenceCaseDisplay(category, locale)}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:max-w-72">
          <label htmlFor="insights-search" className="sr-only">
            {isIndonesian ? "Cari esai dan topik" : "Search essays and topics"}
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="insights-search"
            type="search"
            placeholder={isIndonesian ? "Cari esai, topik..." : "Search essays, tags..."}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="min-h-11 w-full rounded-md border border-border bg-background py-2 pl-10 pr-10 text-sm text-foreground shadow-whisper outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={isIndonesian ? "Hapus pencarian" : "Clear search"}
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-start border-t border-border py-12">
          <p className="text-xl font-semibold tracking-tight text-foreground">
            {isIndonesian ? "Esai tidak ditemukan" : "No essays found"}
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {isIndonesian
              ? `Tidak ada esai yang cocok dengan "${searchQuery}" dalam kategori "${selectedCategory}".`
              : `No technical essays match "${searchQuery}" under "${selectedCategory}".`}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-5 inline-flex min-h-10 items-center rounded-full bg-primary px-4 py-2 text-xs font-mono font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {isIndonesian ? "Hapus filter" : "Reset filters"}
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-x-12 md:grid-cols-2 md:gap-x-16">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="flex min-w-0"
              >
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex w-full flex-col justify-between border-t border-border py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:py-8"
                >
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
                      <span className="text-accent-highlight">{sentenceCaseDisplay(post.category, locale)}</span>
                      <span aria-hidden="true" className="h-3 w-px bg-border" />
                      <span>{sentenceCaseDisplay(post.readingTime, locale)}</span>
                      <span aria-hidden="true" className="h-3 w-px bg-border" />
                      <span>{sentenceCaseDisplay(post.publishedAt, locale)}</span>
                    </div>
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent-highlight sm:text-2xl">
                      {sentenceCaseDisplay(post.title, locale)}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {sentenceCaseDisplay(post.excerpt, locale)}
                    </p>
                    {post.tags?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-2.5 py-1 text-[11px] font-mono text-muted-foreground"
                          >
                            {sentenceCaseDisplay(tag, locale)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono font-semibold  tracking-[0.1em] text-foreground transition-colors group-hover:text-accent-highlight">
                    {isIndonesian ? "Baca esai" : "Read essay"}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    />
                  </span>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
