import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";
import { canManageContent } from "../lib/payload/access";

export const HomePageContent: GlobalConfig = {
  slug: "page-home",
  label: "Page: Home",
  hooks: {
    afterChange: [revalidateGlobalHook(["/"])],
  },
  admin: {
    hidden: ({ user }) => user?.role === "author",
    livePreview: {
      url: () => process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    },
  },
  access: {
    read: () => true,
    update: canManageContent,
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
              localized: true,
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
              localized: true,
              required: true,
            },
            {
              name: "heroImages",
              label: "Hero showcase gallery",
              type: "array",
              required: true,
              minRows: 1,
              admin: {
                description: "Add and reorder the images that rotate in the hero showcase.",
              },
              fields: [
                {
                  name: "image",
                  label: "Image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "alt",
                  label: "Alt text",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          label: "Intro & Philosophy",
          fields: [
            {
              name: "introTitle",
              type: "text",
              localized: true,
            },
            {
              name: "introDescription",
              type: "textarea",
              localized: true,
            },
            {
              name: "introStatement",
              type: "textarea",
              localized: true,
            },
            {
              name: "introParagraph",
              type: "textarea",
              localized: true,
            },
            {
              name: "introMetrics",
              type: "array",
              localized: true,
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
              localized: true,
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
          label: "Clients",
          fields: [
            { name: "clientEyebrow", type: "text", localized: true },
            { name: "clientHeading", type: "text", localized: true },
            {
              name: "clientLogos",
              label: "Client logos",
              type: "array",
              admin: { description: "Add, remove, and reorder logos shown in the client marquee." },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "logo", type: "upload", relationTo: "media", required: true },
                { name: "invertInDark", type: "checkbox", defaultValue: false },
              ],
            },
          ],
        },
        {
          label: "Tech Credibility",
          fields: [
            { name: "techEyebrow", type: "text", localized: true },
            { name: "techHeading", type: "text", localized: true },
            { name: "techDescription", type: "textarea", localized: true },
            {
              name: "techLogos",
              label: "Technology logos",
              type: "array",
              admin: { description: "Manage the logo grid displayed below the technology categories." },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "logo", type: "upload", relationTo: "media", required: true },
                { name: "invertInDark", type: "checkbox", defaultValue: false },
              ],
            },
            {
              name: "techGroups",
              label: "Technology categories",
              type: "array",
              localized: true,
              admin: {
                description: "Add categories, then manage the technologies inside each category.",
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
                  required: true,
                },
                {
                  name: "items",
                  label: "Technologies",
                  type: "array",
                  localized: true,
                  fields: [
                    { name: "name", type: "text", required: true },
                    { name: "desc", type: "text", required: true },
                  ],
                },
              ],
            },
            {
              name: "techItems",
              type: "array",
              localized: true,
              admin: { hidden: true },
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
                },
                { name: "name", type: "text" },
                { name: "desc", type: "text" },
              ],
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            {
              name: "faqItems",
              label: "Questions and answers",
              type: "array",
              localized: true,
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
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
              localized: true,
            },
            {
              name: "ctaSubtitle",
              type: "textarea",
              localized: true,
            },
          ],
        },
      ],
    },
  ],
};
