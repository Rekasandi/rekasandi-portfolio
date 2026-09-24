import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";

export const ServicesPageContent: GlobalConfig = {
  slug: "page-services",
  label: "Page: Services",
  hooks: {
    afterChange: [revalidateGlobalHook(["/services"])],
  },
  admin: {
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/services`;
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
      defaultValue: "SERVICES & SPECTRUM.",
      required: true,
    },
    {
      name: "subheadline",
      type: "textarea",
      defaultValue:
        "We combine business strategy, editorial art direction, and deep software engineering to build defensible digital products that move companies forward.",
      required: true,
    },
    {
      name: "engagementModels",
      type: "array",
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
