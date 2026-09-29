"use client";

import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import RekaButton from "@/components/ui/RekaButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = {
  en: [
    { q: "What does Rekasandi build?", a: "We design and engineer custom digital products: websites, web applications, internal platforms, mobile experiences, and AI-enabled systems." },
    { q: "Who do you work with?", a: "We partner with ambitious companies, founders, and teams that need a reliable product and engineering partner—from early-stage ventures to established businesses." },
    { q: "How does a project usually start?", a: "We start with a conversation about your goals, users, constraints, and timeline. Then we define the right scope and share a clear proposal before work begins." },
    { q: "How long does a project take?", a: "Timelines depend on scope and complexity. A focused discovery or prototype may take a few weeks; a full product build often takes several months." },
    { q: "Can you work with our existing team or product?", a: "Yes. We can join an existing team, improve a live product, or take ownership of a defined workstream. We adapt to your tools and delivery process." },
    { q: "How do you price projects?", a: "We price projects based on scope, team shape, and delivery timeline. After an initial discussion, we provide a proposal with clear deliverables and costs." },
  ],
  id: [
    { q: "Apa yang dibangun Rekasandi?", a: "Kami merancang dan membangun produk digital kustom: website, aplikasi web, platform internal, aplikasi mobile, dan sistem berbasis AI." },
    { q: "Dengan siapa Rekasandi bekerja?", a: "Kami bermitra dengan perusahaan, founder, dan tim yang membutuhkan partner produk dan engineering tepercaya—dari bisnis tahap awal hingga perusahaan mapan." },
    { q: "Bagaimana proyek dimulai?", a: "Kami mulai dengan membahas tujuan, pengguna, batasan, dan timeline. Setelah itu, kami menyusun scope yang tepat dan proposal yang jelas sebelum pekerjaan dimulai." },
    { q: "Berapa lama proyek berlangsung?", a: "Durasi bergantung pada scope dan kompleksitas. Discovery atau prototipe terarah dapat selesai dalam beberapa minggu; pengembangan produk penuh biasanya memerlukan beberapa bulan." },
    { q: "Bisakah Rekasandi bekerja dengan tim atau produk yang sudah ada?", a: "Bisa. Kami dapat bergabung dengan tim, meningkatkan produk yang sudah berjalan, atau menangani workstream tertentu. Kami menyesuaikan diri dengan tools dan proses kerja Anda." },
    { q: "Bagaimana biaya proyek ditentukan?", a: "Biaya ditentukan berdasarkan scope, komposisi tim, dan timeline. Setelah diskusi awal, kami mengirim proposal dengan deliverable dan biaya yang jelas." },
  ],
};

export default function FAQView() {
  const { locale } = useLocale();
  const isId = locale === "id";
  const entries = faq[isId ? "id" : "en"];

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-14 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-28">
      <div className="flex flex-col">
        <header className="mb-16 border-b border-border pb-12 lg:mb-20 lg:pb-20">
          <p className="mb-5 font-mono text-xs tracking-[0.16em] text-muted-foreground">
            {isId ? "PERTANYAAN UMUM" : "COMMON QUESTIONS"}
          </p>
          <h2 className="max-w-[13ch] text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl">
            {isId ? "Punya pertanyaan?" : "Good work starts with good questions."}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {isId
              ? "Cari tahu cara kami berkolaborasi, membangun produk, dan membawa proyek Anda ke tahap berikutnya."
              : "Learn how we collaborate, build products, and help move your next project forward."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal">
              {isId ? "Diskusikan proyek" : "Talk about your project"}
            </RekaButton>
            <RekaButton href="/services" variant="outline" size="lg" arrow="right">
              {isId ? "Jelajahi layanan" : "Explore services"}
            </RekaButton>
          </div>
        </header>

        <Accordion className="w-full" defaultValue={['faq-0']}>
          {entries.map((item, index) => (
            <AccordionItem key={item.q} value={`faq-${index}`} className="border-b border-border">
              <AccordionTrigger className="min-h-[76px] gap-5 rounded-none py-6 text-base font-medium leading-snug hover:no-underline sm:text-lg [&_[data-slot=accordion-trigger-icon]]:hidden">
                <span>{item.q}</span>
                <Plus className="size-5 shrink-0 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45" aria-hidden="true" />
              </AccordionTrigger>
              <AccordionContent className="pb-7 pr-10 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-10 text-sm text-muted-foreground">
          {isId ? "Belum menemukan jawaban?" : "Still have a question?"}{" "}
          <a className="font-medium text-foreground underline underline-offset-4" href="mailto:hello@rekasandi.com">
            {isId ? "Hubungi tim kami" : "Contact our team"}
          </a>
        </p>
      </div>

      <aside className="relative min-h-[520px] overflow-hidden rounded-2xl bg-muted lg:sticky lg:top-24 lg:h-[min(760px,calc(100vh-8rem))]">
        <Image
          src="/images/projects/aether-ai.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
        <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/70 bg-background/95 p-5 shadow-xl backdrop-blur-sm sm:inset-x-8 sm:bottom-8 sm:p-7">
          <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground">
            {isId ? "PARTNER PRODUK DIGITAL" : "YOUR DIGITAL PRODUCT PARTNER"}
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                {isId ? "Mari bahas tantangan Anda." : "Let’s solve the right problem."}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {isId
                  ? "Ceritakan kebutuhan Anda. Kami akan membantu menentukan langkah yang masuk akal."
                  : "Tell us what you’re working through. We’ll help you find a practical next step."}
              </p>
            </div>
            <a href="/contact" aria-label={isId ? "Hubungi Rekasandi" : "Contact Rekasandi"} className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-105">
              <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </aside>
      </div>
    </section>
  );
}
