"use client";

import Image from "next/image";
import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import type { Service } from "@/data/schema";
import type { ServicesPageData } from "@/lib/payload/queries";
import { useLocale } from "@/lib/i18n/client";
import RekaButton from "@/components/ui/RekaButton";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export interface ServicesViewProps {
  initialServicesContent: ServicesPageData;
  services: Service[];
}

function sentenceCaseHeadline(headline: string, locale: string) {
  const sentence = headline
    .trim()
    .toLocaleLowerCase(locale)
    .replace(/^\p{L}/u, (letter) => letter.toLocaleUpperCase(locale));

  return sentence.replace(/\b(ai|it|ui|ux|api|seo|cms|saas|ios)\b/gi, (term) =>
    term.toLocaleUpperCase(locale) === "IOS" ? "iOS" : term.toLocaleUpperCase(locale),
  );
}

type EngagementModelInput = Omit<
  ServicesPageData["engagementModels"][number],
  "features"
> & {
  features?:
    | string
    | (string | { feature?: string; item?: string } | null)[];
};

type ServicesLivePreviewData = Omit<ServicesPageData, "engagementModels"> & {
  engagementModels?: EngagementModelInput[];
};

export default function ServicesView({
  initialServicesContent,
  services,
}: ServicesViewProps) {
  const { locale } = useLocale();
  const isIndonesian = locale === "id";
  const serverURL =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  const { data: servicesContent } = useLivePreview<ServicesLivePreviewData>({
    initialData: initialServicesContent,
    serverURL,
    depth: 2,
  });
  const engagementModels = useMemo(() => {
    const previewModels = servicesContent.engagementModels;
    if (!Array.isArray(previewModels) || previewModels.length === 0) {
      return initialServicesContent.engagementModels;
    }

    return previewModels.map((model) => {
      const features =
        typeof model.features === "string"
          ? model.features.split("\n").map((feature) => feature.trim()).filter(Boolean)
          : (model.features || [])
              .map((feature) =>
                typeof feature === "string"
                  ? feature
                  : feature?.feature || feature?.item || "",
              )
              .filter(Boolean);

      return {
        number: model.number,
        title: model.title,
        subtitle: model.subtitle,
        description: model.description,
        features,
      };
    });
  }, [servicesContent.engagementModels, initialServicesContent.engagementModels]);

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <header className="border-b border-border pb-12 sm:pb-16">
        <div className="max-w-4xl">
          <SectionEyebrow>
            {isIndonesian ? "LAYANAN" : "SERVICES"}
          </SectionEyebrow>
          <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
            {sentenceCaseHeadline(servicesContent.headline, locale)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {servicesContent.subheadline}
          </p>
        </div>
        <div className="relative mt-9 aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:mt-12 sm:aspect-[16/8] lg:aspect-[16/7]">
          <Image
            src="/images/services/web-experiences.jpg"
            alt={isIndonesian ? "Desain situs web di ruang kerja studio" : "Website design displayed in a studio workspace"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </header>

      <section aria-labelledby="service-list-title" className="py-12 sm:py-16">
        <header className="mb-7 max-w-2xl sm:mb-9">
          <h2
            id="service-list-title"
            className="text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl"
          >
            {isIndonesian ? "Layanan yang kami kerjakan" : "What we can help build"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {isIndonesian
              ? "Buka layanan untuk melihat cakupan pekerjaan dan hasil yang dapat disiapkan."
              : "Open a service to explore its scope and potential deliverables."}
          </p>
        </header>

        <div className="border-y border-border">
          {services.map((service) => (
            <details
              key={service.id}
              id={service.slug}
              className="group border-b border-border last:border-b-0"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:py-7 md:grid-cols-[0.8fr_1.2fr_auto] md:gap-8 [&::-webkit-details-marker]:hidden">
                <span className="block text-xl font-semibold leading-snug tracking-[-0.03em] text-foreground sm:text-2xl">
                  {service.title}
                </span>
                <p className="hidden max-w-2xl text-sm leading-relaxed text-muted-foreground md:block sm:text-base">
                  {service.shortDescription}
                </p>
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
                <p className="col-span-2 -mt-2 text-sm leading-relaxed text-muted-foreground md:hidden">
                  {service.shortDescription}
                </p>
              </summary>

              <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
                <div className="hidden md:block" aria-hidden="true" />
                <div>
                  {service.fullDescription !== service.shortDescription && (
                    <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {service.fullDescription}
                    </p>
                  )}

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
                        {isIndonesian ? "Hasil kerja" : "Deliverables"}
                      </h4>
                      <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-accent-highlight">
                        {service.deliverables.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
                        {isIndonesian ? "Kapabilitas" : "Capabilities"}
                      </h4>
                      <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-accent-highlight">
                        {service.capabilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {service.technologies.length > 0 && (
                    <div className="mt-8 border-t border-border pt-5">
                      <h4 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        {isIndonesian ? "Teknologi" : "Technologies"}
                      </h4>
                      <ul className="flex flex-wrap gap-2">
                        {service.technologies.map((technology) => (
                          <li
                            key={technology}
                            className="rounded-full border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground"
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {engagementModels.length > 0 && (
        <section className="border-t border-border py-12 sm:py-16" aria-labelledby="engagement-title">
          <header className="mb-7 max-w-2xl sm:mb-9">
            <h2
              id="engagement-title"
              className="text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl"
            >
              {isIndonesian ? "Cara bekerja sama" : "Ways to work together"}
            </h2>
          </header>
          <div className="border-y border-border">
            {engagementModels.map((model) => (
              <article
                key={model.number}
                className="grid grid-cols-1 gap-5 border-b border-border py-7 last:border-b-0 sm:py-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10"
              >
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
                    {model.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{model.subtitle}</p>
                </div>
                <div>
                  <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {model.description}
                  </p>
                  {model.features.length > 0 && (
                    <ul className="mt-5 grid list-disc grid-cols-1 gap-x-8 gap-y-2 pl-4 text-sm text-muted-foreground marker:text-accent-highlight sm:grid-cols-2">
                      {model.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col items-start gap-6 border-t border-border py-12 sm:py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
            {isIndonesian ? "Mari bahas proyek Anda." : "Let’s discuss your project."}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {isIndonesian
              ? "Ceritakan kebutuhan dan tantangan yang ingin Anda selesaikan."
              : "Tell us what you’re building and where you need support."}
          </p>
        </div>
        <RekaButton href="/contact" variant="primary" size="lg" arrow="diagonal">
          {isIndonesian ? "HUBUNGI KAMI" : "CONTACT US"}
        </RekaButton>
      </section>
    </div>
  );
}
