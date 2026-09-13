import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Projects } from "./src/collections/Projects";
import { Services } from "./src/collections/Services";
import { Posts } from "./src/collections/Posts";
import { TeamMembers } from "./src/collections/TeamMembers";
import { Testimonials } from "./src/collections/Testimonials";

import { SiteSettings } from "./src/globals/SiteSettings";
import { Navigation } from "./src/globals/Navigation";
import { Footer } from "./src/globals/Footer";

import { seoPlugin } from "@payloadcms/plugin-seo";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri = process.env.DATABASE_URI || "";
const isPostgres =
  databaseUri.startsWith("postgres://") ||
  databaseUri.startsWith("postgresql://");

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Services,
    Posts,
    TeamMembers,
    Testimonials,
  ],
  globals: [SiteSettings, Navigation, Footer],
  editor: lexicalEditor(),
  plugins: [
    seoPlugin({
      collections: ["projects", "posts", "services"],
      globals: ["site-settings"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => {
        return doc?.title
          ? `${doc.title} — REKASANDI Digital Studio`
          : "REKASANDI — Premium Digital Product Studio";
      },
      generateDescription: ({ doc }) => {
        return (
          doc?.summary ||
          doc?.excerpt ||
          doc?.shortDescription ||
          "We design and build digital products for ambitious businesses. Strategy, design, engineering, and intelligent technology."
        );
      },
      generateURL: ({ doc, collectionConfig }) => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "https://rekasandi.com";
        if (collectionConfig?.slug === "projects")
          return `${baseUrl}/work/${doc?.slug}`;
        if (collectionConfig?.slug === "posts")
          return `${baseUrl}/insights/${doc?.slug}`;
        if (collectionConfig?.slug === "services")
          return `${baseUrl}/services#${doc?.slug}`;
        return baseUrl;
      },
    }),
  ],
  secret:
    process.env.PAYLOAD_SECRET ||
    "rekasandi-dev-payload-secret-key-minimum-32-characters-long",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
        },
      })
    : sqliteAdapter({
        client: {
          url: databaseUri || "file:./payload.db",
        },
      }),
  sharp,
});
