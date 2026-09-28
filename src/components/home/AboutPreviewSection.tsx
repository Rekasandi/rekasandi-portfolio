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
          num: "[01]",
          title: "Presisi di atas kebisingan visual.",
          desc: "Kami menolak animasi berlebihan dan tren sesaat. Setiap transisi, tata letak, dan bobot tipografi hadir untuk memperjelas hierarki pengguna atau menegaskan wibawa brand.",
        },
        {
          num: "[02]",
          title: "Performa sebagai batasan arsitektur mutlak.",
          desc: "Keunggulan visual tidak boleh mengorbankan kecepatan muat. Kami menerapkan arsitektur server-first, menjaga bundle tetap ringan, dan menjamin interaksi 60fps yang mulus.",
        },
        {
          num: "[03]",
          title: "Kemitraan strategis di atas transaksi semata.",
          desc: "Kami membatasi jumlah proyek tiap kuartal agar dapat terintegrasi secara mendalam dengan tim kepemimpinan klien guna menghadirkan perangkat lunak yang transformatif.",
        },
      ]
    : [
        {
          num: "[01]",
          title: "Precision over noise.",
          desc: "We reject gratuitous animation and shallow design trends. Every transition, layout choice, and typographic weight exists to clarify user hierarchy or reinforce brand authority.",
        },
        {
          num: "[02]",
          title: "Performance as an architectural constraint.",
          desc: "Visual excellence must never compromise loading speed. We engineer server-first, keep bundles lean, and guarantee seamless 60fps interaction on standard consumer hardware.",
        },
        {
          num: "[03]",
          title: "Partnership over transaction.",
          desc: "We take on a strictly limited number of client engagements each quarter. We embed directly with leadership teams to deliver transformative software that moves businesses forward.",
        },
      ];

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5">
          <SectionHeading
            number="06"
            eyebrow={locale === "id" ? "Filosofi Studio" : "Studio Philosophy"}
            title={locale === "id" ? "Kami peduli pada apa yang kami bangun — dan bagaimana kami membangunnya." : "We care deeply about what we build — and how we build it."}
            description={locale === "id" ? "Rekasandi didirikan dengan keyakinan bahwa produk digital harus terasa seawet arsitektur fisik. Kami memadukan ketelitian rekayasa dengan kecanggihan editorial." : "Rekasandi was founded on the belief that digital products should feel as crafted as timeless architecture. We combine engineering rigor with editorial sophistication."}
          />

          <div className="mt-8">
            <RekaButton href="/about" variant="outline" size="md" arrow="diagonal">
              {locale === "id" ? "TENTANG REKASANDI & TIM" : "ABOUT REKASANDI & TEAM"}
            </RekaButton>
          </div>
        </div>

        {/* Right Column: Studio Principles & Guarantees */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-border border-y border-border">
          {principles.map((pr) => (
            <div key={pr.num} className="py-8 sm:py-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
              <span className="font-mono text-sm font-semibold text-foreground shrink-0 tabular-nums">
                {pr.num}
              </span>
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
