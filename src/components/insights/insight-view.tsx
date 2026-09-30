"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Post } from "@/data/schema";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { useLocale } from "@/lib/i18n/client";
import { localizeCategory } from "@/lib/i18n/content";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import { sentenceCaseDisplay } from "@/lib/utils";

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

  const authorRaw: unknown = post.author;
  const authorRecord =
    typeof authorRaw === "object" && authorRaw !== null
      ? (authorRaw as { name?: unknown; role?: unknown })
      : null;
  const authorName =
    typeof authorRaw === "string"
      ? authorRaw
      : typeof authorRecord?.name === "string"
        ? authorRecord.name
        : "";
  const authorRole = typeof authorRecord?.role === "string" ? authorRecord.role : "";
  const initial = authorName.charAt(0).toUpperCase();
  const isIndonesian = locale === "id";

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-8 sm:px-10 lg:px-16">
        <Link
          href="/insights"
          className="inline-flex min-h-10 items-center gap-2 rounded-sm font-mono text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{isIndonesian ? "Kembali ke semua esai" : "Back to all essays"}</span>
        </Link>
      </div>

      <article className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-12 lg:px-16">
        <header className="mx-auto max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
            <span className="text-accent-highlight">{localizeCategory(post.category, locale)}</span>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <span>{sentenceCaseDisplay(post.readingTime, locale)}</span>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <span>{sentenceCaseDisplay(post.publishedAt, locale)}</span>
          </div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
            {sentenceCaseDisplay(post.title, locale)}
          </h1>
          <div className="mt-8 flex items-center gap-4 border-y border-border py-5">
            <div
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-muted font-mono text-sm font-semibold text-foreground"
            >
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{sentenceCaseDisplay(authorName, locale)}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{sentenceCaseDisplay(authorRole, locale)}</p>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-xl bg-muted sm:mt-12">
            <Image src={post.coverImage} alt="" fill sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover" />
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          <p className="py-8 text-xl font-medium leading-relaxed text-foreground sm:py-10 sm:text-2xl">
            {sentenceCaseDisplay(post.excerpt, locale)}
          </p>
          <div className="flex flex-col gap-6 border-t border-border pt-8 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {post.content.map((paragraph, index) => (
                <p key={index}>{sentenceCaseDisplay(paragraph, locale)}</p>
            ))}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <span className="mr-1 font-mono text-xs text-muted-foreground">
                {isIndonesian ? "Topik" : "Tags"}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground"
                >
                  {sentenceCaseDisplay(tag, locale)}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mx-auto w-full max-w-[1600px] border-t border-border px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <header className="mb-8 sm:mb-10">
            <SectionEyebrow>
              {isIndonesian ? "Lanjutkan membaca" : "Continue reading"}
            </SectionEyebrow>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
              {isIndonesian ? "Esai terkait" : "Related essays"}
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2 md:gap-x-16">
            {relatedPosts.slice(0, 2).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/insights/${relatedPost.slug}`}
                className="group flex flex-col border-t border-border py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:py-8"
              >
                <span className="font-mono text-xs text-accent-highlight">
                  {localizeCategory(relatedPost.category, locale)}
                </span>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent-highlight sm:text-2xl">
                  {sentenceCaseDisplay(relatedPost.title, locale)}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {sentenceCaseDisplay(relatedPost.excerpt, locale)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono font-semibold  tracking-[0.1em] text-foreground transition-colors group-hover:text-accent-highlight">
                  {isIndonesian ? "Baca esai" : "Read essay"}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
