import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  hooks: {
    afterChange: [revalidateGlobalHook(["/"])],
  },
  admin: {
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return serverUrl;
      },
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "primaryCtaLabel",
      type: "text",
      defaultValue: "START A PROJECT ↗",
    },
    {
      name: "primaryCtaHref",
      type: "text",
      defaultValue: "/contact",
    },
  ],
};
