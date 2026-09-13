import type { Metadata } from "next";
import { getProjects } from "@/lib/payload/queries";
import WorkFilterableList from "@/components/work/WorkFilterableList";

export const metadata: Metadata = {
  title: "Work & Case Studies — REKASANDI Digital Studio",
  description:
    "Explore our portfolio of category-defining digital products, AI architectures, and high-performance web systems.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
      {/* Editorial Page Header */}
      <div className="pb-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
            [INDEX]
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
            PORTFOLIO ARCHIVE
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6">
          SELECTED WORK.
        </h1>
        <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
          A showcase of products, platforms, and distributed systems engineered with editorial precision and technical authority.
        </p>
      </div>

      {/* Interactive Filterable Projects Grid */}
      <WorkFilterableList projects={projects} />
    </div>
  );
}
