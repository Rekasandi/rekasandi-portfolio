import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/contact-form";
import SectionEyebrow from "@/components/ui/section-eyebrow";
import { getLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Contact - Rekasandi Digital Studio",
  description:
    "Tell us about your project. Contact Rekasandi to discuss product strategy, design, and engineering.",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const isIndonesian = locale === "id";

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <header className="max-w-4xl border-b border-border pb-12 sm:pb-16">
        <SectionEyebrow>{isIndonesian ? "Kontak" : "Contact"}</SectionEyebrow>
        <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-6xl">
          {isIndonesian ? "Mari bahas proyek Anda." : "Let’s talk about your project."}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {isIndonesian
            ? "Ceritakan tujuan dan kebutuhan proyek Anda. Tim kami akan meninjau pesan dan menghubungi Anda."
            : "Tell us what you want to build and what you need. We’ll review your message and follow up."}
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
        <section className="lg:col-span-7" aria-label={isIndonesian ? "Formulir kontak" : "Contact form"}>
          <ContactForm />
        </section>

        <aside className="flex flex-col gap-8 border-t border-border pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {isIndonesian ? "Informasi kontak" : "Contact details"}
            </h2>
            <a
              href="mailto:hello@rekasandi.com"
              className="group mt-5 inline-flex min-h-11 items-center gap-3 rounded-sm text-sm text-foreground transition-colors hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
              <span>hello@rekasandi.com</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div className="border-t border-border pt-6">
            <p className="font-mono text-xs tracking-wide text-muted-foreground">
              {isIndonesian ? "Lokasi" : "Location"}
            </p>
            <p className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-foreground">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>
                {isIndonesian ? "Jakarta Selatan, DKI Jakarta" : "South Jakarta, DKI Jakarta"}
                <br />
                Indonesia
              </span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
