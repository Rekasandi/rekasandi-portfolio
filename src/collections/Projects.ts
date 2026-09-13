import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "category", "year", "featured", "status"],
    livePreview: {
      url: ({ data }) => {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${serverUrl}/work/${data.slug}`;
      },
    },
  },
  access: {
    read: () => true,
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
      name: "number",
      type: "text",
      required: true,
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "year",
      type: "text",
      required: true,
    },
    {
      name: "industry",
      type: "select",
      options: [
        { label: "Artificial Intelligence", value: "Artificial Intelligence" },
        { label: "FinTech & Banking", value: "FinTech & Banking" },
        { label: "FinTech & Payments", value: "FinTech & Payments" },
        { label: "Enterprise Software", value: "Enterprise Software" },
        { label: "Mobility & Fleet", value: "Mobility & Fleet" },
        { label: "Supply Chain & Logistics", value: "Supply Chain & Logistics" },
        { label: "Logistics", value: "Logistics" },
        { label: "Design Systems", value: "Design Systems" },
        { label: "E-Commerce", value: "E-Commerce" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Digital Product", value: "Digital Product" },
        { label: "AI & Automation", value: "AI & Automation" },
        { label: "Web Experience", value: "Web Experience" },
        { label: "Custom Software", value: "Custom Software" },
        { label: "Mobile Application", value: "Mobile Application" },
      ],
    },
    {
      name: "tagline",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "heroImage",
      type: "text",
      required: true,
    },
    {
      name: "thumbnailImage",
      type: "text",
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
    },
    {
      name: "technologies",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "metrics",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "caseStudyBlocks",
      type: "blocks",
      blocks: [
        {
          slug: "overview",
          fields: [
            { name: "challenge", type: "textarea", required: true },
            { name: "solution", type: "textarea", required: true },
            {
              name: "role",
              type: "array",
              fields: [{ name: "item", type: "text" }],
            },
          ],
        },
        {
          slug: "stats",
          fields: [
            { name: "title", type: "text" },
            {
              name: "items",
              type: "array",
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
                { name: "description", type: "text" },
              ],
            },
          ],
        },
        {
          slug: "twoColumn",
          fields: [
            { name: "heading", type: "text", required: true },
            { name: "leftTitle", type: "text", required: true },
            { name: "leftContent", type: "textarea", required: true },
            { name: "rightTitle", type: "text", required: true },
            { name: "rightContent", type: "textarea", required: true },
          ],
        },
        {
          slug: "quote",
          fields: [
            { name: "quote", type: "textarea", required: true },
            { name: "author", type: "text", required: true },
            { name: "role", type: "text" },
            { name: "company", type: "text" },
          ],
        },
        {
          slug: "techStack",
          fields: [
            {
              name: "technologies",
              type: "array",
              fields: [
                { name: "name", type: "text", required: true },
                { name: "category", type: "text", required: true },
                { name: "description", type: "text", required: true },
              ],
            },
          ],
        },
        {
          slug: "gallery",
          fields: [
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
            {
              name: "images",
              type: "array",
              required: true,
              fields: [
                { name: "url", type: "text", required: true },
                { name: "caption", type: "text" },
                { name: "alt", type: "text" },
                {
                  name: "aspectRatio",
                  type: "select",
                  options: ["16/9", "4/3", "1/1", "21/9"],
                  defaultValue: "16/9",
                },
              ],
            },
          ],
        },
        {
          slug: "fullWidthMedia",
          fields: [
            { name: "mediaUrl", type: "text", required: true },
            { name: "caption", type: "text" },
            { name: "credit", type: "text" },
            {
              name: "aspectRatio",
              type: "select",
              options: ["16/9", "21/9"],
              defaultValue: "21/9",
            },
          ],
        },
      ],
    },
  ],
};
