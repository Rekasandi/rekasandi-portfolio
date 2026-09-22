import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";

export const AboutPageContent: GlobalConfig = {
  slug: "page-about",
  label: "Page: About",
  hooks: {
    afterChange: [revalidateGlobalHook(["/about"])],
  },
  admin: {
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/about`;
      },
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "headline",
      type: "text",
      defaultValue: "WE ARE REKASANDI.",
      required: true,
    },
    {
      name: "subheadline",
      type: "textarea",
      defaultValue:
        "An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.",
      required: true,
    },
    {
      name: "manifestoTitle",
      type: "text",
      defaultValue: "We care about what we build — and how we build it.",
      required: true,
    },
    {
      name: "manifestoParagraphs",
      type: "array",
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    {
      name: "principles",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};
