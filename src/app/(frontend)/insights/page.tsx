import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import InsightsFilterableList from "@/components/insights/InsightsFilterableList";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export const metadata: Metadata = {
  title: "Insights and technical writing - Rekasandi",
  description:
    "Perspectives on modern software engineering, artificial intelligence, and digital craft from the architects at Rekasandi.",
};

const FEATURE_IMAGE = "/images/insights/design-systems.png";

export default async function InsightsPage() {
  const locale = await getLocale();
  const posts = await getPosts(locale);
  const [featuredPost, ...archivePosts] = posts;
  const isIndonesian = locale === "id";

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <header className="max-w-4xl border-b border-border pb-12 sm:pb-16">
        <SectionEyebrow>
          {isIndonesian ? "Perspektif studio" : "Studio perspectives"}
        </SectionEyebrow>
        <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-7xl">
          {isIndonesian ? "Wawasan & esai." : "Insights & essays."}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {isIndonesian
            ? "Refleksi, cetak biru teknis, dan filosofi desain dari tim kami untuk membangun software yang bertahan lama."
            : "Reflections, technical blueprints, and design philosophies from our team on building software that endures."}
        </p>
      </header>

      {featuredPost && (
        <section className="grid grid-cols-1 items-center gap-8 border-b border-border py-12 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
          <Link
            href={`/insights/${featuredPost.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 lg:col-span-6"
            aria-label={`${isIndonesian ? "Baca esai pilihan" : "Read featured essay"}: ${featuredPost.title}`}
          >
            <Image
              src={FEATURE_IMAGE}
              alt="Modular forms arranged as a study in digital design systems"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </Link>

          <div className="lg:col-span-6">
            <p className="mb-4 font-mono text-xs font-medium  tracking-[0.16em] text-accent-highlight">
              {isIndonesian ? "Esai pilihan" : "Featured essay"}
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
              <span className="text-foreground">{featuredPost.category}</span>
              <span aria-hidden="true" className="h-3 w-px bg-border" />
              <span>{featuredPost.readingTime}</span>
              <span aria-hidden="true" className="h-3 w-px bg-border" />
              <span>{featuredPost.publishedAt}</span>
            </div>
            <Link href={`/insights/${featuredPost.slug}`} className="group/title rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground transition-colors group-hover/title:text-accent-highlight sm:text-4xl">
                {featuredPost.title}
              </h2>
            </Link>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {featuredPost.excerpt}
            </p>
            <Link
              href={`/insights/${featuredPost.slug}`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-mono font-semibold  tracking-[0.12em] text-foreground transition-colors hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <span>{isIndonesian ? "Baca esai" : "Read essay"}</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      )}

      {!featuredPost && (
        <p className="border-t border-border py-12 text-sm text-muted-foreground">
          {isIndonesian ? "Belum ada esai untuk ditampilkan." : "No essays to display yet."}
        </p>
      )}

      {archivePosts.length > 0 && (
        <section className="py-12 sm:py-16">
          <header className="mb-8 max-w-3xl sm:mb-10">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
              {isIndonesian ? "Semua tulisan arsitektur" : "All architectural writing"}
            </h2>
          </header>
          <InsightsFilterableList posts={archivePosts} />
        </section>
      )}
    </div>
  );
}
