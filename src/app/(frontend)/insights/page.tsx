import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import InsightsFilterableList from "@/components/insights/InsightsFilterableList";

export const metadata: Metadata = {
  title: "Insights & Technical Writing — REKASANDI",
  description:
    "Perspectives on modern software engineering, artificial intelligence, and digital craft from the architects at Rekasandi.",
};

export default async function InsightsPage() {
  const locale = await getLocale();
  const posts = await getPosts(locale);
  const featuredPost = posts[0];

  return (
    <div className="py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="pb-16 max-w-4xl border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent font-semibold tracking-widest">
            {locale === "id" ? "[EDITORIAL]" : "[EDITORIAL]"}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {locale === "id" ? "GAGASAN TERKINI" : "THOUGHT LEADERSHIP"}
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-foreground mb-6">
          {locale === "id" ? "WAWASAN & ESAI." : "INSIGHTS & ESSAYS."}
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
          {locale === "id"
            ? "Refleksi, cetak biru teknis, dan filosofi desain dari tim kami untuk membangun software yang bertahan lama."
            : "Reflections, technical blueprints, and design philosophies from our team on building software that endures."}
        </p>
      </div>

      {/* Featured First Article */}
      {featuredPost && (
        <div className="py-16 border-b border-border">
          <div className="p-8 sm:p-14 rounded-[8px] bg-surface border border-border hover:border-accent transition-colors shadow-sm">
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground mb-6">
              <span className="text-accent font-semibold">
                {locale === "id" ? "[ESAI PILIHAN]" : "[FEATURED ESSAY]"}
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-muted-foreground">
                {featuredPost.category}
              </span>
              <span>●</span>
              <span>{featuredPost.readingTime}</span>
            </div>

            <Link href={`/insights/${featuredPost.slug}`} className="group block">
              <h2 className="heading-l text-3xl sm:text-5xl font-semibold text-foreground group-hover:text-foreground transition-colors mb-6 leading-tight">
                {featuredPost.title}
              </h2>
            </Link>

            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl mb-8">
              {featuredPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border font-mono text-xs text-muted-foreground">
              <span>
                {locale === "id" ? "OLEH " : "BY "}
                {((typeof featuredPost.author === "object" && featuredPost.author !== null && "name" in featuredPost.author ? featuredPost.author.name : (featuredPost.author as unknown as string)) || "REKASANDI EDITORIAL").toUpperCase()} · {featuredPost.publishedAt}
              </span>
              <Link
                href={`/insights/${featuredPost.slug}`}
                className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors font-semibold"
              >
                <span>{locale === "id" ? "BACA ESAI" : "READ ESSAY"}</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Filterable Articles Collection */}
      <div className="py-16">
        <div className="mb-10">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
            ARCHIVE & EXPLORATION
          </span>
          <h2 className="heading-m text-3xl font-semibold text-foreground">
            ALL ARCHITECTURAL WRITING
          </h2>
        </div>
        <InsightsFilterableList posts={posts} />
      </div>
    </div>
  );
}
