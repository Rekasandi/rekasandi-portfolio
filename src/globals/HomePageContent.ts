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
              type: "text",
              defaultValue: "WE BUILD",
              required: true,
            },
            {
              name: "heroHeadlineLine2",
              type: "text",
              defaultValue: "DIGITAL PRODUCTS",
              required: true,
            },
            {
              name: "heroHeadlineLine3",
              type: "text",
              defaultValue: "THAT MOVE BUSINESSES FORWARD.",
              required: true,
            },
            {
              name: "heroSubtitle",
              type: "textarea",
              defaultValue:
                "An independent digital product studio crafting high-velocity web experiences, design systems, and autonomous software architectures.",
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
              defaultValue: "Engineered Clarity.",
            },
            {
              name: "introDescription",
              type: "textarea",
              defaultValue:
                "Complexity is natural in modern software. Clarity is the deliberate, uncompromising discipline of design engineering.",
            },
            {
              name: "introStatement",
              type: "textarea",
              defaultValue:
                "We turn complex business challenges and multi-system workflows into intuitive, high-velocity digital experiences.",
            },
            {
              name: "introParagraph",
              type: "textarea",
              defaultValue:
                "Most software house projects suffer from generic templates and fragmented handoffs. We operate as an elite product partner embedded with leadership—bridging raw engineering depth with editorial art direction to deliver software that proves its value on day one.",
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
              name: "techGroups",
              type: "array",
              fields: [
                { name: "category", type: "text", required: true },
                {
                  name: "items",
                  type: "array",
                  fields: [
                    { name: "name", type: "text", required: true },
                    { name: "desc", type: "text", required: true },
                  ],
                },
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
              defaultValue: "LET’S BUILD SOMETHING DEFINITIVE.",
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
