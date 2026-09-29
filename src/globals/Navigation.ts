import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";
import { canManageContent } from "../lib/payload/access";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  hooks: {
    afterChange: [revalidateGlobalHook(["/"])],
  },
  admin: {
    hidden: ({ user }) => user?.role === "author",
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return serverUrl;
      },
    },
  },
  access: {
    read: () => true,
    update: canManageContent,
  },
  fields: [
    {
      name: "items",
      type: "array",
      localized: true,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "primaryCtaLabel",
      type: "text",
      localized: true,
    },
    {
      name: "primaryCtaHref",
      type: "text",
    },
  ],
};
