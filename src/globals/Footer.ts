import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "statement",
      type: "textarea",
      defaultValue:
        "Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.",
    },
    {
      name: "timezone",
      type: "text",
      defaultValue: "Asia/Jakarta (UTC+7)",
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
