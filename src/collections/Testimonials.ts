import type { CollectionConfig } from "payload";
import { canManageContent } from "../lib/payload/access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    hidden: ({ user }) => user?.role === "author",
    useAsTitle: "author",
    defaultColumns: ["author", "company", "role", "featured"],
    livePreview: {
      url: () => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/about`;
      },
    },
  },
  access: {
    read: () => true,
    create: canManageContent,
    update: canManageContent,
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      localized: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "project",
      type: "text",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
