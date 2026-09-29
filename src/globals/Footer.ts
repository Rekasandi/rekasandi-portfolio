import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";
import { canManageContent } from "../lib/payload/access";

export const Footer: GlobalConfig = {
  slug: "footer",
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
      name: "statement",
      type: "textarea",
      localized: true,
    },
    {
      name: "timezone",
      type: "text",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
