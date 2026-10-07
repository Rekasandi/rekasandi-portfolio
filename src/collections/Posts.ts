import type { CollectionConfig } from "payload";
import { canManageContent } from "../lib/payload/access";
import { revalidatePathHook } from "../lib/payload/revalidate";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Insight",
    plural: "Insights",
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "author", "publishedAt", "featured", "_status"],
    livePreview: {
      url: ({ data, locale }) => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        const slug = encodeURIComponent(String(data.slug || ""));
        const previewSecret = process.env.PREVIEW_SECRET;
        if (!slug || !previewSecret) return `${serverUrl}/insights/${slug}`;
        return `${serverUrl}/api/preview?secret=${encodeURIComponent(previewSecret)}&slug=${slug}&locale=${encodeURIComponent(String(locale))}`;
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
  hooks: {
    afterChange: [
      revalidatePathHook((doc) => ["/", "/insights", `/insights/${doc.slug}`]),
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
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
      localized: true,
      required: true,
    },
    {
      name: "author",
      type: "text",
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
      localized: true,
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
      localized: true,
      required: true,
    },
  ],
};
