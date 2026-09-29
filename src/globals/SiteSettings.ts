import type { GlobalConfig } from "payload";
import { revalidateGlobalHook } from "../lib/payload/revalidate";
import { isAdmin } from "../lib/payload/access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  hooks: {
    afterChange: [revalidateGlobalHook(["/"])],
  },
  admin: {
    hidden: ({ user }) => user?.role !== "admin",
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return serverUrl;
      },
    },
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "tagline",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "contactEmail",
      type: "text",
    },
    {
      name: "location",
      type: "text",
      localized: true,
    },
    {
      name: "availability",
      type: "text",
      localized: true,
    },
  ],
};
