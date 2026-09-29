"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { EASING, DURATION } from "@/lib/motion";
import { useLocale } from "@/lib/i18n/client";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface IntroSectionProps {
  title?: string;
  description?: string;
  statement?: string;
  paragraph?: string;
  metrics?: { value: string; label: string; desc: string }[];
}

export default function IntroSection({
  title = "Good software starts with a clear purpose.",
  description = "We make the important decisions early: what to build, who it serves, and how it should work.",
  statement = "We turn complex business needs into digital products people can use with confidence.",
  paragraph = "From the first product decision to the final release, our strategists, designers, and engineers work as one team. The result is software shaped around real needs, not a template or a handoff chain.",
}: IntroSectionProps) {
  const { locale } = useLocale();
  const isIndonesian = locale === "id";
  const usesLegacyCopy = [
    "Integritas • Keunggulan • Kolaborasi • Inovasi",
    "Engineered Clarity.",
    "Kejelasan Rekayasa.",
  ].includes(title);
  const copy = usesLegacyCopy
    ? isIndonesian
      ? {
          title: "Produk digital untuk kebutuhan bisnis nyata.",
          description:
            "Kami membantu tim merumuskan kebutuhan, menentukan prioritas, dan membangun produk yang tepat guna.",
          statement:
            "Kebutuhan bisnis yang rumit layak mendapat solusi digital yang jelas dan mudah digunakan.",
          paragraph:
            "Kami bekerja bersama tim Anda sejak perumusan masalah hingga peluncuran. Strategi, desain, dan rekayasa berjalan dalam satu proses agar produk tetap berangkat dari tujuan bisnis dan kebutuhan pengguna.",
        }
      : {
          title: "Digital products for real business needs.",
          description:
            "We help teams clarify what they need, set priorities, and build the right product.",
          statement:
            "Complex business needs deserve clear, useful digital solutions.",
          paragraph:
            "We work alongside your team from the first decisions through launch. Strategy, design, and engineering stay connected throughout, keeping the product grounded in business goals and user needs.",
        }
    : { title, description, statement, paragraph };

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left Column: Monospace Index & Manifesto */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          <div>
            <SectionEyebrow>
              {isIndonesian ? "PENDEKATAN KAMI" : "OUR APPROACH"}
            </SectionEyebrow>
            <h2 className="heading-m mb-4 font-semibold tracking-[-0.03em] text-foreground">
              {copy.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm">
              {copy.description}
            </p>
          </div>

          <div className="hidden lg:block pt-16">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground hover:text-accent transition-colors font-semibold"
            >
              <span>{isIndonesian ? "PELAJARI CARA KAMI BEKERJA" : "HOW WE WORK"}</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Monumental Editorial Statement */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: DURATION.slow, ease: EASING.custom }}
          >
            <p className="heading-l text-foreground font-medium tracking-tight leading-tight mb-8">
              {copy.statement}
            </p>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed font-normal max-w-3xl mb-12">
              {copy.paragraph}
            </p>
          </motion.div>


        </div>
      </div>
      </div>
    </section>
  );
}
