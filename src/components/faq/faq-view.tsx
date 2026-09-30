"use client";

import MicroSlats from "@/components/ui/micro-slats";
import { ArrowUpRight, Plus } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import RekaButton from "@/components/ui/reka-button";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQView({
  items = [],
}: {
  items?: { question: string; answer: string }[];
}) {
  const { locale } = useLocale();
  const isId = locale === "id";
  const entries = items;

  return (
    <section className="w-full bg-background border-t border-border">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-14 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-28">
      <div className="flex flex-col">
        <header className="mb-16 border-b border-border pb-12 lg:mb-20 lg:pb-20">
          <SectionEyebrow className="mb-5">
            {isId ? "Pertanyaan umum" : "Common questions"}
          </SectionEyebrow>
          <h2 className="max-w-[13ch] text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
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
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-border">
              <AccordionTrigger className="min-h-[76px] gap-5 rounded-none py-6 text-base font-medium leading-snug hover:no-underline sm:text-lg [&_[data-slot=accordion-trigger-icon]]:hidden">
                <span>{item.question}</span>
                <Plus className="size-5 shrink-0 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45" aria-hidden="true" />
              </AccordionTrigger>
              <AccordionContent className="pb-7 pr-10 text-base leading-relaxed text-muted-foreground">
                {item.answer}
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

      <aside className="relative min-h-[520px] overflow-hidden rounded-xl bg-muted lg:sticky lg:top-24 lg:h-[min(760px,calc(100vh-8rem))]">
        <div className="absolute inset-0">
          <MicroSlats
            preset="swell"
            color="#F43F5E"
            glintColor="#6B21A8"
            backgroundColor="#ffffff"
            slatWidth={10}
            slatHeight={25}
            gap={3}
            roundness={0.75}
            interactive
            cursorStrength={1}
            cursorSize={40}
            swirl={0}
            trail={1.4}
            lean={0}
            intro
            scale={1.5}
            speed={0.6}
            direction={250}
            chop={0.55}
            stretch={0}
            glint={0.7}
            contrast={1.25}
            perspective={0.55}
            fog={0.55}
            introDuration={1.5}
            paused={false}
          />
        </div>
        <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/70 bg-background/95 p-5 shadow-whisper backdrop-blur-sm sm:inset-x-8 sm:bottom-8 sm:p-7">
          <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground">
            {isId ? "Partner produk digital" : "Your digital product partner"}
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
