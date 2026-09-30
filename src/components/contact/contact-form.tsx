"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLocale } from "@/lib/i18n/client";

const defaultValues = {
  name: "",
  company: "",
  email: "",
  selectedServices: [] as string[],
  budget: "",
  timeline: "",
  message: "",
};

function createContactSchema(isIndonesian: boolean) {
  const messages = isIndonesian
    ? {
        name: "Masukkan nama Anda.",
        email: "Masukkan alamat email yang valid.",
        message: "Pesan harus berisi setidaknya 10 karakter.",
      }
    : {
        name: "Enter your name.",
        email: "Enter a valid email address.",
        message: "Message must be at least 10 characters.",
      };

  return z.object({
    name: z.string().refine((value) => value.trim().length > 0, messages.name),
    company: z.string(),
    email: z.string().email(messages.email),
    selectedServices: z.array(z.string()),
    budget: z.string(),
    timeline: z.string(),
    message: z
      .string()
      .refine((value) => value.trim().length >= 10, messages.message),
  });
}

export default function ContactForm() {
  const { dictionary, locale } = useLocale();
  const isIndonesian = locale === "id";
  const { contact } = dictionary;
  const [submittedName, setSubmittedName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const validator = useMemo(() => createContactSchema(isIndonesian), [isIndonesian]);

  const form = useForm({
    defaultValues,
    validators: { onSubmit: validator },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        if (!response.ok) throw new Error("Contact submission failed");
        setSubmittedName(value.name);
        setSubmitted(true);
      } catch {
        setErrorMessage(
          isIndonesian
            ? "Pesan belum terkirim. Coba lagi atau hubungi kami melalui email."
            : "Your message could not be sent. Try again or email us directly.",
        );
      }
    },
  });

  if (submitted) {
    return (
      <section
        role="status"
        aria-live="polite"
        className="flex flex-col items-start rounded-xl border border-border bg-surface p-7 sm:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="mb-5 size-7 text-accent-highlight" />
        <p className="text-sm text-muted-foreground">{contact.successHeader}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {contact.successTitle}, {submittedName || (isIndonesian ? "rekan" : "there")}.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          {contact.successDesc}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => {
            form.reset();
            setSubmittedName("");
            setSubmitted(false);
            setErrorMessage(null);
          }}
        >
          {contact.submitAnother}
        </Button>
      </section>
    );
  }

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        submissionAttempts: state.submissionAttempts,
      })}
    >
      {({ isSubmitting, submissionAttempts }) => (
        <form
          noValidate
          aria-busy={isSubmitting}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="flex flex-col gap-8"
        >
          <FieldGroup>
            <FieldSet>
              <FieldLegend>{contact.step1}</FieldLegend>
              <form.Field name="selectedServices">
                {(field) => (
                  <ToggleGroup
                    multiple
                    variant="outline"
                    size="lg"
                    spacing={2}
                    aria-label={contact.step1}
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    disabled={isSubmitting}
                    className="flex flex-wrap"
                  >
                    {contact.servicesOptions.map((service) => (
                      <ToggleGroupItem key={service} value={service}>
                        {service}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                )}
              </form.Field>
            </FieldSet>

            <FieldSet>
              <FieldLegend>
                {isIndonesian ? "Detail kontak" : "Contact details"}
              </FieldLegend>
              <FieldGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <form.Field name="name">
                  {(field) => {
                    const isInvalid =
                      (field.state.meta.isTouched || submissionAttempts > 0) &&
                      !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid || undefined}>
                        <FieldLabel htmlFor="contact-name">
                          {contact.nameLabel}
                        </FieldLabel>
                        <Input
                          id="contact-name"
                          name={field.name}
                          type="text"
                          autoComplete="name"
                          required
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => field.handleChange(event.target.value)}
                          aria-invalid={isInvalid}
                          aria-describedby={isInvalid ? "contact-name-error" : undefined}
                          disabled={isSubmitting}
                        />
                        {isInvalid && (
                          <FieldError id="contact-name-error" errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="company">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor="contact-company">
                        {contact.companyLabel}
                      </FieldLabel>
                      <Input
                        id="contact-company"
                        name={field.name}
                        type="text"
                        autoComplete="organization"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      (field.state.meta.isTouched || submissionAttempts > 0) &&
                      !field.state.meta.isValid;
                    return (
                      <Field
                        className="sm:col-span-2"
                        data-invalid={isInvalid || undefined}
                      >
                        <FieldLabel htmlFor="contact-email">
                          {contact.emailLabel}
                        </FieldLabel>
                        <Input
                          id="contact-email"
                          name={field.name}
                          type="email"
                          autoComplete="email"
                          required
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => field.handleChange(event.target.value)}
                          aria-invalid={isInvalid}
                          aria-describedby={isInvalid ? "contact-email-error" : undefined}
                          disabled={isSubmitting}
                        />
                        {isInvalid && (
                          <FieldError id="contact-email-error" errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>
            </FieldSet>

            <FieldGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FieldSet>
                <FieldLegend>{contact.step2}</FieldLegend>
                <form.Field name="budget">
                  {(field) => (
                    <ToggleGroup
                      variant="outline"
                      size="lg"
                      spacing={2}
                      aria-label={contact.step2}
                      value={field.state.value ? [field.state.value] : []}
                      onValueChange={(values) => field.handleChange(values[0] ?? "")}
                      disabled={isSubmitting}
                      className="flex flex-wrap"
                    >
                      {contact.budgetOptions.map((option) => (
                        <ToggleGroupItem key={option} value={option}>
                          {option}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                </form.Field>
              </FieldSet>

              <FieldSet>
                <FieldLegend>{contact.step3}</FieldLegend>
                <form.Field name="timeline">
                  {(field) => (
                    <ToggleGroup
                      variant="outline"
                      size="lg"
                      spacing={2}
                      aria-label={contact.step3}
                      value={field.state.value ? [field.state.value] : []}
                      onValueChange={(values) => field.handleChange(values[0] ?? "")}
                      disabled={isSubmitting}
                      className="flex flex-wrap"
                    >
                      {contact.timelineOptions.map((option) => (
                        <ToggleGroupItem key={option} value={option}>
                          {option}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                </form.Field>
              </FieldSet>
            </FieldGroup>

            <form.Field name="message">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || submissionAttempts > 0) &&
                  !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid || undefined}>
                    <FieldLabel htmlFor="contact-message">
                      {contact.messageLabel}
                    </FieldLabel>
                    <Textarea
                      id="contact-message"
                      name={field.name}
                      rows={5}
                      required
                      placeholder={contact.messagePlaceholder}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? "contact-message-error" : undefined}
                      disabled={isSubmitting}
                      className="min-h-32 resize-y leading-relaxed"
                    />
                    {isInvalid && (
                      <FieldError id="contact-message-error" errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

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
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting && (
                <LoaderCircle
                  aria-hidden="true"
                  data-icon="inline-start"
                  className="motion-reduce:animate-none"
                />
              )}
              {isSubmitting ? contact.submittingButton : contact.submitButton}
            </Button>
          </div>
        </form>
      )}
    </form.Subscribe>
  );
}
