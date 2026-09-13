import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      defaultValue: "REKASANDI",
      required: true,
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Digital Product Studio — Strategy, Engineering & AI Systems",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "We design and build digital products that move businesses forward. Strategy, design, engineering, and intelligent technology based in Jakarta.",
    },
    {
      name: "contactEmail",
      type: "text",
      defaultValue: "hello@rekasandi.com",
    },
    {
      name: "location",
      type: "text",
      defaultValue: "South Jakarta, DKI Jakarta, Indonesia",
    },
    {
      name: "availability",
      type: "text",
      defaultValue: "Q2/Q3 2026 Engagement Slots Open",
    },
  ],
};
