-- Align the schema with Payload collections, drafts, and editable page globals.
CREATE TYPE "public"."enum__projects_v_blocks_gallery_images_aspect_ratio" AS ENUM('16/9', '4/3', '1/1', '21/9');
CREATE TYPE "public"."enum__projects_v_blocks_full_width_media_aspect_ratio" AS ENUM('16/9', '21/9');
CREATE TYPE "public"."enum__projects_v_version_industry" AS ENUM('Artificial Intelligence', 'FinTech & Banking', 'FinTech & Payments', 'Enterprise Software', 'Mobility & Fleet', 'Supply Chain & Logistics', 'Logistics', 'Design Systems', 'E-Commerce', 'Healthcare', 'Other');
CREATE TYPE "public"."enum__projects_v_version_category" AS ENUM('Digital Product', 'AI & Automation', 'Web Experience', 'Custom Software', 'Mobile Application');
CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum__posts_v_version_category" AS ENUM('Engineering', 'AI & Systems', 'Design Systems', 'Architecture', 'Interaction');
CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
CREATE TYPE "public"."enum_page_home_tech_items_category" AS ENUM('FRONTEND & RUNTIME', 'MOTION & CRAFT', 'BACKEND & DATA', 'INTELLIGENCE & CLOUD');
ALTER TABLE "projects_technologies" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "projects_metrics" ALTER COLUMN "value" DROP NOT NULL;
ALTER TABLE "projects_metrics" ALTER COLUMN "label" DROP NOT NULL;
ALTER TABLE "projects_blocks_overview" ALTER COLUMN "challenge" DROP NOT NULL;
ALTER TABLE "projects_blocks_overview" ALTER COLUMN "solution" DROP NOT NULL;
ALTER TABLE "projects_blocks_stats_items" ALTER COLUMN "value" DROP NOT NULL;
ALTER TABLE "projects_blocks_stats_items" ALTER COLUMN "label" DROP NOT NULL;
ALTER TABLE "projects_blocks_two_column" ALTER COLUMN "heading" DROP NOT NULL;
ALTER TABLE "projects_blocks_two_column" ALTER COLUMN "left_title" DROP NOT NULL;
ALTER TABLE "projects_blocks_two_column" ALTER COLUMN "left_content" DROP NOT NULL;
ALTER TABLE "projects_blocks_two_column" ALTER COLUMN "right_title" DROP NOT NULL;
ALTER TABLE "projects_blocks_two_column" ALTER COLUMN "right_content" DROP NOT NULL;
ALTER TABLE "projects_blocks_quote" ALTER COLUMN "quote" DROP NOT NULL;
ALTER TABLE "projects_blocks_quote" ALTER COLUMN "author" DROP NOT NULL;
ALTER TABLE "projects_blocks_tech_stack_technologies" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "projects_blocks_tech_stack_technologies" ALTER COLUMN "category" DROP NOT NULL;
ALTER TABLE "projects_blocks_tech_stack_technologies" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "projects_blocks_gallery_images" ALTER COLUMN "url" DROP NOT NULL;
ALTER TABLE "projects_blocks_full_width_media" ALTER COLUMN "media_url" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "slug" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "number" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "client" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "year" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "category" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "tagline" DROP NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "summary" DROP NOT NULL;
ALTER TABLE "projects" ADD COLUMN "_status" "enum_projects_status" DEFAULT 'draft';
CREATE TABLE "_projects_v_version_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
CREATE TABLE "_projects_v_version_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
CREATE TABLE "_projects_v_blocks_overview_role" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
CREATE TABLE "_projects_v_blocks_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"challenge" varchar,
  	"solution" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
CREATE TABLE "_projects_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
CREATE TABLE "_projects_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
CREATE TABLE "_projects_v_blocks_two_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"left_title" varchar,
  	"left_content" varchar,
  	"right_title" varchar,
  	"right_content" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
CREATE TABLE "_projects_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"company" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
CREATE TABLE "_projects_v_blocks_tech_stack_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"category" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
CREATE TABLE "_projects_v_blocks_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
CREATE TABLE "_projects_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"caption" varchar,
  	"alt" varchar,
  	"aspect_ratio" "enum__projects_v_blocks_gallery_images_aspect_ratio" DEFAULT '16/9',
  	"_uuid" varchar
  );
CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
CREATE TABLE "_projects_v_blocks_full_width_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"media_url" varchar,
  	"caption" varchar,
  	"credit" varchar,
  	"aspect_ratio" "enum__projects_v_blocks_full_width_media_aspect_ratio" DEFAULT '21/9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_number" varchar,
  	"version_client" varchar,
  	"version_year" varchar,
  	"version_industry" "enum__projects_v_version_industry",
  	"version_category" "enum__projects_v_version_category",
  	"version_tagline" varchar,
  	"version_summary" varchar,
  	"version_hero_image_id" integer,
  	"version_thumbnail_image_id" integer,
  	"version_featured" boolean DEFAULT true,
  	"version_status" "enum__projects_v_version_status" DEFAULT 'published',
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
ALTER TABLE "services_capabilities" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "services_capabilities" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "services_deliverables" ALTER COLUMN "item" DROP NOT NULL;
ALTER TABLE "services" ALTER COLUMN "number" DROP NOT NULL;
ALTER TABLE "services" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "services" ALTER COLUMN "slug" DROP NOT NULL;
ALTER TABLE "services" ALTER COLUMN "short_description" DROP NOT NULL;
ALTER TABLE "services" ADD COLUMN "_status" "enum_services_status" DEFAULT 'draft';
CREATE TABLE "_services_v_version_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
CREATE TABLE "_services_v_version_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_number" varchar,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_order" numeric DEFAULT 1,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
ALTER TABLE "posts" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "posts" ALTER COLUMN "slug" DROP NOT NULL;
ALTER TABLE "posts" ALTER COLUMN "excerpt" DROP NOT NULL;
ALTER TABLE "posts" ALTER COLUMN "category" DROP NOT NULL;
ALTER TABLE "posts" ALTER COLUMN "body" DROP NOT NULL;
ALTER TABLE "posts" ADD COLUMN "_status" "enum_posts_status" DEFAULT 'draft';
-- Existing records predate Payload drafts and were public content.
UPDATE "projects" SET "_status" = 'published';
UPDATE "services" SET "_status" = 'published';
UPDATE "posts" SET "_status" = 'published';
CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_author" varchar DEFAULT 'Rekasandi Editorial Team',
  	"version_category" "enum__posts_v_version_category",
  	"version_reading_time" varchar DEFAULT '5 min read',
  	"version_cover_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_body" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
CREATE TABLE "page_home_intro_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
CREATE TABLE "page_home_approach_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"deliverable" varchar NOT NULL
  );
CREATE TABLE "page_home_tech_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" "enum_page_home_tech_items_category" DEFAULT 'FRONTEND & RUNTIME' NOT NULL,
  	"name" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
CREATE TABLE "page_home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline_line1" varchar DEFAULT 'WE BUILD' NOT NULL,
  	"hero_headline_line2" varchar DEFAULT 'DIGITAL PRODUCTS' NOT NULL,
  	"hero_headline_line3_prefix" varchar DEFAULT 'FOR AMBITIOUS',
  	"hero_headline_line3_suffix" varchar DEFAULT 'BUSINESSES.',
  	"hero_subtitle" varchar DEFAULT 'We partner with visionary enterprises and founders to engineer category-defining web experiences, scalable software architectures, and autonomous AI systems.' NOT NULL,
  	"intro_title" varchar DEFAULT 'Engineered Clarity.',
  	"intro_description" varchar DEFAULT 'Complexity is natural in modern software. Clarity is the deliberate, uncompromising discipline of design engineering.',
  	"intro_statement" varchar DEFAULT 'We turn complex business challenges and multi-system workflows into intuitive, high-velocity digital experiences.',
  	"intro_paragraph" varchar DEFAULT 'Most software house projects suffer from generic templates and fragmented handoffs. We operate as an elite product partner embedded with leadership—bridging raw engineering depth with editorial art direction to deliver software that proves its value on day one.',
  	"cta_headline" varchar DEFAULT 'LET’S BUILD SOMETHING DEFINITIVE.',
  	"cta_subtitle" varchar DEFAULT 'Have an ambitious digital product, web experience, or AI system in mind? We partner with companies ready to create category-defining work.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
