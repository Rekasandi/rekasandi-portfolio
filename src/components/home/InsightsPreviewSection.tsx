"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/data/schema";
import { POSTS as FALLBACK_POSTS } from "@/data/posts";
import { useLocale } from "@/lib/i18n/client";
import { localizeCategory } from "@/lib/i18n/content";
import { sentenceCaseDisplay } from "@/lib/utils";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface InsightsPreviewSectionProps {
  posts?: Post[];
}

const FEATURE_IMAGE = "/images/insights/design-systems.png";

export default function InsightsPreviewSection({
  posts = FALLBACK_POSTS,
}: InsightsPreviewSectionProps) {
  const { locale } = useLocale();
  const articles = (posts.length > 0 ? posts : FALLBACK_POSTS).slice(0, 3);
  const [featured, ...moreArticles] = articles;
  const articleCount = posts.length > 0 ? posts.length : FALLBACK_POSTS.length;
  const isIndonesian = locale === "id";

  if (!featured) return null;

  return (
    <section className="w-full border-t border-border bg-background" aria-labelledby="studio-notes-title">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <SectionEyebrow>
            {isIndonesian ? "Catatan dari studio" : "Notes from the studio"}
          </SectionEyebrow>
          <h2
            id="studio-notes-title"
            className="text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl"
          >
            {isIndonesian
              ? "Gagasan di balik produk digital yang lebih baik."
              : "Ideas behind better digital products."}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {isIndonesian
              ? "Perspektif dari proses merancang, menguji, dan membangun produk."
              : "Perspectives from the work of designing, testing, and building products."}
          </p>
          <Link
            href="/insights"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-mono font-semibold  tracking-[0.12em] text-foreground transition-colors hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <span>
              {isIndonesian
                ? `Lihat semua tulisan (${articleCount})`
                : `View all writing (${articleCount})`}
            </span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <article>
            <Link
              href={`/insights/${featured.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              aria-label={`${isIndonesian ? "Baca tulisan" : "Read article"}: ${sentenceCaseDisplay(featured.title, locale)}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/10]">
                <Image
                  src={FEATURE_IMAGE}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="pt-6">
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono  tracking-[0.1em] text-muted-foreground">
                  <span className="text-accent-highlight">{localizeCategory(featured.category, locale)}</span>
                  <span aria-hidden="true" className="h-3 w-px bg-border" />
                  <span>{sentenceCaseDisplay(featured.publishedAt, locale)}</span>
                  <span aria-hidden="true" className="h-3 w-px bg-border" />
                  <span>{sentenceCaseDisplay(featured.readingTime, locale)}</span>
                </div>
                <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground transition-colors group-hover:text-accent-highlight sm:text-3xl">
                  {sentenceCaseDisplay(featured.title, locale)}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {sentenceCaseDisplay(featured.excerpt, locale)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-[0.1em] text-foreground">
                  {isIndonesian ? "Baca tulisan" : "Read article"}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </span>
              </div>
            </Link>
          </article>

          {moreArticles.length > 0 && (
            <div className="flex flex-col divide-y divide-border border-y border-border">
              {moreArticles.map((post) => (
                <article key={post.id} className="group flex flex-1 py-7 first:pt-7 last:pb-7 sm:py-9">
                  <Link
                    href={`/insights/${post.slug}`}
                    className="flex w-full flex-col justify-between gap-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono  tracking-[0.1em] text-muted-foreground">
                        <span className="text-accent-highlight">{localizeCategory(post.category, locale)}</span>
                        <span aria-hidden="true" className="h-3 w-px bg-border" />
                        <span>{sentenceCaseDisplay(post.readingTime, locale)}</span>
                      </div>
                      <h3 className="text-xl font-semibold leading-snug tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent-highlight sm:text-2xl">
                        {sentenceCaseDisplay(post.title, locale)}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {sentenceCaseDisplay(post.excerpt, locale)}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-[0.1em] text-foreground">
                      {isIndonesian ? "Baca tulisan" : "Read article"}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
