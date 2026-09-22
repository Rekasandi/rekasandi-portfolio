import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: {
    singular: "Inquiry",
    plural: "Inquiries (Contact Leads)",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "company", "budget", "createdAt"],
    description: "Inbound client project inquiries submitted from the website.",
  },
  access: {
    create: () => true, // Allow anonymous visitors to submit contact forms
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Prospect Name",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Work Email",
    },
    {
      name: "company",
      type: "text",
      label: "Company / Organization",
    },
    {
      name: "services",
      type: "array",
      label: "Selected Services",
      fields: [
        {
          name: "service",
          type: "text",
        },
      ],
    },
    {
      name: "budget",
      type: "text",
      label: "Target Investment Budget",
    },
    {
      name: "timeline",
      type: "text",
      label: "Desired Delivery Timeline",
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Project Brief & Architecture Goals",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New Inquiry", value: "new" },
        { label: "In Review", value: "review" },
        { label: "Contacted / In Discussion", value: "contacted" },
        { label: "Archived / Closed", value: "closed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
