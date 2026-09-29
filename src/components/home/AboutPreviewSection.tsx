"use client";

import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import RekaButton from "@/components/ui/RekaButton";
import { useLocale } from "@/lib/i18n/client";

export default function AboutPreviewSection() {
  const { locale } = useLocale();

  const principles = locale === "id"
    ? [
        {
          title: "Presisi di atas kebisingan visual.",
          desc: "Kami menolak animasi berlebihan dan tren sesaat. Setiap transisi, tata letak, dan bobot tipografi hadir untuk memperjelas hierarki pengguna atau menegaskan wibawa brand.",
        },
        {
          title: "Performa sebagai batasan arsitektur mutlak.",
          desc: "Keunggulan visual tidak boleh mengorbankan kecepatan. Kami mengutamakan halaman yang ringan, pemuatan cepat, dan interaksi yang responsif.",
        },
        {
          title: "Kemitraan strategis di atas transaksi semata.",
          desc: "Kami bekerja langsung dengan tim klien agar keputusan produk dan implementasi tetap sejalan.",
        },
      ]
    : [
        {
          title: "Precision over noise.",
          desc: "We reject gratuitous animation and shallow design trends. Every transition, layout choice, and typographic weight exists to clarify user hierarchy or reinforce brand authority.",
        },
        {
          title: "Performance as an architectural constraint.",
          desc: "Visual quality should not come at the cost of speed. We prioritize fast-loading pages, lean bundles, and responsive interactions.",
        },
        {
          title: "Partnership over transaction.",
          desc: "We work directly with client teams to keep product decisions and implementation aligned.",
        },
      ];

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={locale === "id" ? "Filosofi Studio" : "Studio Philosophy"}
            title={locale === "id" ? "Kami peduli pada apa yang kami bangun dan bagaimana kami membangunnya." : "We care about what we build and how we build it."}
            description={locale === "id" ? "Rekasandi didirikan dengan keyakinan bahwa produk digital harus terasa seawet arsitektur fisik. Kami memadukan ketelitian rekayasa dengan kecanggihan editorial." : "Rekasandi was founded on the belief that digital products should feel as crafted as timeless architecture. We combine engineering rigor with editorial sophistication."}
          />

          <div className="mt-8">
            <RekaButton href="/about" variant="outline" size="md" arrow="diagonal">
              {locale === "id" ? "Tentang Rekasandi dan tim" : "About Rekasandi and the team"}
            </RekaButton>
          </div>
        </div>

        {/* Right Column: Studio Principles & Guarantees */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-border border-y border-border">
          {principles.map((pr) => (
            <div key={pr.title} className="py-8 sm:py-10 flex flex-col items-start gap-4">
              <div className="flex flex-col gap-2 max-w-xl">
                <h3 className="text-xl font-semibold text-foreground tracking-tight">
                  {pr.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
