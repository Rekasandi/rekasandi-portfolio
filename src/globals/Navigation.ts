import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "primaryCtaLabel",
      type: "text",
      defaultValue: "START A PROJECT ↗",
    },
    {
      name: "primaryCtaHref",
      type: "text",
      defaultValue: "/contact",
    },
  ],
};
