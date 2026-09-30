import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import CaseStudyView from "@/components/work/case-study-view";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found - Rekasandi",
    };
  }

  const title = project.meta?.title || "";
  const description = project.meta?.description || "";
  const image = project.meta?.image;
  const url = `https://rekasandi.com/work/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Rekasandi",
      ...(image ? { images: [{ url: image, width: 1920, height: 1080, alt: "" }] } : {}),
      type: "article",
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const allProjects = await getProjects(locale);
  const projectIndex = allProjects.findIndex((p) => p.slug === slug);
  const project = allProjects[projectIndex];

  if (!project) {
    notFound();
  }

  // Next Project pointer
  const nextProjectIndex = (projectIndex + 1) % allProjects.length;
  const nextProject = allProjects[nextProjectIndex];

  // Schema.org CreativeWork structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    name: project.title,
    description: project.summary,
    image: project.heroImage,
    datePublished: `${project.year}-01-01`,
    author: {
      "@type": "Organization",
      name: "Rekasandi Digital Studio",
      url: "https://rekasandi.com",
    },
    creator: {
      "@type": "Organization",
      name: "Rekasandi Digital Studio",
      url: "https://rekasandi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Rekasandi",
      url: "https://rekasandi.com",
    },
    about: project.category,
    keywords: [project.category, project.industry, ...(project.technologies || [])].join(", "),
  };

  return (
    <>
      <Script
        id="project-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CaseStudyView initialProject={project} nextProject={nextProject} />
    </>
  );
}
