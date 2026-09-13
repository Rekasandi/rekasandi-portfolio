"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import RekaButton from "@/components/ui/RekaButton";

const SERVICES_OPTIONS = [
  "Digital Products",
  "Web Experiences",
  "Custom Software",
  "AI & Automation",
  "Mobile Applications",
  "Design Systems",
];

const BUDGET_OPTIONS = [
  "< $10,000",
  "$10k – $25k",
  "$25k – $50k",
  "$50,000+",
  "Undisclosed",
];

const TIMELINE_OPTIONS = [
  "< 1 Month",
  "1 – 3 Months",
  "3 – 6 Months",
  "Flexible",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    selectedServices: [] as string[],
    budget: "$25k – $50k",
    timeline: "1 – 3 Months",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(srv)
        ? prev.selectedServices.filter((s) => s !== srv)
        : [...prev.selectedServices, srv],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate brief submission delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="p-10 sm:p-16 rounded-[8px] bg-white border border-[#0a0a0a] shadow-lg text-center flex flex-col items-center animate-fade-in">
        <div className="size-14 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center mb-6">
          <CheckCircle2 className="size-7 text-[#d7ff3f]" />
        </div>
        <span className="font-mono text-xs text-[#0a0a0a] font-bold uppercase tracking-widest mb-2">
          [TRANSMISSION RECEIVED]
        </span>
        <h3 className="heading-m text-2xl sm:text-3xl font-semibold text-[#0a0a0a] mb-4">
          Thank you, {formData.name || "friend"}.
        </h3>
        <p className="text-[#55544e] text-base leading-relaxed max-w-md mb-8">
          Our studio partners have received your project inquiry. A senior architect will review your parameters and respond within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              company: "",
              email: "",
              selectedServices: [],
              budget: "$25k – $50k",
              timeline: "1 – 3 Months",
              message: "",
            });
          }}
          className="text-xs font-mono text-[#0a0a0a] font-semibold hover:underline uppercase tracking-wider cursor-pointer"
        >
          ← SUBMIT ANOTHER INQUIRY
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* 01: Service Interest Tags */}
      <div>
        <label className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
          {"01 // WHAT CAPABILITIES ARE YOU EXPLORING?"}
        </label>
        <div className="flex flex-wrap gap-2.5">
          {SERVICES_OPTIONS.map((srv) => {
            const isChecked = formData.selectedServices.includes(srv);

            return (
              <button
                type="button"
                key={srv}
                onClick={() => toggleService(srv)}
                className={`px-4 py-2.5 rounded-[4px] border text-xs font-mono tracking-wide transition-all cursor-pointer ${
                  isChecked
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a] font-semibold shadow-xs"
                    : "bg-white text-[#55544e] border-[#e2e0d8] hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                }`}
              >
                {srv}
              </button>
            );
          })}
        </div>
      </div>

      {/* 02: Client Contact Details */}
      <div>
        <label className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
          {"02 // YOUR CREDENTIALS"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              required
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-[4px] bg-white border border-[#e2e0d8] focus:border-[#0a0a0a] text-[#0a0a0a] text-sm placeholder-[#7a7870] outline-none transition-colors"
            />
          </div>

          <div>
            <input
              type="text"
              required
              placeholder="Company / Organization *"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3.5 rounded-[4px] bg-white border border-[#e2e0d8] focus:border-[#0a0a0a] text-[#0a0a0a] text-sm placeholder-[#7a7870] outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <input
              type="email"
              required
              placeholder="Work Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-[4px] bg-white border border-[#e2e0d8] focus:border-[#0a0a0a] text-[#0a0a0a] text-sm placeholder-[#7a7870] outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 03: Budget and Timeline Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
            {"03 // ESTIMATED BUDGET"}
          </label>
          <div className="flex flex-wrap gap-2">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setFormData({ ...formData, budget: opt })}
                className={`px-3 py-2 rounded-[4px] border text-xs font-mono transition-colors cursor-pointer ${
                  formData.budget === opt
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a] font-semibold"
                    : "bg-white text-[#55544e] border-[#e2e0d8] hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
            {"04 // DESIRED TIMELINE"}
          </label>
          <div className="flex flex-wrap gap-2">
            {TIMELINE_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setFormData({ ...formData, timeline: opt })}
                className={`px-3 py-2 rounded-[4px] border text-xs font-mono transition-colors cursor-pointer ${
                  formData.timeline === opt
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a] font-semibold"
                    : "bg-white text-[#55544e] border-[#e2e0d8] hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 05: Project Narrative */}
      <div>
        <label className="font-mono text-xs text-[#7a7870] uppercase tracking-widest block mb-4">
          {"05 // PROJECT BRIEF & OBJECTIVES"}
        </label>
        <textarea
          rows={5}
          required
          placeholder="Tell us about your product goals, technical hurdles, or timeline constraints..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3.5 rounded-[4px] bg-white border border-[#e2e0d8] focus:border-[#0a0a0a] text-[#0a0a0a] text-sm placeholder-[#7a7870] outline-none transition-colors leading-relaxed"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex items-center justify-between">
        <p className="text-xs font-mono text-[#7a7870] max-w-xs hidden sm:block">
          All inquiries are safeguarded under mutual non-disclosure by default.
        </p>
        <RekaButton
          variant="primary"
          size="lg"
          arrow="diagonal"
          disabled={submitting}
          magnetic
        >
          {submitting ? "TRANSMITTING..." : "SUBMIT PROJECT INQUIRY"}
        </RekaButton>
      </div>
    </form>
  );
}
