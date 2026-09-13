import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/payload/queries";
import CaseStudyView from "@/components/work/CaseStudyView";

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
      title: "Project Not Found — REKASANDI",
    };
  }

  const title = project.meta?.title || `${project.title} — REKASANDI Case Study`;
  const description = project.meta?.description || project.summary || project.tagline;
  const image = project.meta?.image || project.heroImage;
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
      siteName: "REKASANDI",
      images: [
        {
          url: image,
          width: 1920,
          height: 1080,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allProjects = await getProjects();
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
      name: "REKASANDI Digital Studio",
      url: "https://rekasandi.com",
    },
    creator: {
      "@type": "Organization",
      name: "REKASANDI Digital Studio",
      url: "https://rekasandi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "REKASANDI",
      url: "https://rekasandi.com",
    },
    about: project.category,
    keywords: [project.category, project.industry, ...(project.technologies || [])].join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyView initialProject={project} nextProject={nextProject} />
    </>
  );
}
