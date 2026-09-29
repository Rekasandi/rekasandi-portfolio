import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";
import { canManageContent } from "../lib/payload/access";

export const AboutPageContent: GlobalConfig = {
  slug: "page-about",
  label: "Page: About",
  hooks: {
    afterChange: [revalidateGlobalHook(["/about"])],
  },
  admin: {
    hidden: ({ user }) => user?.role === "author",
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/about`;
      },
    },
  },
  access: {
    read: () => true,
    update: canManageContent,
  },
  fields: [
    {
      name: "headline",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "subheadline",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "manifestoTitle",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "manifestoParagraphs",
      type: "array",
      localized: true,
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    {
      name: "principles",
      type: "array",
      localized: true,
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};
