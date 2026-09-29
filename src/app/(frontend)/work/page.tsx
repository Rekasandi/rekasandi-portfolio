import type { Metadata } from "next";
import { getProjects } from "@/lib/payload/queries";
import { getLocale } from "@/lib/i18n/server";
import WorkFilterableList from "@/components/work/WorkFilterableList";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export const metadata: Metadata = {
  title: "Selected work - Rekasandi Digital Studio",
  description:
    "Products, platforms, and digital systems designed and built with client teams.",
};

export default async function WorkPage() {
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const isIndonesian = locale === "id";

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <header className="max-w-4xl border-b border-border pb-12 sm:pb-16">
        <SectionEyebrow>
          {isIndonesian ? "Portofolio" : "Portfolio"}
        </SectionEyebrow>
        <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
          {isIndonesian ? "Karya pilihan." : "Selected work."}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {isIndonesian
            ? "Pilihan produk, platform, dan sistem digital yang kami rancang dan bangun bersama tim klien."
            : "A selection of products, platforms, and digital systems designed and built with client teams."}
        </p>
      </header>

      <WorkFilterableList projects={projects} />
    </div>
  );
}
