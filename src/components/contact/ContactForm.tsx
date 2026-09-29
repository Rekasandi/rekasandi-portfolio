"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import RekaButton from "@/components/ui/RekaButton";
import { useLocale } from "@/lib/i18n/client";

function createEmptyForm() {
  return {
    name: "",
    company: "",
    email: "",
    selectedServices: [] as string[],
    budget: "",
    timeline: "",
    message: "",
  };
}

export default function ContactForm() {
  const { dictionary, locale } = useLocale();
  const isIndonesian = locale === "id";
  const { contact } = dictionary;
  const servicesOptions = contact.servicesOptions;
  const budgetOptions = contact.budgetOptions;
  const timelineOptions = contact.timelineOptions;

  const [formData, setFormData] = useState(createEmptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setFormData((previous) => ({
      ...previous,
      selectedServices: previous.selectedServices.includes(service)
        ? previous.selectedServices.filter((item) => item !== service)
        : [...previous.selectedServices, service],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Contact submission failed");
      setSubmitted(true);
    } catch {
      setErrorMessage(
        isIndonesian
          ? "Pesan belum terkirim. Coba lagi atau hubungi kami melalui email."
          : "Your message could not be sent. Try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section
        role="status"
        className="flex flex-col items-start rounded-xl border border-border bg-surface p-7 sm:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="mb-5 size-7 text-accent-highlight" />
        <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {contact.successHeader}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {contact.successTitle}, {formData.name || (isIndonesian ? "rekan" : "there")}.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          {contact.successDesc}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData(createEmptyForm());
            setErrorMessage(null);
          }}
          className="mt-6 min-h-11 rounded-sm text-xs font-mono font-medium uppercase tracking-[0.1em] text-foreground transition-colors hover:text-accent-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          {contact.submitAnother}
        </button>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" aria-busy={submitting}>
      <fieldset className="min-w-0 border-0 p-0">
        <legend className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
          {contact.step1}
        </legend>
        <div className="flex flex-wrap gap-2">
          {servicesOptions.map((service) => {
            const isSelected = formData.selectedServices.includes(service);
            return (
              <button
                type="button"
                key={service}
                aria-pressed={isSelected}
                onClick={() => toggleService(service)}
                className={`min-h-10 rounded-full border px-4 py-2 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="min-w-0 border-0 p-0">
        <legend className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
          {isIndonesian ? "DETAIL KONTAK" : "CONTACT DETAILS"}
        </legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
              {contact.nameLabel}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              className="min-h-12 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-company" className="text-sm font-medium text-foreground">
              {contact.companyLabel}
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={(event) => setFormData({ ...formData, company: event.target.value })}
              className="min-h-12 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
              {contact.emailLabel}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="min-h-12 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <fieldset className="min-w-0 border-0 p-0">
          <legend className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
            {contact.step2}
          </legend>
          <div className="flex flex-wrap gap-2">
            {budgetOptions.map((option) => {
              const isSelected = formData.budget === option;
              return (
                <button
                  type="button"
                  key={option}
                  aria-pressed={isSelected}
                  onClick={() => setFormData({ ...formData, budget: option })}
                  className={`min-h-10 rounded-full border px-3 py-2 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="min-w-0 border-0 p-0">
          <legend className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
            {contact.step3}
          </legend>
          <div className="flex flex-wrap gap-2">
            {timelineOptions.map((option) => {
              const isSelected = formData.timeline === option;
              return (
                <button
                  type="button"
                  key={option}
                  aria-pressed={isSelected}
                  onClick={() => setFormData({ ...formData, timeline: option })}
                  className={`min-h-10 rounded-full border px-3 py-2 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          {contact.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder={contact.messagePlaceholder}
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-md border border-destructive px-4 py-3 text-sm leading-relaxed text-foreground"
        >
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          {isIndonesian
            ? "Kami menggunakan informasi ini hanya untuk menindaklanjuti pesan Anda."
            : "We use these details to follow up on your inquiry."}
        </p>
        <RekaButton
          variant="primary"
          size="lg"
          arrow="diagonal"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? contact.submittingButton : contact.submitButton}
        </RekaButton>
      </div>
    </form>
  );
}
