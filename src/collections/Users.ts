import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/payload/access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    hidden: ({ user }) => user?.role !== "admin",
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role"],
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      access: { update: ({ req: { user } }) => user?.role === "admin" },
      defaultValue: "editor",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" },
      ],
    },
  ],
};
