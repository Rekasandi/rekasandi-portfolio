import type { CollectionConfig } from "payload";
import { revalidatePathHook } from "../lib/payload/revalidate";

export const Services: CollectionConfig = {
  slug: "services",
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [revalidatePathHook(() => ["/", "/services"])],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["number", "title", "order", "_status"],
    livePreview: {
      url: ({ data }) => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/services#${data?.slug || ""}`;
      },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return {
        _status: {
          equals: "published",
        },
      };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "number",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "capabilities",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "deliverables",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
  ],
};
