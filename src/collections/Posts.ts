import type { CollectionConfig } from "payload";
import { revalidatePathHook } from "../lib/payload/revalidate";

export const Posts: CollectionConfig = {
  slug: "posts",
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [
      revalidatePathHook((doc) => ["/", "/insights", `/insights/${doc.slug}`]),
    ],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "author", "publishedAt", "featured", "_status"],
    livePreview: {
      url: ({ data }) => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/insights/${data.slug}`;
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
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "author",
      type: "text",
      defaultValue: "Rekasandi Editorial Team",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "AI & Systems", value: "AI & Systems" },
        { label: "Design Systems", value: "Design Systems" },
        { label: "Architecture", value: "Architecture" },
        { label: "Interaction", value: "Interaction" },
      ],
    },
    {
      name: "readingTime",
      type: "text",
      defaultValue: "5 min read",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "publishedAt",
      type: "date",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
    },
  ],
};
