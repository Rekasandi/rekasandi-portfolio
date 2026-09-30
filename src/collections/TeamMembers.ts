import type { CollectionConfig } from "payload";
import { canManageContent } from "../lib/payload/access";
import { revalidatePathHook } from "../lib/payload/revalidate";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  hooks: {
    afterChange: [revalidatePathHook(() => ["/about"])],
  },
  admin: {
    hidden: ({ user }) => user?.role === "author",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "specialization", "location", "order"],
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
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "image/" },
      },
      admin: {
        description: "Upload a portrait photo for this team member.",
      },
    },
    {
      name: "role",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "specialization",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "location",
      type: "text",
      localized: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 1,
    },
  ],
};
