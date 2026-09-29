import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";

export const HomePageContent: GlobalConfig = {
  slug: "page-home",
  label: "Page: Home",
  hooks: {
    afterChange: [revalidateGlobalHook(["/"])],
  },
  admin: {
    livePreview: {
      url: () => process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero Section",
          fields: [
            {
              name: "heroHeadlineLine1",
              label: "Hero Headline",
              type: "text",
              defaultValue: "Digital products, built for real work.",
              required: true,
              maxLength: 100,
              admin: {
                description:
                  "One complete headline. It wraps automatically on the website.",
                placeholder: "WE BUILD DIGITAL PRODUCTS THAT MATTER.",
              },
            },
            {
              name: "heroSubtitle",
              type: "textarea",
              defaultValue:
                "We design and build websites, software, and AI systems around the way your business works.",
              required: true,
            },
          ],
        },
        {
          label: "Intro & Philosophy",
          fields: [
            {
              name: "introTitle",
              type: "text",
              defaultValue: "Good software starts with a clear purpose.",
            },
            {
              name: "introDescription",
              type: "textarea",
              defaultValue:
                "We make the important decisions early: what to build, who it serves, and how it should work.",
            },
            {
              name: "introStatement",
              type: "textarea",
              defaultValue:
                "We turn complex business needs into digital products people can use with confidence.",
            },
            {
              name: "introParagraph",
              type: "textarea",
              defaultValue:
                "From the first product decision to the final release, our strategists, designers, and engineers work as one team. The result is software shaped around real needs—not a template or a handoff chain.",
            },
            {
              name: "introMetrics",
              type: "array",
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "desc", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Approach Steps",
          fields: [
            {
              name: "approachSteps",
              type: "array",
              fields: [
                { name: "number", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "subtitle", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                { name: "deliverable", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Tech Credibility",
          fields: [
            {
              name: "techItems",
              type: "array",
              admin: {
                description:
                  "Technology stack items displayed on the homepage, grouped by category.",
              },
              fields: [
                {
                  name: "category",
                  type: "select",
                  options: [
                    { label: "FRONTEND & RUNTIME", value: "FRONTEND & RUNTIME" },
                    { label: "MOTION & CRAFT", value: "MOTION & CRAFT" },
                    { label: "BACKEND & DATA", value: "BACKEND & DATA" },
                    { label: "INTELLIGENCE & CLOUD", value: "INTELLIGENCE & CLOUD" },
                  ],
                  defaultValue: "FRONTEND & RUNTIME",
                  required: true,
                },
                { name: "name", type: "text", required: true },
                { name: "desc", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Final CTA",
          fields: [
            {
              name: "ctaHeadline",
              type: "text",
              defaultValue: "Have a product to build?",
            },
            {
              name: "ctaSubtitle",
              type: "textarea",
              defaultValue:
                "Have an ambitious digital product, web experience, or AI system in mind? We partner with companies ready to create category-defining work.",
            },
          ],
        },
      ],
    },
  ],
};