CREATE TABLE "page_about_manifesto_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar NOT NULL
  );
CREATE TABLE "page_about_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
CREATE TABLE "page_about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'WE ARE REKASANDI.' NOT NULL,
  	"subheadline" varchar DEFAULT 'An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.' NOT NULL,
  	"manifesto_title" varchar DEFAULT 'We care about what we build — and how we build it.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
CREATE TABLE "page_services_engagement_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"features" varchar NOT NULL
  );
CREATE TABLE "page_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'SERVICES & SPECTRUM.' NOT NULL,
  	"subheadline" varchar DEFAULT 'We combine business strategy, editorial art direction, and deep software engineering to build defensible digital products that move companies forward.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
ALTER TABLE "_projects_v_version_technologies" ADD CONSTRAINT "_projects_v_version_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_version_metrics" ADD CONSTRAINT "_projects_v_version_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_overview_role" ADD CONSTRAINT "_projects_v_blocks_overview_role_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_overview"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_overview" ADD CONSTRAINT "_projects_v_blocks_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_stats_items" ADD CONSTRAINT "_projects_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_stats" ADD CONSTRAINT "_projects_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_two_column" ADD CONSTRAINT "_projects_v_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_quote" ADD CONSTRAINT "_projects_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_tech_stack_technologies" ADD CONSTRAINT "_projects_v_blocks_tech_stack_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_tech_stack" ADD CONSTRAINT "_projects_v_blocks_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_full_width_media" ADD CONSTRAINT "_projects_v_blocks_full_width_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_projects_v_blocks_full_width_media" ADD CONSTRAINT "_projects_v_blocks_full_width_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_thumbnail_image_id_media_id_fk" FOREIGN KEY ("version_thumbnail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_services_v_version_capabilities" ADD CONSTRAINT "_services_v_version_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_services_v_version_deliverables" ADD CONSTRAINT "_services_v_version_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "page_home_intro_metrics" ADD CONSTRAINT "page_home_intro_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "page_home_approach_steps" ADD CONSTRAINT "page_home_approach_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "page_home_tech_items" ADD CONSTRAINT "page_home_tech_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "page_about_manifesto_paragraphs" ADD CONSTRAINT "page_about_manifesto_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "page_about_principles" ADD CONSTRAINT "page_about_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_about"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "page_services_engagement_models" ADD CONSTRAINT "page_services_engagement_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_services"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
CREATE INDEX "_projects_v_version_technologies_order_idx" ON "_projects_v_version_technologies" USING btree ("_order");
CREATE INDEX "_projects_v_version_technologies_parent_id_idx" ON "_projects_v_version_technologies" USING btree ("_parent_id");
CREATE INDEX "_projects_v_version_metrics_order_idx" ON "_projects_v_version_metrics" USING btree ("_order");
CREATE INDEX "_projects_v_version_metrics_parent_id_idx" ON "_projects_v_version_metrics" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_overview_role_order_idx" ON "_projects_v_blocks_overview_role" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_overview_role_parent_id_idx" ON "_projects_v_blocks_overview_role" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_overview_order_idx" ON "_projects_v_blocks_overview" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_overview_parent_id_idx" ON "_projects_v_blocks_overview" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_overview_path_idx" ON "_projects_v_blocks_overview" USING btree ("_path");
CREATE INDEX "_projects_v_blocks_stats_items_order_idx" ON "_projects_v_blocks_stats_items" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_stats_items_parent_id_idx" ON "_projects_v_blocks_stats_items" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_stats_order_idx" ON "_projects_v_blocks_stats" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_stats_parent_id_idx" ON "_projects_v_blocks_stats" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_stats_path_idx" ON "_projects_v_blocks_stats" USING btree ("_path");
CREATE INDEX "_projects_v_blocks_two_column_order_idx" ON "_projects_v_blocks_two_column" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_two_column_parent_id_idx" ON "_projects_v_blocks_two_column" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_two_column_path_idx" ON "_projects_v_blocks_two_column" USING btree ("_path");
CREATE INDEX "_projects_v_blocks_quote_order_idx" ON "_projects_v_blocks_quote" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_quote_parent_id_idx" ON "_projects_v_blocks_quote" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_quote_path_idx" ON "_projects_v_blocks_quote" USING btree ("_path");
CREATE INDEX "_projects_v_blocks_tech_stack_technologies_order_idx" ON "_projects_v_blocks_tech_stack_technologies" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_tech_stack_technologies_parent_id_idx" ON "_projects_v_blocks_tech_stack_technologies" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_tech_stack_order_idx" ON "_projects_v_blocks_tech_stack" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_tech_stack_parent_id_idx" ON "_projects_v_blocks_tech_stack" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_tech_stack_path_idx" ON "_projects_v_blocks_tech_stack" USING btree ("_path");
CREATE INDEX "_projects_v_blocks_gallery_images_order_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_gallery_images_parent_id_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_gallery_images_image_idx" ON "_projects_v_blocks_gallery_images" USING btree ("image_id");
CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
CREATE INDEX "_projects_v_blocks_full_width_media_order_idx" ON "_projects_v_blocks_full_width_media" USING btree ("_order");
CREATE INDEX "_projects_v_blocks_full_width_media_parent_id_idx" ON "_projects_v_blocks_full_width_media" USING btree ("_parent_id");
CREATE INDEX "_projects_v_blocks_full_width_media_path_idx" ON "_projects_v_blocks_full_width_media" USING btree ("_path");
CREATE INDEX "_projects_v_blocks_full_width_media_media_idx" ON "_projects_v_blocks_full_width_media" USING btree ("media_id");
CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
CREATE INDEX "_projects_v_version_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");
CREATE INDEX "_projects_v_version_version_thumbnail_image_idx" ON "_projects_v" USING btree ("version_thumbnail_image_id");
CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");
CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
CREATE INDEX "_services_v_version_capabilities_order_idx" ON "_services_v_version_capabilities" USING btree ("_order");
CREATE INDEX "_services_v_version_capabilities_parent_id_idx" ON "_services_v_version_capabilities" USING btree ("_parent_id");
CREATE INDEX "_services_v_version_deliverables_order_idx" ON "_services_v_version_deliverables" USING btree ("_order");
CREATE INDEX "_services_v_version_deliverables_parent_id_idx" ON "_services_v_version_deliverables" USING btree ("_parent_id");
CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
CREATE INDEX "contact_submissions_services_order_idx" ON "contact_submissions_services" USING btree ("_order");
CREATE INDEX "contact_submissions_services_parent_id_idx" ON "contact_submissions_services" USING btree ("_parent_id");
CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
CREATE INDEX "page_home_intro_metrics_order_idx" ON "page_home_intro_metrics" USING btree ("_order");
CREATE INDEX "page_home_intro_metrics_parent_id_idx" ON "page_home_intro_metrics" USING btree ("_parent_id");
CREATE INDEX "page_home_approach_steps_order_idx" ON "page_home_approach_steps" USING btree ("_order");
CREATE INDEX "page_home_approach_steps_parent_id_idx" ON "page_home_approach_steps" USING btree ("_parent_id");
CREATE INDEX "page_home_tech_items_order_idx" ON "page_home_tech_items" USING btree ("_order");
CREATE INDEX "page_home_tech_items_parent_id_idx" ON "page_home_tech_items" USING btree ("_parent_id");
CREATE INDEX "page_about_manifesto_paragraphs_order_idx" ON "page_about_manifesto_paragraphs" USING btree ("_order");
CREATE INDEX "page_about_manifesto_paragraphs_parent_id_idx" ON "page_about_manifesto_paragraphs" USING btree ("_parent_id");
CREATE INDEX "page_about_principles_order_idx" ON "page_about_principles" USING btree ("_order");
CREATE INDEX "page_about_principles_parent_id_idx" ON "page_about_principles" USING btree ("_parent_id");
CREATE INDEX "page_services_engagement_models_order_idx" ON "page_services_engagement_models" USING btree ("_order");
CREATE INDEX "page_services_engagement_models_parent_id_idx" ON "page_services_engagement_models" USING btree ("_parent_id");
