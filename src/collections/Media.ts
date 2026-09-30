import type { CollectionConfig } from "payload";
import { canManageContent } from "../lib/payload/access";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "public/media",
    modifyResponseHeaders: ({ headers }) => {
      headers.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
      return headers;
    },
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 480,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "application/pdf"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: canManageContent,
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "caption",
      type: "text",
      localized: true,
    },
    {
      name: "credit",
      type: "text",
      localized: true,
    },
  ],
};
