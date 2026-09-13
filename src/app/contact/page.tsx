import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Start a Project — REKASANDI Digital Studio",
  description:
    "Initiate an engagement with Rekasandi. We partner with ambitious founders and enterprise leaders to build category-defining digital products.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="pb-16 max-w-4xl border-b border-[#e2e0d8]">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#0a0a0a] font-bold tracking-widest">
            [INQUIRY]
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
            INITIATE ENGAGEMENT
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6">
          LET’S BUILD TOGETHER.
        </h1>
        <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
          Tell us about your product goals, technical hurdles, or timeline expectations. We will respond with architectural clarity within 24 hours.
        </p>
      </div>

      {/* Main Form & Directory Grid */}
      <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column: Direct Channels & Studio Presence */}
        <div className="lg:col-span-5 flex flex-col gap-10 lg:border-l lg:border-[#e2e0d8] lg:pl-16">
          {/* Direct Channels */}
          <div>
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
              DIRECT CHANNELS
            </span>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@rekasandi.com"
                className="p-6 rounded-[6px] bg-white border border-[#e2e0d8] hover:border-[#0a0a0a] shadow-xs transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <Mail className="size-5 text-[#0a0a0a]" />
                  <div>
                    <span className="text-xs font-mono text-[#7a7870] block">EMAIL INQUIRIES</span>
                    <span className="text-sm font-medium text-[#0a0a0a]">hello@rekasandi.com</span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-[#7a7870] group-hover:text-[#0a0a0a] transition-colors" />
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-[6px] bg-white border border-[#e2e0d8] hover:border-[#0a0a0a] shadow-xs transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <MessageCircle className="size-5 text-[#0a0a0a]" />
                  <div>
                    <span className="text-xs font-mono text-[#7a7870] block">WHATSAPP DIRECT</span>
                    <span className="text-sm font-medium text-[#0a0a0a]">+62 812-3456-7890</span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-[#7a7870] group-hover:text-[#0a0a0a] transition-colors" />
              </a>
            </div>
          </div>

          {/* Location & Studio Hours */}
          <div className="p-8 rounded-[8px] bg-[#efeee8] border border-[#e2e0d8]">
            <span className="font-mono text-xs text-[#0a0a0a] font-semibold uppercase tracking-widest block mb-4">
              STUDIO LOCATION
            </span>
            <div className="flex flex-col gap-4 font-mono text-xs text-[#55544e]">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-[#7a7870] shrink-0 mt-0.5" />
                <span>
                  South Jakarta, DKI Jakarta<br />
                  Indonesia (6.2088° S, 106.8456° E)
                </span>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-[#e2e0d8]">
                <Clock className="size-4 text-[#7a7870] shrink-0" />
                <span>MON – FRI: 09:00 – 18:00 (WIB / UTC+7)</span>
              </div>
            </div>
          </div>

          {/* Engagement Guarantee */}
          <div className="p-8 rounded-[8px] bg-white border border-[#e2e0d8] shadow-xs">
            <span className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-2">
              OUR PROMISE
            </span>
            <p className="text-xs text-[#55544e] leading-relaxed">
              We do not use sales reps or junior account managers. Your brief is reviewed directly by our founding architects, ensuring technical candor and realistic timelines from the very first conversation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
