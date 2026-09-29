import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";
import { canManageContent } from "../lib/payload/access";

export const ServicesPageContent: GlobalConfig = {
  slug: "page-services",
  label: "Page: Services",
  hooks: {
    afterChange: [revalidateGlobalHook(["/services"])],
  },
  admin: {
    hidden: ({ user }) => user?.role === "author",
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/services`;
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
      name: "engagementModels",
      type: "array",
      localized: true,
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "subtitle", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "features",
          type: "textarea",
          admin: {
            description: "Features list, one item per line.",
          },
          required: true,
        },
      ],
    },
  ],
};
