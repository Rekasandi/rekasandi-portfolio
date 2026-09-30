"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RekaButton from "@/components/ui/reka-button";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import PixelBlast from "@/components/ui/pixel-blast";
import Safari from "@/components/ui/safari";
import { useLocale } from "@/lib/i18n/client";
import { sentenceCaseDisplay } from "@/lib/utils";

interface HeroSectionProps {
  headline?: string;
  subtitle?: string;
  images: { src: string; alt: string }[];
}

export default function HeroSection({
  headline = "",
  subtitle = "",
  images,
}: HeroSectionProps) {
  const { dictionary } = useLocale();
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = images;
  const activeSlide = slides[activeIndex % slides.length];

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !previewRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        previewRef.current,
        { scale: 0.92, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
      gsap.to(previewRef.current, {
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 60%",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate mx-3 mt-3 min-h-[780px] overflow-hidden rounded-xl border border-border bg-secondary text-foreground dark:bg-surface sm:mx-5 lg:min-h-[860px]"
    >
      <div className="absolute inset-0 -z-20">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#EF4444"
          patternScale={2}
          patternDensity={1.5}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.4}
          transparent
          className="brightness-90 mix-blend-multiply dark:brightness-100 dark:mix-blend-normal"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/5 via-background/20 to-background/70 dark:from-background/10 dark:via-background/35 dark:to-background/95"
      />

      <div className="pointer-events-none relative mx-auto flex max-w-[1600px] flex-col items-center px-6 pt-24 text-center sm:px-10 sm:pt-24 lg:px-16 lg:pt-24">

        <SectionEyebrow className="pointer-events-auto text-foreground/70">
          {dictionary.home.aboutPreview.eyebrow}
        </SectionEyebrow>

        {/* Headline */}
        <h1 className="pointer-events-auto max-w-6xl text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground text-balance">
          {sentenceCaseDisplay(headline)}
        </h1>

        {/* Subtitle */}
        <p className="pointer-events-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {sentenceCaseDisplay(subtitle)}
        </p>

        {/* Action Buttons */}
        <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
          <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal">
            {dictionary.nav.cta}
          </RekaButton>
          <RekaButton href="/work" variant="outline" size="lg" arrow="right">
            {dictionary.home.selectedWork.title}
          </RekaButton>
        </div>

        {activeSlide && (
          <div ref={previewRef} className="pointer-events-auto mt-12 w-full max-w-[1280px] origin-top text-left sm:mt-14 lg:mt-16">
            <Safari url="rekasandi.com" className="w-full h-auto drop-shadow-2xl">
              {slides.map((slide, index) => (
                <Image
                  key={`${slide.src}-${index}`}
                  src={slide.src}
                  alt={index === activeIndex ? slide.alt : ""}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1440px) 100vw, 1280px"
                  aria-hidden={index !== activeIndex}
                  className={`object-cover object-center transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}
                />
              ))}
              {slides.length > 1 && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-2 backdrop-blur-md">
                  {slides.map((slide, index) => (
                    <button
                      key={`${slide.src}-indicator`}
                      type="button"
                      aria-label={`Show image ${index + 1}`}
                      aria-current={index === activeIndex}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white"}`}
                    />
                  ))}
                </div>
              )}
            </Safari>
          </div>
        )}
      </div>
    </section>
  );
}
